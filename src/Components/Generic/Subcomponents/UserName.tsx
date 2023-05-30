import React, {useContext} from 'react'
import { UserContext } from '../../../Context/UserContext'

export default function UserName({ displayedUser }: any) {
  const { userDataState } = useContext(UserContext);

  return (
    <div>
        <div className="user-name">
          {displayedUser ? 
            <>
              <h2>{displayedUser?.name}</h2>
              <p>@{displayedUser?.username}</p>
            </> :
            <>
              <h2>{userDataState?.name}</h2>
              <p>@{userDataState?.username}</p>
            </>
            
          }
        </div>
    </div>
  )
}
