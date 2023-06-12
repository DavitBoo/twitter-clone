import React, { useEffect, useState } from 'react'

// components
import MainMenu from './MainMenu'
import logo from '../../assets/logo.png'

// libraries
import { styled } from 'styled-components'
import { NavLink } from 'react-router-dom'

interface StyledDivProps {
  showSidebar: boolean;
}

const StyledDiv = styled.div<StyledDivProps> `

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
    margin-right: 160px;
    z-index: 20;

    transform: ${({ showSidebar }) => (showSidebar ? 'translateX(0)' : 'translateX(-300%)')};
    transition: transform 0.3s ease;

    @media (max-width: 980px) {
      margin-right: 0rem;
      padding-left: 48px;
      align-items: center;
    }
    
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
    filter: drop-shadow(0px 4px 2px hsl(220deg 60% 50%));

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

  @media (max-width: 980px) {
    .center-on-tablet {
      align-items: center;
    }
  }

`;

interface LeftSidebarProps {
  setOverlayDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplaySubMenu: React.Dispatch<React.SetStateAction<boolean>>;
  displaySubMenu: boolean;
}



const LeftSidebar: React.FC<LeftSidebarProps> = ({ setOverlayDisplay, setDisplaySubMenu, displaySubMenu }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  
  useEffect(() => {
    setShowSidebar(true);
  }, []);

  return (
    <StyledDiv className='left-sidebar ' showSidebar={showSidebar}>
      <div className="fixed-container ">
        <div>
          <NavLink to="/" className='logo'><img src={logo} alt="" /></NavLink>
          <MainMenu  
              setOverlayDisplay={setOverlayDisplay}
              displaySubMenu={displaySubMenu}
              setDisplaySubMenu={setDisplaySubMenu}
            />
        </div>
        <div className='footer'><a target="_blank" href="https://github.com/DavitBoo/twitter-clone">About this project</a></div>
      </div>
    </StyledDiv>
  )
}

export default LeftSidebar