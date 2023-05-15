import React from 'react'
import { styled } from 'styled-components'

const StyledDiv = styled.div`

    ul{
        border-radius: 8px;
        box-shadow: 0px 0px 10px #00000046;
    }

    ul li{
        /* border-top: 1px solid var(--color-border);
        border-bottom: 1px solid var(--color-border); */
        /* padding: ; */
        border-radius: 8px;
        padding: .75rem;
        font-size: 1rem;
        font-weight: 700;

        &:hover {
            background-color: rgba(15, 20, 25, 0.1);
            cursor: pointer;
        }
    }   

`


export default function MoreMenu() {
  return (
    <StyledDiv>
        <ul>
            <li>Logout</li>
        </ul>
    </StyledDiv>
  )
}
