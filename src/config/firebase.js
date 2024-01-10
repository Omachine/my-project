import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyB_9lSgTGmFZQqCJdrP9ZRf8IbY2ZZcnjg',
  authDomain: 'pdw-project-fed7c.firebaseapp.com',
  projectId: 'pdw-project-fed7c',
  storageBucket: 'pdw-project-fed7c.appspot.com',
  messagingSenderId: '786879104327',
  appId: '1:786879104327:web:74664d6c49e8a8e961f862',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export const db = new getFirestore(app)
