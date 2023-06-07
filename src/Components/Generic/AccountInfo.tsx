import React from 'react'

// libraries
import { styled } from 'styled-components'

const StyledDiv = styled.div `

    padding: 1rem;
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
        padding: 0 1rem;

        p{
            padding: 0.25rem;
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
        padding: .5rem 1rem;
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
        <button className='follow-btn'>Follow</button>
        <button className='following-btn'>Following</button>
    </StyledDiv>
  )
}
