import { AccessTimeSharp, HelpOutline, Logout, SearchSharp } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import React from 'react';
import './header.css';
import { useStateValue } from '../../StateProvider';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { actionTypes } from '../../reducer';

export default function Header() {

  const [{ user }] = useStateValue();
  const [state, dispatch] = useStateValue();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth)
        .then(() => {
          dispatch({
            type: actionTypes.SET_USER,
            user: null,
          })
          navigate('/login')
        }).catch((error) => {
          alert(error.message);
        });
    } catch (e) {
      console.log(e.message)
    }
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
