import React from 'react'
import SelectMenu from './SelectMenu'

enum ActiveMenu {
  ForYou,
  Following,
}

interface TopBarProps {
  activeMenu: ActiveMenu
  setActiveMenu: React.Dispatch<React.SetStateAction<ActiveMenu>>;
}

export default function TopBar({activeMenu, setActiveMenu}: TopBarProps) {
  return (
    <div>
        <SelectMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>
    </div>
  )
}
