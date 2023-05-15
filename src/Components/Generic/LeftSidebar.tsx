import React, { useState } from 'react'
import MainMenu from './MainMenu'
import logo from '../../assets/logo.png'
import { styled } from 'styled-components'

const StyledDiv = styled.div `

  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .fixed-container{
    height: 100vh;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 10rem;
  }

  ul{
    padding: 0;
  }

  img {
    width: 40px;
    height: 40px;
    padding: 5px;
    
  }

  .logo{
    border-radius: 100% ;
    transition: all .2s;
    display: inline-block;

    &:hover {
      background-color: rgba(15, 20, 25, 0.1);
    }
  }

  .footer{
    max-width: 100%;
    color: var(--color-text-secodary);
    margin-bottom: 2rem;

    a:hover{
      color: var(--color-primary);
    }
  }

  .active{
    font-weight: 900;
  }

`;

export default function LeftSidebar() {
  return (
    <StyledDiv className='left-sidebar'>
      <div className="fixed-container">
        <div>
          <a href="/#" className='logo'><img src={logo} alt="" /></a>
          <MainMenu/>
        </div>
        <div className='footer'><a href="https://github.com/DavitBoo/twitter-clone">About this project</a></div>
      </div>
    </StyledDiv>
  )
}
