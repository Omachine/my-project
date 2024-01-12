import '../styles/auth.css'
import { auth, googleProvider } from '../config/firebase'
import { signInWithPopup, signOut } from 'firebase/auth'
import { useState } from 'react'

export const Auth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const signIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      setIsLoggedIn(true)
    } catch (error) {
      console.log(error)
    }
  }
  const signout = async () => {
    try {
      await signOut(auth)
      setIsLoggedIn(false)
    } catch (error) {
      console.log(error)
    }
  }

  return auth.currentUser != null ? (
    <button className="btn btn-auth" onClick={signout}>
      Sign Out
    </button>
  ) : (
    <button className="btn btn-auth" onClick={signIn}>
      Sign in with Google
    </button>
  )
}
