import React, { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chats from "./Chats";

const socket = io.connect("http://localhost:3001");

function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", { userName: userName, room: room });
      setShowChat(true);
    }
  };
  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            id="username"
            placeholder="Enter username"
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="text"
            id="roomname"
            placeholder="Enter Room Id"
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>Join the room</button>
        </div>
      ) : (
        <Chats socket={socket} userName={userName} room={room} />
      )}
    </div>
  );
}

export default App;
