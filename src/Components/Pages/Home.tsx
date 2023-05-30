import React, { useState } from 'react'
import TopBar from '../Generic/TopBar'
import ContentMain from '../Generic/ContentMain'


enum ActiveMenu {
  ForYou,
  Following,
}



export default function Home() {

  const [activeMenu, setActiveMenu] = useState(ActiveMenu.ForYou)

  return (
    <div>
      <h1>Home</h1>
      <TopBar activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>
      <ContentMain activeMenu={activeMenu}/>
    </div>
  )
}
