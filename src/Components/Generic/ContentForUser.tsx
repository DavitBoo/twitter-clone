import React, { useEffect, useState, useContext } from 'react'

// images
import testImage from '../../assets/test.jpg'

// libraries
import { styled } from 'styled-components'
import { NavLink } from 'react-router-dom';
import moment from 'moment';

// icons
import Icon from '@mdi/react';
import { mdiHeart, mdiDotsHorizontal, mdiMessageReplyOutline, mdiRepeatVariant, mdiCardsHeartOutline, mdiPoll, mdiShare } from '@mdi/js';

//firebase - functions
import { db, loadUserData } from '../../firebase/config';

// --- firebase
import { DocumentData, doc, updateDoc } from 'firebase/firestore'; // tipo de datos de la base de datos
import { UserContext } from '../../Context/UserContext';


const StyledDiv = styled.div  `
  display: flex;
  padding: 16px;
  outline: 1px solid var(--color-border);

  &:hover{
    background-color: var(--color-hover);
    cursor: pointer;
  }

  img.message-profile-pic{
    width: 50px;
    height: 50px;
    border-radius: 100%;
  }

  .message-content{
    display: flex;
    flex-direction: column;
    flex: 1 1 100%;
    padding: 0 1rem;
    width: 100%;
    overflow: hidden;
  }

  .message-head{
    display: flex;
    justify-content: space-between;
    align-items: center;

    svg{
      border-radius: 100%;
      padding: 4px;
    }

    svg:hover{
      color: #35abff;
      background-color: #e1f3ff;
    }
  }

  .message-info{
    display: flex;
    gap: 1ch;

    .nick-name{
      font-weight: 700;

      &:hover{
        text-decoration: underline;
      }
    }

    .user-name{
      color: var(--color-text-secondary); 
    }

    .publish-date{
      color: var(--color-text-secondary);
    }
  }

  .message{
    color: var(--color-text-secondary); 
    margin: 0;
    line-height: 1.2rem;
  }

  .interactions{
    color: var(--color-text-secondary); 
    display: flex;
    justify-content: space-between;
    

    div{      
      display: flex;
      align-items: center;
    }

    div >*{
      padding: 4px;
      transition: all .2s;

      &:hover{
        border-radius: 100%;
        
      }
    }

    .liked{
      border-radius: 100%;
      
      /* &:hover{
        color: #838383 !important;
      } */
    }

    .reply:hover, .views:hover, .share:hover{
      color: #35abff;
      background-color: #e1f3ff;

      + p{
        color: #35abff;
      }
    }
    .repost:hover{
      color: #0fb14b;
      background-color: #baffd4;

      + p{
        color: #0fb14b;
      }
    }
    .like:hover, .liked{
      color: #ff3c87;
      background-color: #ffcade;

      + p{
        color: #ff3c87;
      }
    }

    .liked:hover{
      color: #757575;
      background-color: #cfcfcf;

      + p{
        color: #757575;
      }
    }
  
  }

`

interface ContentForUserProps{
  likes: string[]
  content: string
  uid: string  // this should be useraccount or username
  fecha: string
  inputId: string
}

export default function ContentForUser({likes, content, uid, fecha, inputId}: ContentForUserProps) {
  
  
  // useState
  const [userData, setUserData] = useState<DocumentData | undefined>(undefined);
  const [likesState, setLikesState] = useState(likes)
  
  // useEffect
  useEffect(() => {
    async function fetchUserData() {
      try {
        const user = await loadUserData(uid);
        setUserData(user);
      } catch (error) {
        // Manejar el error aquí
      }
    }

    fetchUserData();
  }, [uid]);

  if (!userData) {
    // Renderizar un estado de carga o un componente de carga mientras se obtienen los datos
    return <div>Cargando...</div>;
  }

  const isContent = (content: string) => {
    if (content.startsWith("img;")){
      const newContent = content.replace("img;", "");
      return  <img src={newContent} alt="" />
    } else if (content.startsWith("text;")){
        const newContent = content.replace("text;", "");
        return (<p className="message">{newContent}</p>)
    } 

    return ''
  }


  const dateFormat = (fechaHora: string): string => {
    const now = moment();
    const date = moment(fechaHora); 
    const difference = now.diff(fecha, 'hours');  // método diff() de moment.js 

      if (difference < 1) {
        return 'Recently posted';
      } else if (difference < 24) {
        return `${difference}h ago`;
      } else if (difference < 48) {
        return 'Yesterday';
      } else if (now.year() === date.year()) {
        return date.format('MMM D'); // Mes y día (ejemplo: "May 23")
      } else {
        return date.format('YYYY MMM'); // Año y mes (ejemplo: "2022 May")
      }
  }
  
  const addLikes = (): void => {
    const docRef = doc(db, "inputs", inputId);
    const isLiked = Array.isArray(likesState) && likesState.includes(userData.username);
  
    let updatedLikes: string[];
    if (isLiked) {
      updatedLikes = likesState.filter((username) => username !== userData.username);
    } else {
      updatedLikes = [...likesState, userData.username];
    }
  
    updateDoc(docRef, { likes: updatedLikes })
      .then(() => {
        console.log("Likes actualizados correctamente");
        setLikesState(updatedLikes);
      })
      .catch((error) => {
        console.error("Error al actualizar los likes:", error);
      });
    
  };

  const liked = () => {
    return Array.isArray(likesState) && likesState.includes(userData.username);
  }

  const { name, profilImg, username } = userData;

  return (
    <StyledDiv>
        <img className="message-profile-pic" src={profilImg} alt="" />
        <div className='message-content'>
          <div className="message-head">
            <div className="message-info">
              <p className="nick-name"><NavLink to={`/${uid}`}>{name}</NavLink></p>
              <p className='user-name'> @{username}</p>
              <p className='publish-date'> · {dateFormat(fecha)}</p>
            </div>
            <Icon path={mdiDotsHorizontal} size={1} />
          </div>
          {isContent(content)}
          <div className="interactions">
            <div>
              <Icon className='reply' path={mdiMessageReplyOutline} size={1} /> <p>0</p>
            </div>
            <div>
              <Icon className='repost' path={mdiRepeatVariant} size={1} /> <p>0</p>
            </div>
            <div onClick={addLikes}>
              {!liked() ? <><Icon className={`like ${liked() ? 'liked' : ''}`} path={mdiCardsHeartOutline} size={1} /> <p>{likesState.length}</p></>
             : <><Icon className='like liked' path={mdiHeart} size={1} /> <p>{likesState.length}</p></>}
            </div>
            <div>
              <Icon className='views' path={mdiPoll} size={1} /> <p>0</p>
            </div>
            <div>
              <Icon className='share' path={mdiShare} size={1} />
            </div>
          </div>
        </div>
    </StyledDiv>
  )
}
