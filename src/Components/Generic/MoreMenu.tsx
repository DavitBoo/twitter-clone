import React from 'react'
import { styled } from 'styled-components'

import { auth } from "../../firebase/config";
import { useNavigate } from 'react-router';

const StyledDiv = styled.div`

    ul{
        border-radius: 8px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    }

    ul li{
        /* border-top: 1px solid var(--color-border);
        border-bottom: 1px solid var(--color-border); */
        /* padding: ; */
        border-radius: 8px;
        padding: 12px;
        font-size: 1rem;
        font-weight: 700;
        transition: transform 0.3s ease; 

        &:hover {
            /* background-color: rgba(15, 20, 25, 0.1); */
            transform: translateY(-2px);
            box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
            cursor: pointer;
        }
    }   

`

interface MoreMenuProps {
    setOverlayDisplay: React.Dispatch<React.SetStateAction<boolean>>;
    setDisplaySubMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MoreMenu({setOverlayDisplay, setDisplaySubMenu}: MoreMenuProps) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        setOverlayDisplay(false)
        setDisplaySubMenu(false)
        try {
            await auth.signOut();
            navigate('/login')
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
