import React from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import db from '../../firebase';
import './sidebarOption.css';

export default function SidebarOption({ Icon, title, id, addChannelOption }) {

  const navigate = useNavigate();

  const selectChannel = () => {
    if (id) {
      navigate(`/room/${id}`)
    } else {
      navigate(title)
    }
  };

  const addChannel = async () => {
    const channelName = prompt("Please enter new channel name");

    if (channelName) {
      const dbRef = collection(db, "rooms");
      const data = { name: channelName };
      addDoc(dbRef, data)
    };
  };

  return (
    <>
      <div className='sidebarOption' onClick={addChannelOption ? addChannel : selectChannel}>
        {Icon && <Icon className="sidebarOption_icon" />}
        {Icon ? (
          <h3>{title}</h3>
        ) : (
          <h3 className='sidebarOption_channel'>
            <span className='sidebarOption_hash'># &nbsp;{title}</span>
          </h3>
        )}
      </div>
    </>
  )
}
