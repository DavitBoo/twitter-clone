import React from 'react'
import { styled } from 'styled-components'

const StyledDiv = styled.div`
  .form{
    display: flex;
    flex-direction: column;
    padding: 1rem;
    
    > div {
      margin: .5rem 0;
      position: relative;
      padding-left: 1ch;
      padding-bottom: 2rem;
      border: 1px solid var(--color-border);
      border-radius: 5px;

      &:focus-within{
          border: 2px solid var(--color-primary);
        }
    
      label{
        font-size: .7rem;
        color: var(--color-text-secondary)
      }

      input{
        position: absolute;
        top: 1.25rem;
        left: 1ch;
        outline: none;
        border: none;
        width: calc(100% - 2ch);

      }
    }
  }

  button{
    background-color: #000;
    padding: .6rem 1.2rem;
    font-weight: 700;
    cursor: pointer;
    align-self: self-start;

    &:hover{
      background-color: #323232;
      transition: all .2s;
    }
  }

`

export default function FormForSettings() {
  return (
    <StyledDiv>
        <div className='form'>
          <div>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" placeholder='' />
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input id="username" type="text" placeholder='' />
          </div>
          <div>
            <label htmlFor="bio">Bio</label>
            <input id="bio" type="text" placeholder='' />
          </div>
          <button>Save</button>
        </div>
    </StyledDiv>
  )
}
