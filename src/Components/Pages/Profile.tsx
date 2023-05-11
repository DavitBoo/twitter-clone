import React from 'react'
import SelectMenu from '../Generic/SelectMenu'
import ContentForUser from '../Generic/ContentForUser'

import testImage from '../../assets/test.jpg'
import testImage2 from '../../assets/test-2.jpg'
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

  .cover-img{
    width: 100%;
    background-image: url(${testImage2});
    background-position: center center;
    background-size: cover;
    height: 200px;
    position: relative;
    
  }

  img.profile-img{
    width: 130px;
    height: 130px;
    border-radius: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translate(25%, 50%);
    border: 3px solid #fff;
    transition: all .2s;
    

    &:hover{
      filter: grayscale(70%);
      cursor: pointer;
    }
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
          <div className='cover-img'>
            <img className="profile-img" src={testImage} alt="" />
          </div>
          <button>Edit Profile</button>
        </div>
        <div className='user-info'>
          <div className="user-name">
            <h2>Davit Boo</h2>
            <p>@davitBoo</p>
          </div>
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
