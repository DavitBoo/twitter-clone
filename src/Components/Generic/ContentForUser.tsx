import React from 'react'
import testImage from '../../assets/test.jpg'
import { styled } from 'styled-components'
import Icon from '@mdi/react';
import { mdiDotsHorizontal, mdiMessageReplyOutline, mdiRepeatVariant, mdiCardsHeartOutline, mdiPoll, mdiShare } from '@mdi/js';


const StyledDiv = styled.div  `
  display: flex;
  padding: 1rem;
  outline: 1px solid #e8e9ed;

  &:hover{
    background-color:#f9f9fc;
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
    }
    .repost:hover{
      color: #0fb14b;
      background-color: #baffd4;
    }
    .like:hover{
      color: #ff3c87;
      background-color: #ffcade;
    }
  
  }

`

export default function ContentForUser() {
  return (
    <StyledDiv>
        <img src={testImage} alt="" />
        <div className='message-contet'>
          <div className="message-head">
            <div className="message-info">
              <p className="nick-name">Davit Boo</p>
              <p className='user-name'>@davitBoo</p>
              <p className='publish-date'>May 11</p>
            </div>
            <Icon path={mdiDotsHorizontal} size={1} />
          </div>
          <p className="message">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium at culpa nemo explicabo libero vitae voluptas et perferendis, cumque qui quasi earum! Consectetur consequatur corporis officia blanditiis facilis.</p>
          <div className="interactions">
            <div>
              <Icon className='reply' path={mdiMessageReplyOutline} size={1} /> <p>23</p>
            </div>
            <div>
              <Icon className='repost' path={mdiRepeatVariant} size={1} /> <p>23</p>
            </div>
            <div>
              <Icon className='like' path={mdiCardsHeartOutline} size={1} /> <p>237</p>
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
