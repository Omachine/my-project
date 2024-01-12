import '../styles/leaderBoard.css'
import { useEffect, useState } from 'react'
import { db, auth } from '../config/firebase'
import {
  getDocs,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
} from 'firebase/firestore'
import { Auth } from './auth'

export const LeaderBoard = () => {
  const [messages, setMessages] = useState([])

  const scoreRef = collection(db, 'scores')
  const scoresQuery = query(scoreRef, orderBy('score'), limit(12))

  const getScores = async () => {
    // Read the data
    // Set Scores list
    try {
      const data = await getDocs(scoresQuery)
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      setMessages(filteredData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getScores()
  }, [])

  return (
    <div className="leaderboard">
      <div className="leaderboard-header">
        <h2>🏆 LeaderBoard 🏆</h2>
      </div>

      <div className='messages'>
        {messages.map((score) => (
          <div>
            <p>
              <b>{score.user}:</b> {score.score}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
