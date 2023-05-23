import React, { useEffect, useState } from 'react'

// images
import testImage from '../../assets/test.jpg'

// libraries
import { styled } from 'styled-components'

// icons
import Icon from '@mdi/react';
import { mdiDotsHorizontal, mdiMessageReplyOutline, mdiRepeatVariant, mdiCardsHeartOutline, mdiPoll, mdiShare } from '@mdi/js';

//firebase - functions
import { loadUserData } from '../../firebase/config';

// --- firebase
import { DocumentData } from 'firebase/firestore'; // tipo de datos de la base de datos


const StyledDiv = styled.div  `
  display: flex;
  padding: 1rem;
  outline: 1px solid var(--color-border);

  &:hover{
    background-color: var(--color-hover);
    cursor: pointer;
  }

  img{
    width: 50px;
    height: 50px;
    border-radius: 100%;
  }

  .message-contet{
    display: flex;
    flex-direction: column;
    flex: 1 1 100%;
    padding: 0 1rem;
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
      font-weight: 900;
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
    .like:hover{
      color: #ff3c87;
      background-color: #ffcade;

      + p{
        color: #ff3c87;
      }
    }
  
  }

`

interface ContentForUserProps{
  likes: number
  content: string
  uid: string
  fecha: string
}

export default function ContentForUser({likes, content, uid, fecha}: ContentForUserProps) {
  
  const [userData, setUserData] = useState<DocumentData | undefined>(undefined);
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

  const { name, profilImg, username } = userData;

  return (
    <StyledDiv>
        <img src={profilImg} alt="" />
        <div className='message-contet'>
          <div className="message-head">
            <div className="message-info">
              <p className="nick-name">{name}</p>
              <p className='user-name'>@{username}</p>
              <p className='publish-date'>{fecha.split('T')[0]}</p>
            </div>
            <Icon path={mdiDotsHorizontal} size={1} />
          </div>
          <p className="message">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium at culpa nemo explicabo libero vitae voluptas et perferendis, cumque qui quasi earum! Consectetur consequatur corporis officia blanditiis facilis.</p>
          <img src={content} alt="" />
          <div className="interactions">
            <div>
              <Icon className='reply' path={mdiMessageReplyOutline} size={1} /> <p>23</p>
            </div>
            <div>
              <Icon className='repost' path={mdiRepeatVariant} size={1} /> <p>45</p>
            </div>
            <div>
              <Icon className='like' path={mdiCardsHeartOutline} size={1} /> <p>{likes}</p>
            </div>
            <div>
              <Icon className='views' path={mdiPoll} size={1} /> <p>29.7k</p>
            </div>
            <div>
              <Icon className='share' path={mdiShare} size={1} />
            </div>
          </div>
        </div>
    </StyledDiv>
  )
}
