import React from 'react';
import './message.css';

export default function Message({ message, id, timestamp, user, userimage }) {
    return (
        <div className='message'>
            <img src={userimage} alt="" />
            <div className="message_info">
                <h4>
                    {user}
                    <span className='message_timestamp'>
                        {new Date(timestamp?.toDate()).toUTCString()}
                    </span>
                </h4>
                <p>{message}</p>
                <p>{id}</p>
            </div>
        </div>
    )
}
