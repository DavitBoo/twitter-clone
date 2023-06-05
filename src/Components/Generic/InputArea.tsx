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


// I could have used a object as const and it'd have worked too
enum Color {
  Black = "black",
  Red = "red",
  Blue = "blue",
  Green = "green",
  Yellow = "yellow",
  Orange = "orange",
  Purple = "purple",
  White = "white",
  Brown = "brown",
  Gray = "gray",
  Teal = "teal",
  Cyan = "cyan",
  Magenta = "magenta",
  Navy = "navy",
  Indigo = "indigo",
  Maroon = "maroon",
  Olive = "olive",
  Lime = "lime",
  Silver = "silver",
  Gold = "gold"
}

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

  .button-disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
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
    margin: 1px;
    width: 15px;
    height: 15px;
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
  const [color, setColor] = useState(Color.Black);

  const [canvasInteracted, setCanvasInteracted] = useState(false);
  const [textInteracted, setTextInteracted] = useState(false);

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
      setCanvasInteracted(true);
    }

    function draw(e: MouseEvent): void {
      if (!isDrawing) return;
      context.beginPath();
      context.moveTo(lastX, lastY);
      context.lineTo(e.offsetX, e.offsetY);
      context.strokeStyle = color; // Establecer el color actual
      context.stroke();
      [lastX, lastY] = [e.offsetX, e.offsetY];
      setCanvasInteracted(true);
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


  const resetCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        setCanvasState(null);
      }
    }
  }

  const displayCanvas = () => {
    setCanvasOrText(true)
  }

  const displayTextArea = () => {
    setCanvasOrText(false)
  }

  const handleSubmitInput = () => {
    setCanvasInteracted(false)
    setTextInteracted(false)
    const inputData = {
      uid: userDataState?.username || "",
      fecha: new Date().toISOString(),
      content: (canvasOrText ? 'img;' + savedDataRef.current : 'text;' + valueTextArea) || "",
      likes: [],
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
          {canvasOrText && (
            <div className="color-picker">
              {/* using typscript enum I created one and I just mapped in order */}
              {Object.values(Color).map((colorOption) => (
                <div
                  key={colorOption}
                  className={`color-option ${color === colorOption ? "active" : ""}`}
                  style={{ backgroundColor: colorOption }}
                  onClick={() => setColor(colorOption)}
                ></div>
              ))}
            </div>
          )}
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
            onChange={(e) => {
              setValueTextArea(e.target.value)
              setTextInteracted(true)
            }}
          ></textarea>
        }
        {canvasOrText && 
        <button 
        onClick={() => {
          handleSubmitInput();
          resetCanvas();
        }}
          disabled={!canvasInteracted} 
          className={!canvasInteracted ? 'button-disabled' : ''}
          
        >
          Draw!
        </button>}
        {!canvasOrText && 
         <>
            <div className="textArea-control">
              <p>{280-valueTextArea.length}/280</p>
              <button 
                onClick={handleSubmitInput} 
                disabled={!textInteracted}
                className={!textInteracted ? 'button-disabled' : ''}
              >
                Write!
              </button>
            </div>
        </>}
       
      </div>   
      
    </StyledDiv>
  );
}