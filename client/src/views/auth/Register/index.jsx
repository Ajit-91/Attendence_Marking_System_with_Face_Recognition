import { Step, StepLabel, Stepper } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import Step1 from './components/Step1';
import Step2 from './components/Step2';

const Register = () => {

    const [activeStep, setActiveStep] = useState(0)
    const [stepCount, setStepCount] = useState(0)

    const getComponent = () => {
        switch (stepCount) {
          case 0:
            return <Step1 setStepCount={setStepCount} setActiveStep={setActiveStep} />
    
          case 1:
            return <Step2 setStepCount={setStepCount} setActiveStep={setActiveStep} />
    
          default:
            break;
        }
      }

    const steps = [
        "Student Details",
        "Capture Images"
    ]

    return (
        <Box width='100%' p={4}>
            <Box py={4} >
                <Stepper activeStep={activeStep} alternativeLabel  >
                    {
                        steps.map((item, i) => (
                            <Step key={i}>
                                <StepLabel >{item}</StepLabel>
                            </Step>
                        ))
                    }
                </Stepper>
            </Box>
            <Box mt={4}>
            {getComponent()}
            </Box>
        </Box>
    )
}

export default Register