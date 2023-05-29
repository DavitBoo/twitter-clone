import React from 'react'
import SelectMenu from './SelectMenu'

interface TopBarProps {
  activeMenu: boolean
  setActiveMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TopBar({activeMenu, setActiveMenu}: TopBarProps) {
  return (
    <div>
        <SelectMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>
    </div>
  )
}
