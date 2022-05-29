import React, { useState } from 'react'
import Dashboard from '../../../components/Dashboard'
import Step1 from './components/Step1'
import Step2 from './components/Step2'

const Attendence = () => {
  const [stepCount, setStepCount] = useState(1)
  const [code, setCode] = useState('')

  //  Conditionally rendering the component based on active step
  const getComponent = () => {
    switch (stepCount) {
      case 1:
        return <Step1 setStepCount={setStepCount} setCode={setCode} />

      case 2:
        return <Step2 setStepCount={setStepCount} code={code} />

      default:
        break;
    }
  }

  return (
    <>
      <Dashboard page='Mark Attendence'>
        {getComponent()}
      </Dashboard>
    </>
  )
}

export default Attendence
