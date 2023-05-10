import React from 'react'
import FormForSettings from '../Generic/FormForSettings'
import EditImages from '../Generic/EditImages'
import LeftSidebar from '../Generic/LeftSidebar'

export default function Settings() {
  return (
    <div>
      <LeftSidebar/>
      <EditImages/>
      <FormForSettings/>
    </div>
  )
}
