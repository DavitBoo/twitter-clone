import React, {useContext} from 'react'

// context
import {InputsContext } from "../../Context/InputsContext";
import { UserContext } from '../../Context/UserContext';

// components
import InputArea from './InputArea'
import ContentForUser from './ContentForUser'

export default function ContentMain() {
  // useContext
  const { inputsState } = useContext(InputsContext);
  const { userDataState } = useContext(UserContext);
  

  return (
    <div>
        <InputArea/>
        {inputsState &&
        inputsState.map((input, index) => {
          if (userDataState?.following.includes(input.uid)) {
            return (
              <ContentForUser
                key={index}
                likes={input.likes}
                content={input.content}
                uid={input.uid}
                fecha={input.fecha}
              />
            );
          }
          return null;
        })}
    </div>
  );
}