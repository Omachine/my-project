import "./styles/App.css";
import Game from "./Game";
import { ChatRoom } from "./components/chatRoom";
import { Auth, SignOut } from "./components/auth";
import { useState } from "react";
import { LeaderBoard } from "./components/leaderboard";
import { SkinProvider } from "./SkinContext";

export default function App() {
  const [showleader, setShowleader] = useState(false);

  return (
    <SkinProvider>
      <div>
        <Game></Game>
        <div className="cool-bottom-left-div">
          <ChatRoom />
        </div>
        <button
          onClick={(e) => {
            if (showleader) setShowleader(false);
            else setShowleader(true);
          }}
          className="btn leaderboard-btn"
        >
          LeaderBoard
        </button>
        {showleader ? <LeaderBoard showleader={showleader} /> : <></>}
      </div>
    </SkinProvider>
  );
}
