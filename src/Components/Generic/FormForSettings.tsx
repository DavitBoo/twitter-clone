import React, { useContext, useRef } from 'react'
import { styled } from 'styled-components'
import { UserContext } from '../../Context/UserContext';
import { updateUserProfile } from '../../firebase/config';

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

  // useState
  const { userDataState, setUserDataState } = useContext(UserContext);

  // useRef
  const nameRef = useRef<HTMLInputElement>(null)
  // const usernameRef = useRef<HTMLInputElement>(null)
  const bioRef = useRef<HTMLInputElement>(null)

  const handleSave = () => {
    const name = nameRef.current?.value ?? '';
    // const username = usernameRef.current?.value ?? '';
    const bio = bioRef.current?.value ?? '';

    updateUserProfile(userDataState?.username, name, bio);

    setUserDataState(prevState => ({
      ...prevState!,
      // username: username,
      name: name,
      bio: bio
    }));
  };
  
  return (
    <StyledDiv>
        <div className='form'>
          <div>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" placeholder='' defaultValue={userDataState?.name} ref={nameRef}/>
          </div>
          {/* <div>
            <label htmlFor="username">Username</label>
            <input id="username" type="text" placeholder='' defaultValue={userDataState?.username} ref={usernameRef}/>
          </div> */}
          <div>
            <label htmlFor="bio">Bio</label>
            <input id="bio" type="text" placeholder='' defaultValue={userDataState?.bio} ref={bioRef}/>
          </div>
          <button onClick={handleSave}>Save</button>
        </div>
    </StyledDiv>
  )
}
