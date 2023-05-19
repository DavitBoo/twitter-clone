import React, {useContext} from 'react'
import { UserContext } from '../../Context/UserContext'
import ContentForUser from '../Generic/ContentForUser'
import CoverImage from '../Generic/Subcomponents/CoverImage'
import SelectTimelines from '../Generic/SelectTimelines'
import UserName from '../Generic/Subcomponents/UserName'

import { NavLink } from 'react-router-dom'
import { styled } from 'styled-components'

import Icon from '@mdi/react';
import { mdiCalendarMonthOutline, mdiArrowLeft } from '@mdi/js';


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

  const { userDataState } = useContext(UserContext);

  return (
    <StyledDiv>
        <div className='header'>
          <NavLink to="/">
            <Icon path={mdiArrowLeft} size={1} />
          </NavLink>
          <div className='flex-col'>
            <h1>Profile</h1>
            <p>{userDataState?.inputs.length} tweets</p>
          </div>  
        </div>
        <div className="cover">
          <CoverImage/>
          <NavLink className="edit-profile-btn" to="/settings">Edit Profile</NavLink>
        </div>
        <div className='user-info'>
          <UserName/>
          <div className='join-date'>
            <Icon path={mdiCalendarMonthOutline} size={1} />
            <p>Joined May 2023</p>
          </div>
          <div className='follow-info'>
            <NavLink to="/profile/following"><p><strong>{userDataState?.following.length}</strong> Following</p></NavLink>
            <NavLink to="/profile/followers"><p><strong>{userDataState?.followers.length}</strong> Followers</p></NavLink>
          </div>
        </div>

        <SelectTimelines/>
        <ContentForUser/>
        <ContentForUser/>
        <ContentForUser/>

    </StyledDiv>
  )
}
