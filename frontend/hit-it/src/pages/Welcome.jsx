import React from 'react'
import NavBar from '../components/NavBar'
import Announcement from '../components/Announcement'
import Slider from '../components/Slider'

const Welcome = () => {
  return (
    <div>
        <Announcement></Announcement>
        <NavBar/>
        <Slider/>
    </div>
  )
}

export default Welcome