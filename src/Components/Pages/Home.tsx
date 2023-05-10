import React from 'react'
import TopBar from '../Generic/TopBar'
import ContentMain from '../Generic/ContentMain'
import LeftSidebar from '../Generic/LeftSidebar'


export default function Home() {
  return (
    <div>
      <LeftSidebar/>
      <TopBar/>
      <ContentMain/>
    </div>
  )
}
