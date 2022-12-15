import { AccessTimeSharp, HelpOutline, SearchSharp } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import React from 'react';
import './header.css';
import { useStateValue } from '../../StateProvider';

export default function Header() {

  const [{user}] = useStateValue();

  return (
    <div className='header'>
      <div className="header_left">
        <Avatar className='header_avatar' alt={user?.displayName} src={user?.photoURL}/>
        <AccessTimeSharp />
      </div>
      <div className="header_search">
        <SearchSharp />
        <input type="search" name="search" id="" placeholder='Enter Keywords to Search'/>
      </div>
      <div className="header_right">
        <HelpOutline />
      </div>
    </div>
  )
}
