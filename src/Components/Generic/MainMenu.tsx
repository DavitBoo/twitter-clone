import React from 'react'
import Icon from '@mdi/react';
import { mdiHomeOutline, mdiAccountOutline, mdiCogOutline, mdiDotsHorizontalCircleOutline } from '@mdi/js';
import { styled } from 'styled-components';
import { NavLink } from 'react-router-dom'

const StyledDiv = styled.div `
  font-size: 1.2rem;

  ul{
    display: flex;
    flex-direction: column;
    gap: .5rem;
  }

  ul > li > a{
    display: flex;
    align-items: center;
  }

  a{
    display: flex;
    gap: 1rem;

    border-radius : 2rem ;
    transition: all .2s;
    padding: 0 1rem;
    /* font-weight: 700; */

    &:hover {
      background-color: rgba(15, 20, 25, 0.1);
    }

    &.active{

    }
  }
`
export default function MainMenu() {

  
  return (
    <StyledDiv>
        <ul>
            <li>
              <NavLink to="/">
                  <Icon path={mdiHomeOutline} size={1} /> <p>Home</p>
                </NavLink>         
            </li>
            <li>
              <NavLink to="/profile">
                <Icon path={mdiAccountOutline} size={1} /> <p>Profile</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings">
                <Icon path={mdiCogOutline} size={1} /> <p>Settings</p>
              </NavLink>
            </li>
            <li>
                <a href="">
                  <Icon path={mdiDotsHorizontalCircleOutline} size={1} />
                  <p>More</p>
                </a>
                <ul>
                    <li>Logout</li>
                </ul>
            </li>
        </ul>
    </StyledDiv>
  )
}
