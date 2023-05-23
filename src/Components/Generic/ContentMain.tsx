import React, {useContext} from 'react'
import {InputsContext } from "../../Context/InputsContext";

import InputArea from './InputArea'
import ContentForUser from './ContentForUser'

export default function ContentMain() {
  // useContext
  const { inputsState } = useContext(InputsContext);

  return (
    <div>
        <InputArea/>
        {inputsState && inputsState.map((input, index) => (
          <ContentForUser key={index} likes={input.likes} content={input.content} uid={input.uid} fecha={input.fecha}/>
        ))}

    </div>
  )
}
