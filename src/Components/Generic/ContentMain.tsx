import React, {useContext} from 'react'

// context
import {InputsContext } from "../../Context/InputsContext";
import { UserContext } from '../../Context/UserContext';

// components
import InputArea from './InputArea'
import ContentForUser from './ContentForUser'

export default function ContentMain({activeMenu, logged}: any) {
  // useContext
  const { inputsState } = useContext(InputsContext);
  const { userDataState } = useContext(UserContext);
  

  return (
    <div>
      {logged && <InputArea />}
      {inputsState &&
        inputsState.map((input, index) => {
          if (!logged || !activeMenu || (userDataState && userDataState.following && userDataState.following.includes(input.uid))) {
            return (
              <ContentForUser
                key={index}
                likes={input.likes}
                content={input.content}
                uid={input.uid}
                fecha={input.fecha}
                inputId={input.inputId}
              />
            );
          }
          return null;
        })}
    </div>
  );
}