import React from 'react';
import ReactEmoji from 'react-emoji';

const Message = ({ message: { user, text }, name }) => {
    let isSentByCurrentUser = false;
    const trimmedName = name.trim().toLowerCase();

    if(user === trimmedName) {
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser
        ? (
            <div className="messageContainer justifyEnd">
                <p ClassName="sentText pr-10">{trimmedName}</p>
                <div Classname="messageBox">
                    <p className="messageText colorGray">{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        )
        : (
            <div className="messageContainer justifyStart">
                <div Classname="messageBox backgroundLight">
                    <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
                </div>
                <p ClassName="sentText pl-10">{user}</p>
            </div>
        )
    )
}

export default Message;