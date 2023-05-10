import React from 'react'
import MainMenu from './MainMenu'
import logo from '../../assets/logo.png'
import { styled } from 'styled-components'

const StyledDiv = styled.div `

  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    max-width: 40px;
    padding: 5px;
    
  }

  > a{
    border-radius: 100% ;
    transition: all .2s;

    &:hover {
      background-color: rgba(15, 20, 25, 0.1);
    }
  }

`;

export default function LeftSidebar() {
  return (
    <StyledDiv>
      <a href=""><img src={logo} alt="" /></a>
      <MainMenu/>
      <div>footer</div>
    </StyledDiv>
  )
}
