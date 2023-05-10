import React from 'react'
import SelectMenu from '../Generic/SelectMenu'
import ContentForUser from '../Generic/ContentForUser'
import LeftSidebar from '../Generic/LeftSidebar'

export default function Profile() {
  return (
    <div>
        <LeftSidebar/>
        <p>Img header</p>
        <p>img profile</p>
        <SelectMenu/>
        <ContentForUser/>
    </div>
  )
}
