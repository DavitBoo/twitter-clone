import React, { useContext, useEffect, useState } from 'react'

// use Context
import { UserContext } from '../../../Context/UserContext'

// components
import UserName from '../../Generic/Subcomponents/UserName'
import SelectFollowTab from '../../Generic/SelectFollowTab'
import AccountInfo from '../../Generic/AccountInfo'

// libraries
import { styled } from 'styled-components'
import { NavLink, useParams } from 'react-router-dom'

// firebase
import { checkUsers } from '../../../firebase/config'

// icons
import Icon from '@mdi/react';
import { mdiCalendarMonthOutline, mdiArrowLeft } from '@mdi/js';


const StyledDiv = styled.div `
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

`

export default function Following() {

  // context
  const { userDataState } = useContext(UserContext);

  // use params
  const { username } = useParams<{ username: string }>();


  // useState
  const [displayedUser, setDisplayedUser] = useState(undefined)

  // useEffect
  useEffect(() => {
    const getUser = async () => {
      const currentUserFromDB = await checkUsers(username);
      console.log(currentUserFromDB)
      setDisplayedUser(currentUserFromDB);
    };

    getUser();
  }, [username]);

  return (
    <StyledDiv>
      <div className='header'>
        <NavLink to={`/${username}`}>
              <Icon path={mdiArrowLeft} size={1} />
        </NavLink>
        <UserName displayedUser={displayedUser}/>
      </div>
      <SelectFollowTab />
      {userDataState?.following.map((followingUser) => {
        const gotUser = checkUsers(followingUser)
        if (gotUser !== undefined) {
          return <AccountInfo key={followingUser.uid} />;
        }
        return null;
      })}
    </StyledDiv>
  )
}
