// react relate imports
import React, { useRef, useEffect, useState, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { styled } from "styled-components";

// icon library
import Icon from '@mdi/react';
import { mdiDraw, mdiFormatText  } from '@mdi/js';


// firebase imports
import { db } from "../../firebase/config";
import { addDoc, collection } from "firebase/firestore";


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


  .flex-col-dir{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  textArea{
    width: 400px;
    height: 150px;
    border-radius: 5px;
    border: none;
    margin: 10px 0;
    padding: 8px 1ch;
    font-size: 20px;
    color : var(--color-text-secondary);
    resize: none;
    overflow-y: auto;

    &:focus-visible{
        outline: none;
      }
  }

  .textArea-control{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;       
  }


  .color-picker {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
  }

  .color-option {
    width: 17px;
    height: 17px;
    border-radius: 50%;
    margin-right: 5px;
    cursor: pointer;
    border: 2px solid #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
  
      &:hover {
        transform: scale(2);
      }
    
      &:focus {
        outline: none;
        transform: scale(2);
      }
    
      &.active {
        border-width: 4px;

        &:hover {
          transform: scale(2);
        }
        
        &:focus {
          outline: none;
          transform: scale(2);
        }
      }
  }

  `;

export default function InputArea() {

  // useRef
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const savedDataRef = useRef<string | null>(null);

  // useState
  const [canvasOrText, setCanvasOrText] = useState(true)
  const [canvasState, setCanvasState] = useState<string | null>(null);
  const [valueTextArea, setValueTextArea] = useState("")
  const [color, setColor] = useState("black");

  // useContext
  const { userDataState } = useContext(UserContext);

  // useEffect
  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext("2d")!;

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    function startDrawing(e: MouseEvent): void {
      isDrawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function draw(e: MouseEvent): void {
      if (!isDrawing) return;
      context.beginPath();
      context.moveTo(lastX, lastY);
      context.lineTo(e.offsetX, e.offsetY);
      context.strokeStyle = color; // Establecer el color actual
      context.stroke();
      [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function stopDrawing(): void{
      isDrawing = false;
      if (canvas) {
        savedDataRef.current = canvas.toDataURL(); // Guardar los datos dibujados del canvas en la variable
        setCanvasState(canvas.toDataURL()); // Actualizar el estado del canvas
      }
    }

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    if (canvasState) {
      const image = new Image();
      image.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0);
      };
      image.src = canvasState;
    }

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseout", stopDrawing);
    };
  }, [canvasOrText, canvasState, color]);



  const displayCanvas = () => {
    setCanvasOrText(true)
  }

  const displayTextArea = () => {
    setCanvasOrText(false)
  }

  const handleSubmitInput = () => {
    const inputData = {
      uid: userDataState?.uid || "",
      fecha: new Date().toISOString(),
      content: (canvasOrText ? 'img;' + savedDataRef.current : 'text;' + valueTextArea) || "",
      likes: 46,
    };

      addDoc(collection(db, "inputs"), inputData)
      .then((docRef) => {
        console.log("Documento guardado con ID: ", docRef.id);
        setValueTextArea('');

      })
      .catch((error) => {
        console.error("Error al guardar el documento: ", error);
      });
    
  }
  
  return (
    <StyledDiv>
      <div className="input-container flex">
        <div className="flex-col-dir">
          {userDataState === null ? '...' : <img src={userDataState?.profilImg} alt="" />}
          {canvasOrText && <div className="color-picker">
            <div
              className="color-option"
              style={{ backgroundColor: "black" }}
              onClick={() => setColor("black")}
            ></div>
            <div
              className="color-option"
              style={{ backgroundColor: "red" }}
              onClick={() => setColor("red")}
            ></div>
            <div
              className="color-option"
              style={{ backgroundColor: "blue" }}
              onClick={() => setColor("blue")}
            ></div>
            <div
              className="color-option"
              style={{ backgroundColor: "green" }}
              onClick={() => setColor("green")}
            ></div>
            <div
              className="color-option"
              style={{ backgroundColor: "yellow" }}
              onClick={() => setColor("yellow")}
            ></div>
            <div
              className="color-option"
              style={{ backgroundColor: "orange" }}
              onClick={() => setColor("orange")}
            ></div>
            <div
              className="color-option"
              style={{ backgroundColor: "purple" }}
              onClick={() => setColor("purple")}
            ></div>
            <div
              className="color-option"
              style={{ backgroundColor: "white" }}
              onClick={() => setColor("white")}
            ></div>
            <div
              className="color-option"
              style={{ backgroundColor: "brown" }}
              onClick={() => setColor("brown")}
            ></div>
            <div
              className="color-option"
              style={{ backgroundColor: "gray" }}
              onClick={() => setColor("gray")}
            ></div>
            <div
              className="color-option"
              style={{ backgroundColor: "teal" }}
              onClick={() => setColor("teal")}
            ></div>
            <div
              className="color-option"
              style={{ backgroundColor: "cyan" }}
              onClick={() => setColor("cyan")}
            ></div>
            <div
              className="color-option"
              style={{ backgroundColor: "magenta" }}
              onClick={() => setColor("magenta")}
            ></div>
            <div
              className="color-option"
              style={{ backgroundColor: "navy" }}
              onClick={() => setColor("navy")}
            ></div>
            <div
              className="color-option"
              style={{ backgroundColor: "indigo" }}
              onClick={() => setColor("indigo")}
            ></div>
            <div
              className="color-option"
              style={{ backgroundColor: "maroon" }}
              onClick={() => setColor("maroon")}
            ></div>
            <div
              className="color-option"
              style={{ backgroundColor: "olive" }}
              onClick={() => setColor("olive")}
            ></div>
            <div
              className="color-option"
              style={{ backgroundColor: "lime" }}
              onClick={() => setColor("lime")}
            ></div>
            <div
              className="color-option"
              style={{ backgroundColor: "silver" }}
              onClick={() => setColor("silver")}
            ></div>
            <div
              className="color-option"
              style={{ backgroundColor: "gold" }}
              onClick={() => setColor("gold")}
            ></div>
    
          </div>}
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
        {!canvasOrText && 
          <textarea 
            maxLength={280} 
            name="" 
            id="" 
            placeholder="What is happening?"
            value={valueTextArea}
            onChange={(e) => setValueTextArea(e.target.value)}
          ></textarea>
        }
        {canvasOrText && <button onClick={handleSubmitInput}>
          Draw!
        </button>}
        {!canvasOrText && 
         <>
            <div className="textArea-control">
              <p>{280-valueTextArea.length}/280</p>
              <button onClick={handleSubmitInput}>
                Write!
              </button>
            </div>
        </>}
       
      </div>   
      
    </StyledDiv>
  );
}