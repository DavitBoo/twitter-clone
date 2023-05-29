import React, { useState } from 'react'
import ProfileImage from './ProfileImage'
import { styled } from 'styled-components'
import testImage2 from '../../../assets/test-2.jpg'

import Icon from '@mdi/react';
import { mdiCameraOutline } from '@mdi/js';

const StyleDiv = styled.div`

    width: 100%;
    background-image: url(${testImage2});
    background-position: center center;
    background-size: cover;
    height: 200px;
    position: relative;

  img.profile-img{
    width: 130px;
    height: 130px;
    border-radius: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translate(25%, 50%);
    border: 3px solid #fff;
    transition: all .2s;
    

    &:hover{
      filter: grayscale(70%);
      cursor: pointer;
    }

    
  }

  svg{
        filter: invert(1);
        border-radius: 100%;
        background-color: #ffffff2c;
        padding: 1rem;

        transition: all .2s;
        cursor: pointer;

        &:hover{
          background-color: #ffffff9d;
        }
  }

  .camera-i svg{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);        
    }

`

export default function CoverImage({profilImg, coverImg}: any) {

  return (
    <StyleDiv className='cover-img' style={coverImg ? { backgroundImage: `url(${coverImg})` }: {}}>
        <ProfileImage profilImg={profilImg}/>
        <div className='camera-i'>
          <Icon path={mdiCameraOutline} size={1} />
        </div>
    </StyleDiv>
  )
}
