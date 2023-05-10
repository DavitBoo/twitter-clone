import React from 'react'
import SelectMenu from './SelectMenu'
import SearchMenu from './SearchMenu'
import { styled } from 'styled-components'

const StyledDiv = styled.div`
  width: 100%;
`

export default function TopBar() {
  return (
    <div>
        <SelectMenu/>
        <SearchMenu/>
    </div>
  )
}
