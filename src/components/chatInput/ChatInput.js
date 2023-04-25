import React, { useState } from 'react';
import './chatInput.css';
import { useStateValue } from '../../StateProvider';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import db from '../../firebase';

export default function ChatInput({ channelName, channelId }) {

    const [input, setInput] = useState("");
    const [{ user }] = useStateValue();

    const sendMessage = async (e) => {
        e.preventDefault();

        if (channelId) {
            const messagesColRef = collection(db, "rooms", channelId, "messages");
            await addDoc(messagesColRef, {
                message: input,
                timestamp: serverTimestamp(),
                user: user.displayName,
                userimage: user.photoURL,
            })
        }
        setInput('')
    };

    return (
        <div className='chatInput'>
            <form action="">
                <input value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Message #${channelName?.toLowerCase()}`} />
                <button type="submit" onClick={sendMessage}>SEND</button>
            </form>
        </div>
    )
};
