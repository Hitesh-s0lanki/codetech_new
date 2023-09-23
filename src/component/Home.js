import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import Problems from './Problems';
import { Grid, GridItem } from '@chakra-ui/react';
import Profile from './Profile';

const cookies = new Cookies()

const Home = () => {
    const { isUser, getUser} = useAuthContext()
    const navigator = useNavigate()
    const [profile,setProfile] = useState({name:""})

    useEffect(() => {
        if (!isUser || cookies.get('auth') === "") {
            navigator("/");
        } else {
            const user = getUser();
            setProfile(user);
        }
    }, [navigator, setProfile, isUser, getUser]);

    if(cookies.get('auth')){
        return (
          <div className='h-full'>
              <main className='container h-full'>
              <Grid gap={4} templateColumns='repeat(4, 1fr)'>
                  <GridItem colSpan={3}><Problems /></GridItem>
                  <GridItem ><Profile name={profile.name} score={profile.score} /></GridItem>
              </Grid>
              </main>
          </div>
        )
    } 
    return <></>
}

export default Home
