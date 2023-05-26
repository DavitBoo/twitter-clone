import React, { useState } from 'react'
import { styled } from 'styled-components'

const StyledDiv = styled.div`

  font-weight: 700;

  ul{
    display: flex;
    justify-content: space-around;
    padding: 0;

    
  }

  ul li{
    flex: 1 1 100%;

    &:hover{
      background-color: #dee3e9;
      transition: all .2s;
    }
  }

  ul > li > div {
    text-align: center;
    cursor: pointer;
  }

  ul > li > .active > div{
    background-color: var(--color-primary);
    height: 4px;
    align-self: center;
    min-width: 56px;
    display: inline-block;
  }

  ul > li > div:not(.active){
    color: var(--color-text-secondary);
  }


`;

export default function SelectMenu({activeMenu, setActiveMenu}: any) {
    
  const activeLeftByClick = () => {
    setActiveMenu(true)
  }

  const activeRightByClick = () => {
    setActiveMenu(false)
  }
  
  return (

 
    <StyledDiv>
        <ul>
            <li onClick={activeLeftByClick}>
              <div className={activeMenu?'active':'' } >
                <p>For you</p>
                <div></div>
              </div>
            </li>
            <li onClick={activeRightByClick}>
              <div className={activeMenu?'':'active'} >
                <p>Following</p>
                <div></div>
              </div>
            </li>
            
        </ul>
    </StyledDiv>
  )
}
