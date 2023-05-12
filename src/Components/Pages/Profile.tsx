import React from 'react'
import ContentForUser from '../Generic/ContentForUser'
import CoverImage from '../Generic/Subcomponents/CoverImage'
import SelectMenu from '../Generic/SelectMenu'
import UserName from '../Generic/Subcomponents/UserName'

import { styled } from 'styled-components'

import Icon from '@mdi/react';
import { mdiCalendarMonthOutline } from '@mdi/js';



const StyledDiv = styled.div`

  button{
    background-color: #fff;
    color: #000;
    border: 1px solid var(--color-border);
    padding: .5rem;
    font-weight: 700;
    margin: 1rem;
    

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
    }

  }

`

export default function Profile() {
  return (
    <StyledDiv>
        <h1>Profile</h1>
        <div className="cover">
          <CoverImage/>
          <button>Edit Profile</button>
        </div>
        <div className='user-info'>
          <UserName/>
          <div className='join-date'>
            <Icon path={mdiCalendarMonthOutline} size={1} />
            <p>Joined May 2023</p>
          </div>
          <div className='follow-info'>
            <p><strong>1</strong> Following</p>
            <p><strong>1</strong> Followers</p>
          </div>
        </div>

        <SelectMenu/>
        <ContentForUser/>
        <ContentForUser/>
        <ContentForUser/>

    </StyledDiv>
  )
}
