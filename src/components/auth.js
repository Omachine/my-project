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

  return (
    <div className="center">
      <button className="btn" onClick={signIn}>
        Sign in with Google
      </button>

      <button className="btn" onClick={logout}>Logout</button>
    </div>
  )
}
