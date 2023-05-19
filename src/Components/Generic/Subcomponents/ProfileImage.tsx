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

export default function ProfileImage() {
  const { userDataState } = useContext(UserContext);

  return (
    <StyledDiv className='profile-img-container'>
        <img className="profile-img" src={userDataState?.profilImg} alt="" />
        <div className='camera-i-profile'>
          <Icon path={mdiCameraOutline} size={1} />
        </div>
    </StyledDiv>
  )
}
