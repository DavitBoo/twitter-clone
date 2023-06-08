import React, {useContext, useEffect, useState} from 'react'

// components
import ContentForUser from '../Generic/ContentForUser'
import CoverImage from '../Generic/Subcomponents/CoverImage'
import SelectTimelines from '../Generic/SelectTimelines'
import UserName from '../Generic/Subcomponents/UserName'

// context
import { UserContext } from '../../Context/UserContext'
import { InputsContext } from '../../Context/InputsContext'

// react libreries
import { NavLink, useParams } from 'react-router-dom'
import { styled } from 'styled-components'

// icon library
import Icon from '@mdi/react';
import { mdiCalendarMonthOutline, mdiArrowLeft } from '@mdi/js';
import { loadUserData, updateFollowers } from '../../firebase/config'


const StyledDiv = styled.div`

  .header{
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    gap: 2rem;

    a{
      cursor: pointer;
      padding: .5rem;
      border-radius: 100%;

      &:hover{
        background-color: var(--color-hover);
      }
    }

    > div > *{
      margin: 5px;
    }
  }

  .edit-profile-btn{
    background-color: #fff;
    color: #000;
    border: 1px solid var(--color-border);
    padding: .75rem .5rem;
    font-weight: 700;
    margin: 1rem;

    border-radius: 100rem;
    cursor: pointer;
    
    &:hover{
      background-color:#f9f9fc;
      cursor: pointer;
    }

    &.follow-btn{
        width: 80px;
        text-align: center;
        background-color: #000;
        color: #fff;
        &:hover{
            background-color: #000000ba;
      }
    }
  }


      
  .cover{
    max-width: 100%;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .user-info{
    padding-left: 16px;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .user-name{
      margin: .5rem 0;
    }

    h2{
      margin: 0;
    }

    p{
      margin: 0;
      color: var(--color-text-secondary);
    }

    .join-date{
      display: flex;
      align-items: center;
    }

    .follow-info{
      display: flex;
      gap: 1rem;
    }

  }

`


export default function Profile() {
  
  
  // useState
  const [userData, setUserData] = useState<any>(null)
  const [inputCounted, setInputCounted] = useState(0)
  

  // useContext
  const { userDataState, setUserDataState } = useContext(UserContext)
  const { inputsState } = useContext(InputsContext)
  

  // userParams --- react-router
  const { username } = useParams<{ username: string }>();

   // Verificar si userData está cargando o si está presente
   const isLoadingUserData = !userData;
  
  useEffect(() => {
    if(username && username !== 'profile'){
      loadUserData(username).then((userData: any) => {
        console.log(userData)
        setUserData(userData)
      });
    } else if (username === 'profile'){
      setUserData(userDataState)
    }
  }, [username,userDataState])


  // I count the posts per profile (just the user we are checking)
  useEffect(() => {
    let count = 0;

    if (inputsState && userDataState) {
      inputsState.forEach((input) => {
        if (
          username === "profile"
            ? userDataState?.following?.includes(input.uid)
            : (username ? username : userDataState?.username) === input.uid
        ) {
          count++;
        }
      });
    }
    
    setInputCounted(count);
  }, [inputsState, userDataState, username]);
  
   // Renderizar un mensaje de carga si userData está cargando
   if (isLoadingUserData) {
    return <div>Loading user data...</div>;
  }

   if (!userDataState) {
    return <div>Loading user data...</div>;
  }

  
  const handleFollowingClick = () => {
    updateFollowers(userDataState?.username, username, 'remove')
    setUserDataState(prevState => ({
        ...prevState!,
    following: prevState!.following.filter(toRemove => toRemove !== username),
      }))
    
  }
  
  const handleFollowClick = () => {
    updateFollowers(userDataState?.username, username, 'add')
    setUserDataState(prevState => ({
        ...prevState!,
    following: [...prevState!.following, username],
      }))
  }

  return (
    <StyledDiv>
        <div className='header'>
          <NavLink to="/">
            <Icon path={mdiArrowLeft} size={1} />
          </NavLink>
          <div className='flex-col'>
            <h1>{userData && (userData==='profile' ? 'profile' : userData.name)}</h1>
            <p>{inputCounted} tweets</p>
          </div>  
        </div>
        <div className="cover">
          <CoverImage profilImg={userData?.profilImg} coverImg={userData?.coverImg} userProfileName={username}/>
          {username === 'profile' ? (     // if user is in the profile tab
          <NavLink className="edit-profile-btn" to="/settings">
            Edit Profile
          </NavLink>
          ) : username === userDataState?.username ? (    // if the user checks its own profile
            <div className="edit-profile-btn "></div>
          ) : (
            <>
              {userDataState?.following.includes(username) ? (    // if the user is following this account
                <div className="edit-profile-btn" onClick={handleFollowingClick}>Following</div>
              ) : (
                <div className="edit-profile-btn follow-btn" onClick={handleFollowClick}>Follow</div>
              )}
            </>
          )}
        </div>
        <div className='user-info'>
          <UserName displayedUser={userData}/>
          <div className='join-date'>
            <Icon path={mdiCalendarMonthOutline} size={1} />
            <p>Joined {userData ? userData.creationData : userDataState?.creationData}</p>
          </div>
          <div className='follow-info'>
            <NavLink to={`/${(userData ? userData.username : 'profile')}/following`}><p><strong>{userData ? userData.following?.length : userDataState?.following.length}</strong> Following</p></NavLink>
            <NavLink to={`/${(userData ? userData.username : 'profile')}/followers`}><p><strong>{userData ? userData.followers?.length : userDataState?.followers.length}</strong> Followers</p></NavLink>
          </div>
        </div>

        <SelectTimelines/>
        
        {(inputsState && userDataState) &&
        inputsState.map((input, index) => {

          if (username === 'profile' ? (userDataState?.following?.includes(input.uid)) : ((username ? username : userDataState?.username) === input.uid)) {
            return (
              <ContentForUser
                key={index}
                likes={input.likes}
                content={input.content}
                uid={input.uid}
                fecha={input.fecha}
                inputId= {input.inputId}
              />
            );
          }
          return null;
        })}
    </StyledDiv>
  )
}
