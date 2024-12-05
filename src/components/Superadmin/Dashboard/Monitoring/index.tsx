import React from 'react'
import LiveMonitoring from './LiveMonitoring'
import Schedule from './Schedule'
import Feedback from './Feedback'

const Monitoring = () => {
  return (
    <div className='flex flex-col gap-6'>
      <div className="">
        <LiveMonitoring />
      </div>
      <div className="">
        <Schedule />
      </div>
      <div className="">
        <Feedback />
      </div>
    </div>
  )
}

export default Monitoring