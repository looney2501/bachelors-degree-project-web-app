import { Bars, Preloader } from 'react-preloader-icon'
import React from 'react'

const LoadingScreen = () => (
  <div className="loading-page">
    <div className="center">
      <Preloader use={Bars} size={60} strokeWidth={10} strokeColor="#ffffff" duration={600}/>
    </div>
  </div>
)

export default LoadingScreen
