import React from 'react'
import UserName from '../../Generic/Subcomponents/UserName'
import { styled } from 'styled-components'
import SelectFollowTab from '../../Generic/SelectFollowTab'
import AccountInfo from '../../Generic/AccountInfo'


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
  return (
    <StyledDiv>
        <UserName/>
        <SelectFollowTab activeTab={false}/>
        <AccountInfo/>
    </StyledDiv>
  )
}
