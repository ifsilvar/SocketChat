import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

// import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

// import './Chat.css';


let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'localhost:5000';


  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });

     return () => {
       socket.emit('disconnect');

       socket.off();
     } 
  }, [ENDPOINT, location.search]);
  

  //for handling messages
  useEffect(() => {
    //connects to code from backend about messages
    socket.on('message', (message) => {
      //spreads all messages and adds one more
      setMessages([ ...messages, message ]);
    });
  }, [messages]);

    
//     socket.on("roomData", ({ users }) => {
//       setUsers(users);
//     });
// }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  console.log(message, messages);

  return (
    <div className="outerContainer">
      <h1>Chat</h1>
      <div className="container">
          <input value={message} 
          onChange={(event) => setMessage(event.target.value)} 
          onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event) : null} />
          <InfoBar />
          <Messages messages={messages} name={name} />
          {/* This next line exports values for each message setMessage and sendMessage to the input component */}
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      {/* <TextContainer users={users} /> */}
    </div>
  );
}

export default Chat;