import React, {useContext} from 'react'
import { UserContext } from '../../../Context/UserContext'

export default function UserName() {
  const { userDataState } = useContext(UserContext);

  return (
    <div>
        <div className="user-name">
            <h2>{userDataState?.name}</h2>
            <p>@{userDataState?.username}</p>
          </div>
    </div>
  )
}
