import { useEffect, useState } from 'react'
import './App.css'
import Game from './Game'
import { Auth, SignOut } from './components/auth'
import { db, auth } from './config/firebase'
import {
  getDocs,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit
} from 'firebase/firestore'

export default function App() {
  const [messages, setMessages] = useState([])

  // New message State
  const [newMessageText, setNewMessageText] = useState('')

  const messagesRef = collection(db, 'messages')

  const messageQuery = query(messagesRef, orderBy('sentAt'), limit(15))

  const getMessages = async () => {
    // Read the data
    // Set Messages list
    try {
      const data = await getDocs(messageQuery)
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
    getMessages()
  }, [])

  const onMessageSent = async () => {
    try {
      await addDoc(messagesRef, {
        text: newMessageText,
        sentAt: serverTimestamp(),
        user: auth ? auth.currentUser.displayName : 'A random guy',
      })

      getMessages()
    } catch (error) {
      console.log(error)
    }
  }

  // return <>{user ? <Game></Game> : <SignIn></SignIn>}</>
  return (
    <div>
      <Auth />

      <div>
        <input
          placeholder="message..."
          onChange={(e) => setNewMessageText(e.target.value)}
        />
        <button onClick={onMessageSent}>send</button>
      </div>

      <div className="chat">
        <h2>Chat</h2>
        {messages.map((message) => (
          <div>
            <p>
              <b>{message.user}:</b> {message.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
