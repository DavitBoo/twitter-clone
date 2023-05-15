import React, { useRef, useEffect, useState } from "react";
import { styled } from "styled-components";
import Icon from '@mdi/react';
import { mdiDraw, mdiFormatText  } from '@mdi/js';
import testImage from '../../assets/test.jpg'

const StyledDiv = styled.div `
display: flex;
flex-direction: column;

  img{
    width: 75px;
    height: 75px;
    border-radius: 100%;
    /* padding: 1rem; */
  }
  .input-container{
    border-top: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
    background-color: #f9f9fc;
    justify-content: space-around;
    padding: .5rem 0;
  }

  canvas{
      margin: 10px 0;
      border-radius: 5px;
      background-color: #fff;
    }
  

  button{
    padding: .6rem 1.2rem;
    font-weight: 700;
    align-self: flex-end;

    &:hover{
      background-color: var(--color-primary-darker);
      transition: all .2s;
    }
  }

  .buttons{
    display: flex;
    justify-content: space-between;
    cursor: pointer;

  }

  .flex{
    display: flex;
  }

  .flex-col-dir{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  textArea{
    width: 400px;
    height: 100px;
    border-radius: 5px;
    border: none;
    margin: 10px 0;
    padding: 8px 1ch;
    font-size: 20px;
    color : var(--color-text-secondary);

  }
`;


export default function InputArea() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const savedDataRef = useRef<string | null>(null);

  const [canvasOrText, setCanvasOrText] = useState(true)
  const [canvasState, setCanvasState] = useState()
  const [valueTextArea, setValueTextArea] = useState()

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext("2d")!;

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    function startDrawing(e: MouseEvent) {
      isDrawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function draw(e: MouseEvent) {
      if (!isDrawing) return;
      context.beginPath();
      context.moveTo(lastX, lastY);
      context.lineTo(e.offsetX, e.offsetY);
      context.stroke();
      [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function stopDrawing() {
      isDrawing = false;
      if(canvas)
      savedDataRef.current = canvas.toDataURL(); // Guardar los datos dibujados del canvas en la variable
    }

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseout", stopDrawing);
    };
  }, [canvasOrText]);


  const displayCanvas = () => {
    setCanvasOrText(true)
  }

  const displayTextArea = () => {
    setCanvasOrText(false)
  }

  return (
    <StyledDiv>
      <div className="input-container flex">
        <div className="flex-col-dir">
          <img src={testImage} alt="" />
          <div className="buttons">
              <div onClick={displayCanvas}>
                <Icon path={mdiDraw} size={1}  />
              </div>
              <div onClick={displayTextArea}>
                <Icon path={mdiFormatText} size={1} />
              </div>
          </div>
        </div>
        {canvasOrText && <canvas ref={canvasRef} width={400} height={200} />}
        {!canvasOrText && <textarea maxLength={250} name="" id="" placeholder="What is happening?"></textarea>}
        {canvasOrText && <button onClick={() => console.log(savedDataRef.current)}>
          Draw!
        </button>}
        {! canvasOrText && <button onClick={() => console.log(savedDataRef.current)}>
          Write!
        </button>}

        

      </div>
      
      
    </StyledDiv>
  );
}