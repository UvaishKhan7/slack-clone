import { Add, Create, FiberManualRecord } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import SidebarOption from '../sidebarOption/SidebarOption';
import './sidebar.css';
import db from '../../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { useStateValue } from '../../StateProvider';


export default function Sidebar() {

    const [channels, setChannels] = useState([]);
    const colRef = collection(db, "rooms");
    const [{ user }] = useStateValue();

    useEffect(() => {
        onSnapshot(colRef, (snapshot) => {
            setChannels(snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
                name: doc.data().name
            })))
        })// eslint-disable-next-line
    }, []);

    return (
        <div className='sidebar'>
            <div className="sidebar_header">
                <div className="sidebar_info">
                    <h2>The Troubleshooter</h2>
                    <h3><FiberManualRecord />{user?.displayName}</h3>
                </div>
                <Create />
            </div>
            <div className="sidebar_options">
                <SidebarOption Icon={Add} addChannelOption title="Add Channels" />
                {channels.map((channel) => {
                    return (
                        <SidebarOption key={channel.id} id={channel.id} title={channel.name} />
                    );
                })}
            </div>
        </div>
    )
};
