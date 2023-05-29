import React from 'react'
import SelectMenu from './SelectMenu'


export default function TopBar({activeMenu, setActiveMenu}: any) {
  return (
    <div>
        <SelectMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>
    </div>
  )
}
