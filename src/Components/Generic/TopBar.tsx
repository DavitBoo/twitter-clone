import React from 'react'
import SelectMenu from './SelectMenu'

enum ActiveMenu {
  ForYou,
  Following,
}

interface TopBarProps {
  activeMenu: ActiveMenu
  setActiveMenu: React.Dispatch<React.SetStateAction<ActiveMenu>>;
  logged: any
}

export default function TopBar({activeMenu, setActiveMenu, logged }: TopBarProps) {
  return (
    <div>
        <SelectMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} logged={logged}/>
    </div>
  )
}
