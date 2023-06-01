import React, {useContext} from 'react'
import testImage from '../../../assets/test.jpg'

import Icon from '@mdi/react';
import { mdiCameraOutline } from '@mdi/js';

import { styled } from 'styled-components';
import { UserContext } from '../../../Context/UserContext';

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
  const { userDataState } = useContext(UserContext);

  return (
    <StyledDiv className='profile-img-container'>
        {!profilImg && <img className="profile-img" src={userDataState?.profilImg} alt="" />}
        {profilImg && <img className="profile-img" src={profilImg} alt="" />}
        { !userProfileName && <>   
          <div className='camera-i-profile'>
            <Icon path={mdiCameraOutline} size={1} />
          </div>
        </>}
    </StyledDiv>
  )
}
