import React, { useEffect, useState } from 'react'

// components
import MoreMenu from './MoreMenu';

// icon library
import Icon from '@mdi/react';
import { mdiHomeOutline, mdiAccountOutline, mdiCogOutline, mdiDotsHorizontalCircleOutline, mdiHome, mdiAccount, mdiCog, mdiDotsHorizontalCircle } from '@mdi/js';

// react libraries
import { styled } from 'styled-components';
import { NavLink } from 'react-router-dom'



const StyledDiv = styled.div `
  font-size: 1.2rem;
  
  ul{
    display: flex;
    flex-direction: column;
    gap: .5rem;

    @media (max-width: 768px){
      flex-direction: row;
    }
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
    

    &:hover {
      background-color: rgba(15, 20, 25, 0.1);
      svg{
        filter: drop-shadow(0px 0px 2px hsl(220deg 80% 70%));
      }
    }

  }

  ul.mobile-icons > li > a {
    /* Aumentar el espacio vertical entre los iconos */
    margin-bottom: 1rem;
  }

  ul.mobile-icons a {
    /* Aumentar el tamaño de los iconos */
    font-size: 5rem !important;
  }

  @media (max-width: 980px) {
    .hide-on-tablet {
      display: none;
    }
  }

`


interface LeftSidebarProps {
  setOverlayDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplaySubMenu: React.Dispatch<React.SetStateAction<boolean>>;
  displaySubMenu: boolean;
  logged: any
}

// Tupla's types are defined 
type MenuItem = [string, string, string, string];

// this is the info to fill the <ul> element with each <li>  
// [displayed name, normal icon, hover icon, route]
const menuItems: MenuItem[] = [
  ['Home', mdiHomeOutline, mdiHome, '/'],
  ['Profile', mdiAccountOutline, mdiAccount, '/profile'],
  ['Settings', mdiCogOutline, mdiCog, '/settings'],
  ['More', mdiDotsHorizontalCircleOutline, mdiDotsHorizontalCircle, '#'],
];

export default function MainMenu({ setOverlayDisplay, setDisplaySubMenu, displaySubMenu, logged }: LeftSidebarProps ) {

  const [activeItem, setActiveItem] = useState('');

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 980);
  const [iconSize, setIconSize] = useState(isMobile ? 1.3 : 1);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 980;
      setIsMobile(mobile);
      setIconSize(mobile ? 1.3 : 1);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setDisplaySubMenu(true)
    setOverlayDisplay(true)
  }

  const handleMouseEnter = (text: string) => {
    // Actualizar estado en función del enlace en el que se hizo hover
    setActiveItem(text);
  };

  const handleMouseLeave = () => {
    // Reiniciar estado cuando el mouse sale del menú
    setActiveItem('');
  };

  return (
    <StyledDiv>
      {/* onClick event to close logout submenu  */}
      <ul className={isMobile ? 'mobile-icons' : ''} onMouseLeave={handleMouseLeave} onClick={displaySubMenu ? () => setDisplaySubMenu(false) : undefined}>
        {/* instead of have to write the whole menu, it takes it from the tupla */}
        {menuItems
          .filter((item) => logged|| item[0] === 'Home')
          .map((item, index) => (
            <li key={index}>
              <NavLink to={item[3]} onClick={item[0] === 'More' ? handleClick : undefined} onMouseEnter={() => handleMouseEnter(item[0])} className={activeItem === item[0] ? 'active' : ''}>
                <Icon path={activeItem === item[0] ? item[2] : item[1]} size={iconSize} />
                <p className="hide-on-tablet">{item[0]}</p>
              </NavLink>
            </li>
          ))}
      </ul>

      { displaySubMenu && 
        <MoreMenu 
          setOverlayDisplay={setOverlayDisplay}
          setDisplaySubMenu={setDisplaySubMenu}
        /> 
      }
    </StyledDiv>
  )
}
