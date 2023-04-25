import React from 'react';
import './login.css';
import Slack from '../assets/Slack.svg';
import { Button } from '@mui/material';
import { browserLocalPersistence, setPersistence, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';

export default function Login() {

    const [state, dispatch] = useStateValue();

    const signIn = async () => {
        await setPersistence(auth, browserLocalPersistence)
        signInWithPopup(auth, provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            }).catch((error) => {
                alert(error.message);
            });
    }

    return (
        <div className='login'>
            <div className="login_container">
                <img src={Slack} alt="" />
                <h1>Sign in to Slack Clone</h1>
                <p>Developed by Uvaish Khan</p>
                <Button onClick={signIn}>Sign In with Google</Button>
            </div>
        </div>
    )
}
