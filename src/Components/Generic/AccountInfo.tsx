import React, { useContext, useEffect } from 'react'

// libraries
import { styled } from 'styled-components'

// context
import { UserContext } from '../../Context/UserContext';
import { updateFollowers } from '../../firebase/config';



const StyledDiv = styled.div `

    padding: 16px;
    border-top: 1px solid var(--color-border);
    cursor: pointer;
    justify-content: space-between;
    align-items: center;

    &:hover{
        background-color: var(--color-hover);
    }

    .flex-col{
        display: flex;
        flex-direction: column;
    }

    .up-container{
        justify-content: space-between !important;
    }

    .container{
        padding: 0 16px;

        p{
            padding: 4px;
            margin: 0;
        }
    }


    .follow-user{
        justify-content: space-between;
        align-items: center;
    }

    .user-info{
        .userName{
            font-weight: 700;
        }

        .userAccount{
            color: var(--color-text-secondary)
        }
    }

    img{
        width: 50px;
        height: 50px;
        border-radius: 100%;
    }

    button{
        
        font-weight: 700;
        padding: 8px 16px;
        height: 36px;
        transition: all .2s;

        &.follow-btn{
            background-color: #000;
            &:hover{
                background-color: #000000ba;
            }
        }

        &.following-btn{
            background-color: #fff;
            color: #000;
            border: var(--color-border) 1px solid;
        }
    }
`;


export default function AccountInfo({ gotUser }: any) {

  const { userDataState, setUserDataState } = useContext(UserContext);

  const handleFollowingClick = () => {
    updateFollowers(userDataState?.username, gotUser.username, 'remove')
    setUserDataState(prevState => ({
        ...prevState!,
    following: prevState!.following.filter(username => username !== gotUser.username),
      }))
    
  }
  
  const handleFollowClick = () => {
    updateFollowers(userDataState?.username, gotUser.username, 'add')
    setUserDataState(prevState => ({
        ...prevState!,
    following: [...prevState!.following, gotUser.username],
      }))
  }
  

  return (
    <StyledDiv className='flex'>
        <div className="flex">
            <img src={gotUser.profilImg} alt='' />
            <div className='flex-col container' >
                <div className='flex follow-user'>
                    <div className="flex">
                        <div className='flex-col user-info'>
                            <p className='userName'>{gotUser.name}</p>
                            <p className='userAccount'>@{gotUser.username}</p>
                        </div>
                        <div>
            
                        </div>
                    </div>
                </div>
                <div>
                    <p className='description'>{gotUser.bio}</p>
                </div>
            </div>
        </div>
       {userDataState?.following.includes(gotUser.username)? 
        <button className='following-btn' onClick={handleFollowingClick}>Following</button>:
        <button className='follow-btn' onClick={handleFollowClick}>Follow</button>}
    </StyledDiv>
  )
}
