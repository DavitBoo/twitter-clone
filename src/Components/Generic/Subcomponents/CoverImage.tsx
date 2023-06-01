import React, { useContext, useState } from 'react'
import ProfileImage from './ProfileImage'
import { styled } from 'styled-components'
import testImage2 from '../../../assets/test-2.jpg'

import Icon from '@mdi/react';
import { mdiCameraOutline } from '@mdi/js';
import { updateUserCoverImg, uploadCoverImage } from '../../../firebase/config';
import { UserContext } from '../../../Context/UserContext';

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

export default function CoverImage({profilImg, coverImg, userProfileName}: any) {
  
  // useContext
  const { userDataState, setUserDataState } = useContext(UserContext);
  
  const handleCoverImgChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const coverImgFile = event.target.files[0];
      try {
        if (userDataState?.username) {
          const coverImg = await uploadCoverImage(userDataState.username, coverImgFile);
          await updateUserCoverImg(userDataState.username, coverImg);
          setUserDataState((prevState) => ({
            ...prevState!,
            coverImg: coverImg,
          }));
        }
      } catch (error) {
        // Manejo de errores en caso de que ocurra algún problema en la carga de la imagen
      }
    }
  };

  const handleClick = () => {
    const fileInput = document.getElementById('coverImgInput');
    if (fileInput) {
      fileInput.click();
    }
    console.log(fileInput)
  };

  return (
    <StyleDiv className='cover-img' style={coverImg ? { backgroundImage: `url(${coverImg})` }: {}}>
        <ProfileImage profilImg={profilImg} userProfileName={userProfileName}/>
        { !userProfileName  && <>
          <input type="file" accept="image/*" onChange={handleCoverImgChange} style={{ display: 'none' }} id="coverImgInput" />
          <div className='camera-i' onClick={handleClick}>
          <Icon path={mdiCameraOutline} size={1} />
        </div>
        </> } 
    </StyleDiv>
  )
}
