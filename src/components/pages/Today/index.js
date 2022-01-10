import { useContext, useState, useEffect } from "react"
import UserContext from "../../../utils/context/UserContext"

import axios from "axios"

import Title from "../../atomics/Title"
import Container from "../../generics/Container"
import Header from "../../generics/Header"
import Navbar from "../../generics/Navbar"
import TodayCard from "../../generics/TodayCard"
import { Message } from "../Habits/style"

import dayjs from "dayjs"

import 'dayjs/locale/pt-br'
import HabitStatus from "../../atomics/HabitStatus"

export default function Today() {
  const { data } = useContext(UserContext);

  const [habits, setHabits] = useState([])
  const [habitsDone, setHabitsDone] = useState(0)
  const [refresh, setRefresh] = useState(false)
  const [percentage, setPercentage] = useState()

  useEffect(() => {
    const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today`, {
      headers: {
        Authorization: `Bearer ${data.token}`
      }
    });

    request.then(response => {
      setHabits(response.data)
    });

    request.catch(error => {
      alert(error)
    })
    // eslint-disable-next-line
  }, [refresh]);


  return (

    <>
      <Header />
      <Container>
        <Title>{dayjs().locale('pt-br').format('dddd, DD/MM')}</Title>
        {habitsDone === 0
          ? <HabitStatus color="#BABABA">Nenhum hábito concluído ainda</HabitStatus>
          : <HabitStatus color="#8FC549">`{Math.round((100 / habits.length) * habitsDone)}% dos hábitos concluídos</HabitStatus>
        }
        {habits.length === 0
          ? <Message>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</Message>
          : habits.map(({ id, name, done, currentSequence, highestSequence }) => (
            <TodayCard key={id} id={id} title={name} done={done} currentSequence={currentSequence} highestSequence={highestSequence}
              setRefresh={setRefresh} refresh={refresh} setHabitsDone={setHabitsDone} habitsDone={habitsDone} />
          ))
        }

      </Container>
      <Navbar />
    </>
  )
}