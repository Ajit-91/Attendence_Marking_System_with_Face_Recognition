import { Step, StepLabel, Stepper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router'
import { CLEAR_FORM_DETAILS } from '../../../redux/slices/formSlice';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import RegisterTeacher from './components/RegisterTeacher';

const Register = () => {

    const [activeStep, setActiveStep] = useState(0)
    const [stepCount, setStepCount] = useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { state } = useLocation()
    console.log({ state })
    //  Clearing the details set in redux when this component unmounts
    useEffect(() => {
        return () => {
            dispatch(CLEAR_FORM_DETAILS())
        }
    }, [])

    //  This function renders the different components based on active step in the multistep form
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
        <Box width='100%' p={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <div>
                {!state && <Box py={4} >
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
                }
                <Box mt={4}>
                    {state && state?.isTeacher ? <RegisterTeacher /> : getComponent()}
                </Box>
                <Typography
                    sx={{ mt: 3 }}
                    align='center'
                    variant='subtitle2'
                >Already have Account ?
                </Typography>
                <Typography
                    color='primary'
                    align='center'
                    sx={{ cursor: 'pointer' }}
                    variant='subtitle2'
                    onClick={() => navigate('/login')}
                >Login
                </Typography>
            </div>
        </Box>
    )
}

export default Register