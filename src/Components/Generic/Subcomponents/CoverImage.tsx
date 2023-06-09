import React, { useContext, useState } from 'react'

// useContext
import { UserContext } from '../../../Context/UserContext';

// components
import ProfileImage from './ProfileImage'

// libraries
import { styled } from 'styled-components'

// images
import testImage2 from '../../../assets/test-2.jpg'

// icon libraries
import Icon from '@mdi/react';
import { mdiCameraOutline } from '@mdi/js';

// firebase functions
import { updateUserCoverImg, uploadCoverImage } from '../../../firebase/config';


const StyleDiv = styled.div`

    width: 100%;
    background-image: url(${testImage2});
    background-position: center center;
    background-size: cover;
    height: 200px;
    position: relative;

  img.profile-img{
    width: 8.125rem;
    height: 8.125rem;
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
        padding: 16px;

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

interface CoverImageProps {
  profilImg: string;
  coverImg: string;
  userProfileName?: string;
}

export default function CoverImage({profilImg, coverImg, userProfileName}: CoverImageProps) {
  
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
        <ProfileImage profilImg={profilImg} userProfileName={userProfileName || ''}/>
        { !userProfileName  && <>
          <input type="file" accept="image/*" onChange={handleCoverImgChange} style={{ display: 'none' }} id="coverImgInput" />
          <div className='camera-i' onClick={handleClick}>
            <Icon path={mdiCameraOutline} size={1} />
        </div>
        </> } 
    </StyleDiv>
  )
}
