import React, { useEffect, useState } from 'react';
import './chat.css';
import { useParams } from 'react-router-dom';
import { InfoOutlined, StarBorderOutlined } from '@mui/icons-material';
import db from '../../firebase';
import { onSnapshot, doc, collection, query, orderBy } from 'firebase/firestore';
import Message from '../message/Message';
import ChatInput from '../chatInput/ChatInput';

export default function Chat() {

  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState("");
  const [roomMessages, setRoomMessages] = useState([]);

  useEffect(() => {
    if (roomId) {
      onSnapshot(doc(db, "rooms", roomId), (snapshot) => {
        setRoomDetails(snapshot.data());
      });

      const messagesColRef = collection(db, "rooms", roomId, "messages");
      const q = query(messagesColRef, orderBy("timestamp"));
      onSnapshot(q, (snapshot) => {
        setRoomMessages(snapshot.docs.map((doc) =>
          doc.data()))
      });

    }
  }, [roomId]);

  return (
    <div className="chat">
      <div className="chat_header">
        <div className="chat_headerLeft">
          <h4 className="chat_channelName">
            <strong># {roomDetails?.name}</strong>
            <StarBorderOutlined />
          </h4>
        </div>
        <div className="chat_headerRight">
          <p>
            <InfoOutlined /> Details
          </p>
        </div>
      </div>
      <div className="chat_message">
        {roomMessages?.map(({ message, timestamp, roomId, user, userimage }) => (
          <Message message={message} key={message} timestamp={timestamp} user={user} userimage={userimage} />
        ))}
      </div>
      <ChatInput channelName={roomDetails?.name} channelId={roomId} />
    </div>
  )
};