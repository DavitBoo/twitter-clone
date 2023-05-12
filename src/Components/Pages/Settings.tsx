import React from 'react'
import FormForSettings from '../Generic/FormForSettings'
import UserName from '../Generic/Subcomponents/UserName'
import CoverImage from '../Generic/Subcomponents/CoverImage'
import { styled } from 'styled-components'


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

`

export default function Settings() {
  return (
    <StyledDiv>
      <UserName/>
      <CoverImage/>      
      <FormForSettings/>
    </StyledDiv>
  )
}
