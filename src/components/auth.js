import '../styles/auth.css'
import { auth, googleProvider } from '../config/firebase'
import { signInWithPopup, signOut } from 'firebase/auth'

export const Auth = () => {
  const signIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (error) {
      console.log(error)
    }
  }
  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.log(error)
    }
  }

  return auth.currentUser != null ? (
    <button className="btn btn-auth" onClick={logout}>
      Logout
    </button>
  ) : (
    <button className="btn btn-auth" onClick={signIn}>
      Sign in with Google
    </button>
  )
}
