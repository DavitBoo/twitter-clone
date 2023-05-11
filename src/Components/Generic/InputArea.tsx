import React, { useRef, useEffect } from "react";
import { styled } from "styled-components";
import Icon from '@mdi/react';
import { mdiDraw, mdiFormatText } from '@mdi/js';
import testImage from '../../assets/test.jpg'

const StyledDiv = styled.div `
display: flex;
flex-direction: column;
  img{
    width: 75px;
    height: 75px;
    border-radius: 100%;
  }
  canvas{
    border: 1px solid #e8e9ed;
  }

  button{
    padding: .6rem 1.2rem;
    font-weight: 700;

    &:hover{
      background-color: var(--color-primary-darker);
      transition: all .2s;
    }
  }

  .buttons{
    display: flex;
    justify-content: space-between;
  }
`;


export default function InputArea() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const savedDataRef = useRef<string | null>(null);

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
  }, []);

  return (
    <StyledDiv>
      <img src={testImage} alt="" />
      <canvas ref={canvasRef} width={400} height={200} />
      
      <div className="buttons">
        <div>
          <Icon path={mdiDraw} size={1} />
          <Icon path={mdiFormatText} size={1} />
        </div>
        <button onClick={() => console.log(savedDataRef.current)}>
          Draw!
        </button>
      </div>
    </StyledDiv>
  );
}