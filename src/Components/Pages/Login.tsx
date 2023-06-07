import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import googleLogo from '../../assets/google-logo.svg'
import { styled } from 'styled-components'

import { createUserInFirestore, signInWithGoogle } from '../../firebase/config'



const StyledDiv = styled.div `
  position: relative;

  img{
    max-width: 40px;
  }

  .overlay-login{
    position: fixed;
    background: linear-gradient(135deg, var(--color-primary-darker), var(--color-primary));
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .container{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    width: min(65ch, 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    padding: 2.5rem;
    border-radius: 15px;

    @media (max-width: 767px) {
      height: 100vh;
    }
  }

  h2 {
    background: linear-gradient(to right, var(--color-primary), var(--color-primary-darker));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  button {
    width: 250px;
    font-weight: 700;
    padding: .5rem 1rem;
    display: flex;
    justify-content: center;
    gap: .5rem;
    align-items: center;

    &:hover{
      background-color:var(--color-primary-70);
    }

    img{
      max-height: 20px;
      background-color: #fff;
      border-radius: 100%;
    }
  }

  a{
    color: var(--color-primary);

    &:hover{
      text-decoration: underline;
    }
  }

`

interface LoginProps{
  setLogged: React.Dispatch<React.SetStateAction<boolean>>;

  //el tipo sería  React.Dispatch<React.SetStateAction<UserData>> pero tengo que ver como importo el interface
  setuserDataState: React.Dispatch<React.SetStateAction<any>>;
}



export default function Login({setLogged, setuserDataState}: LoginProps)   {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true); // Establecer loading en true

      const user = await signInWithGoogle();
      await createUserInFirestore(user);

      setLogged(true);

      // El usuario ha iniciado sesión correctamente
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Establecer loading en false
    }
  }

  return (
    <StyledDiv>
        <div className="overlay-login"></div> 
        <div className="container">
          <img src={logo} alt="" />
          <h2>Sign in to WriteLine</h2>
          <button onClick={handleLogin}>
            {loading ? 'Loading...' : <><img src={googleLogo} alt="" /> Sign in with Google</>}
          </button>
          <p>Don't you have an account? <a href="">Enter as guest user!</a></p>
        </div>
    </StyledDiv>
  )
}
