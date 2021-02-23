import React from 'react';

// we pass in props from the input tag in our chat html
const Input = ({ message, setMessage, sendMessage }) => (
    <form className="form">
        <input className="input"
        type="text"
        placeholder="Type here.."
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event) : null}>
        </input>
        <button className="sendButton" onClick={(event) => sendMessage(event)}>Send</button>
    </form>
)

export default Input;