import './styles/App.css'
import Game from './Game'
import { ChatRoom } from './components/chatRoom'
import { Auth, SignOut } from './components/auth'

export default function App() {
  // return <>{user ? <Game></Game> : <SignIn></SignIn>}</>
  return (
    <div>
      <Game></Game>
      <div className='cool-bottom-left-div'>
        <ChatRoom />
      </div>
    </div>
    
  )
}
