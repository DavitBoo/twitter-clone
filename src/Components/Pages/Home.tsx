import React, { useState } from 'react'
import TopBar from '../Generic/TopBar'
import ContentMain from '../Generic/ContentMain'


export default function Home() {

  const [activeMenu, setActiveMenu] = useState(true)

  return (
    <div>
      <h1>Home</h1>
      <TopBar activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>
      <ContentMain activeMenu={activeMenu}/>
    </div>
  )
}
