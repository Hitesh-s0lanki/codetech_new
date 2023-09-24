import { TimeIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'
import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import Cookies from 'universal-cookie'

const cookies = new Cookies()

const Timer = () => {

    const navigate = useNavigate()
    const { setUser} = useAuthContext()
  //Timer Part
    // We need ref in this, because we are dealing
    // with JS setInterval to keep track of it and
    // stop it when needed
    const Ref = useRef(null);
 
    // The state for our timer
    const [timer, setTimer] = useState('00:00:00');
 
    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }
 
    const startTimer = async(e) => {
        let { total, hours, minutes, seconds }
                    = getTimeRemaining(e);
        if (total >= 0) {
 
            // update the timer
            // check if less than 10 then we need to
            // add '0' at the beginning of the variable
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        } else {
            cookies.set('auth',"")
            navigate("/")
            await setUser({})
        }
    }
 
    const clearTimer = (e) => {
 
        // If you adjust it you should also need to
        // adjust the Endtime formula we are about
        // to code next   
        setTimer('00:45:00');
 
        // If you try to remove this line the
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }
 
    const getDeadTime = () => {
        let deadline = new Date();
 
        // This is where you need to adjust if
        // you entend to add more time
        deadline.setSeconds(deadline.getSeconds() + 2700);
        return deadline;
    }
 
    // We can use useEffect so that when the component
    // mount the timer will start as soon as possible
 
    // We put empty array to act as componentDid
    // mount only
    useEffect(() => {
        clearTimer(getDeadTime());// eslint-disable-next-line
    }, []);

  return (
    <Button leftIcon={<TimeIcon/>} colorScheme='pink' variant='solid'>
        {timer}
    </Button>
  )
}

export default Timer