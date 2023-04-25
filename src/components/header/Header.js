import { AccessTimeSharp, HelpOutline, Logout, SearchSharp } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import React from 'react';
import './header.css';
import { useStateValue } from '../../StateProvider';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Header() {

  const [{ user }] = useStateValue();
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <div className='header'>
      <div className="header_left">
        <Avatar className='header_avatar' alt={user?.displayName} src={user?.photoURL} />
        <AccessTimeSharp />
      </div>
      <div className="header_search">
        <SearchSharp />
        <input type="search" name="search" id="" placeholder='Enter Keywords to Search' />
      </div>
      <div className="header_right">
        <HelpOutline />
        <button onClick={handleLogout}>
          Logout
          <Logout />
        </button>
      </div>
    </div>
  )
}
