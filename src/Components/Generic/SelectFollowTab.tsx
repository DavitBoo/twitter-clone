import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { NavLink } from 'react-router-dom'

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

  ul > li > a {
    text-align: center;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  

  ul > li > .active > div{
    background-color: var(--color-primary);
    height: 4px;
    
    min-width: 56px;
    /* display: inline-block; */
  }

  ul > li > a:not(.active){
    color: var(--color-text-secondary);
  }


`;

interface SelectFollowTabProps{
    activeTab: boolean
}

export default function SelectFollowTab({activeTab}: SelectFollowTabProps) {
  
  const [activeMenu, setActiveMenu] = useState(true)
  
  // useEffect(() => {
  //   setActiveMenu(activeTab)
  // }, [activeTab])
  
  
  return (

    <StyledDiv>
        <ul>
            <li onClick={undefined}>
              <NavLink to="/profile/followers">
                <p>Followers</p>
                <div></div>
              </NavLink>
            </li>
            <li onClick={undefined}>
              <NavLink to="/profile/following" >
                <p>Following</p>
                <div></div>
              </NavLink>
            </li>
            
        </ul>
    </StyledDiv>
  )
}
