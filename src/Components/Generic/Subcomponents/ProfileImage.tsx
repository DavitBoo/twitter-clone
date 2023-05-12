import React from 'react'
import testImage from '../../../assets/test.jpg'

export default function ProfileImage() {
  return (
    <div className='profile-img-container'>
        <img className="profile-img" src={testImage} alt="" />
    </div>
  )
}
