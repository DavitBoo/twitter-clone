import React from 'react'
import { styled } from 'styled-components'

import { auth } from "../../firebase/config";

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

interface MoreMenuProps {
    setOverlayDisplay: React.Dispatch<React.SetStateAction<boolean>>;
    setDisplaySubMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MoreMenu({setOverlayDisplay, setDisplaySubMenu}: MoreMenuProps) {

const handleLogout = async () => {
    setOverlayDisplay(false)
    setDisplaySubMenu(false)
    try {
        await auth.signOut();
        // Realiza cualquier otra acción necesaria después del cierre de sesión exitoso
    } catch (error) {
        // Maneja los errores de cierre de sesión
        console.log(error);
    }
    };

  return (
    <StyledDiv>
        <ul>
            <li onClick={handleLogout}>Logout</li>
        </ul>
    </StyledDiv>
  )
}
