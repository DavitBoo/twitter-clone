import React, { useContext } from 'react'
import FormForSettings from '../Generic/FormForSettings'
import UserName from '../Generic/Subcomponents/UserName'
import CoverImage from '../Generic/Subcomponents/CoverImage'
import { styled } from 'styled-components'
import { NavLink } from 'react-router-dom'

import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';
import { UserContext } from '../../Context/UserContext'


const StyledDiv = styled.div`
  .user-name{
    margin-left: 16px;

    h2{
      margin: 1rem 0 0 0;
    }

    p{
      margin: .5rem 0 1rem 0;
      color: var(--color-text-secondary)
    }

  

  }
  .cover-img{
    margin-bottom: 5rem;
  }

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
  }

`

export default function Settings() {

  // useContext
  const { userDataState } = useContext(UserContext);

  return (
    <StyledDiv>
      <div className='header'>
          <NavLink to="/">
            <Icon path={mdiArrowLeft} size={1} />
          </NavLink>
        <UserName/>
      </div>
      <CoverImage coverImg={userDataState?.coverImg}/>      
      <FormForSettings/>
    </StyledDiv>
  )
}
