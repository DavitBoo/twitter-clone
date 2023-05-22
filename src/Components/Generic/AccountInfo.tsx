import React from 'react'
import { styled } from 'styled-components'
import testImg from '../../assets/test-2.jpg'

const StyledDiv = styled.div `

    padding: 1rem;
    border-top: 1px solid var(--color-border);
    cursor: pointer;

    &:hover{
        background-color: var(--color-hover);
    }

    .flex-col{
        display: flex;
        flex-direction: column;
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
        background-color: #000;
        font-weight: 700;
        padding: .5rem 1rem;

        transition: all .2s;

        &:hover{
            background-color: #000000ba;
        }
    }
`;

export default function AccountInfo() {
  return (
    <StyledDiv className='flex'>
        <img src={testImg} alt='' />
        <div className='flex-col container'>
            <div className='flex follow-user'>
                <div className='flex-col user-info'>
                    <p className='userName'>davitAmKaltenBorn</p>
                    <p className='userAccount'>@davitAmkKaltenBorn</p>
                </div>
                <div>
                    <button>Follow</button>
                </div>
            </div>
            <div>
                <p className='description'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>
        </div>
    </StyledDiv>
  )
}
