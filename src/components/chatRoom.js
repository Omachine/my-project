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

export const ChatRoom = () => {
  const [minimized, setMinimized] = useState(false)

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
    if (newMessageText == '') return
    try {
      await addDoc(messagesRef, {
        text: newMessageText,
        sentAt: serverTimestamp(),
        user: auth ? auth.currentUser.displayName : 'A random guy',
      })
      setNewMessageText('')
      getMessages()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="chat-room">
      <div className='minimize-btn'>
        <input
          type="checkbox"
          id="minimize"
          onChange={(e) => {
            setMinimized(e.target.checked)
          }}
        />
        <label htmlFor="minimize" className="minimize-btn">-</label>
      </div>
      <div className="messages">
        <h2>Chat</h2>
        {messages.map((message) => (
          <div className={minimized ? 'invisible' : null}>
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
        <button onClick={onMessageSent}>Send</button>
      </div>
    </div>
  )
}
