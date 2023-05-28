import React, { useContext } from 'react'
import UserName from '../../Generic/Subcomponents/UserName'
import { styled } from 'styled-components'
import SelectFollowTab from '../../Generic/SelectFollowTab'
import AccountInfo from '../../Generic/AccountInfo'
import { UserContext } from '../../../Context/UserContext'
import { checkUsers } from '../../../firebase/config'


const StyledDiv = styled.div `
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


export default function Followed() {

  // context
  const { userDataState } = useContext(UserContext);
  return (
    <StyledDiv>
        <UserName/>
        <SelectFollowTab/>
        {userDataState?.followers.map((followedUser) => {
        const gotUser = checkUsers(followedUser)
        if (gotUser !== undefined) {
          return <AccountInfo key={followedUser.uid} />;
        }
        return null;
      })}
    </StyledDiv>
  )
}
