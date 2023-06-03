import React, {useContext} from 'react'
import testImage from '../../../assets/test.jpg'

import Icon from '@mdi/react';
import { mdiCameraOutline } from '@mdi/js';

import { styled } from 'styled-components';
import { UserContext } from '../../../Context/UserContext';
import { updateUserProfileImg, uploadProfileImage } from '../../../firebase/config';

const StyledDiv = styled.div`
  .camera-i-profile{
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translate(125%, 50%);
  }
`

interface ProfileImageProps {
  profilImg: string,
  userProfileName: string
}

export default function ProfileImage({profilImg, userProfileName}: ProfileImageProps) {
  const { userDataState, setUserDataState } = useContext(UserContext);

  const handleProfileImgChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const profileImgFile = event.target.files[0];
      try {
        if (userDataState?.username) {
          // I put the type any beacuse it was througing an error the whole time just here ****
          const profileImg: any = await uploadProfileImage(userDataState.username, profileImgFile);
          await updateUserProfileImg(userDataState.username, profileImg);
          setUserDataState((prevState) => ({
            ...prevState!,
            profilImg: profileImg,  // **** here it was the error the whole time. I have to solve the any type.
            // that error was relate with the profile image that it wasn't getting updated after the upload, but yes with the updating of the page (not the rendering)
          }));
        }
      } catch (error) {
        // Manejo de errores en caso de que ocurra algún problema en la carga de la imagen
      }
    }
  };

  const handleClick = () => {
    const fileInput = document.getElementById('profileImgInput');
    if (fileInput) {
      fileInput.click();
    }
    console.log(fileInput)
  };
  
  return (
    <StyledDiv className='profile-img-container'>
        {!profilImg && <img className="profile-img" src={userDataState?.profilImg} alt="" />}
        {profilImg && <img className="profile-img" src={profilImg} alt="" />}
        { !userProfileName && <>  
          <input type="file" accept="image/*" onChange={handleProfileImgChange} style={{ display: 'none' }} id="profileImgInput" /> 
          <div className='camera-i-profile' onClick={handleClick}>
            <Icon path={mdiCameraOutline} size={1} />
          </div>
        </>}
    </StyledDiv>
  )
}
