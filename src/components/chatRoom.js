import '../styles/chatRoom.css'
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

export const ChatRoom = () => {
  const [minimized, setMinimized] = useState(false)

  const [messages, setMessages] = useState([])

  // New message State
  const [newMessageText, setNewMessageText] = useState('')

  const messagesRef = collection(db, 'messages')
  const messageQuery = query(messagesRef, orderBy('sentAt', 'desc'), limit(12))

  const getMessages = async () => {
    // Read the data
    // Set Messages list
    try {
      const data = await getDocs(messageQuery)
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      // Reverse the order
      const mapReversed = filteredData
        .slice(0)
        .reverse()
        .map((element) => {
          return element
        })
      setMessages(mapReversed)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMessages()
  }, [])

  const onMessageSent = async () => {
    if (newMessageText.trim().length === 0) {
      setNewMessageText('')
      return
    }
    try {
      await addDoc(messagesRef, {
        text: newMessageText,
        sentAt: serverTimestamp(),
        user:
          auth.currentUser != null
            ? auth.currentUser.displayName
            : 'A random guy',
      })
      setNewMessageText('')
      getMessages()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="chat-room">
      <div className="chat-header">
        <h2>Chat</h2>
        <Auth />
        <div className="minimize">
          <label htmlFor="minimize">-</label>
          <input
            type="checkbox"
            id="minimize"
            onChange={(e) => {
              setMinimized(e.target.checked)
            }}
          />
        </div>
      </div>

      <div className={minimized ? 'invisible' : 'messages'}>
        {messages.map((message) => (
          <div>
            <p>
              <b>{message.user}:</b> {message.text}
            </p>
          </div>
        ))}
      </div>

      <div className="send-message">
        <input
          placeholder="message..."
          value={newMessageText}
          onChange={(e) => setNewMessageText(e.target.value)}
        />
        <button onClick={onMessageSent} className="btn">
          Send
        </button>
      </div>
    </div>
  )
}
