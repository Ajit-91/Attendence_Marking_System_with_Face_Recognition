import { TextField, Button, Container } from '@mui/material'
import React, { useState } from 'react'
import {validateInStep1} from '../../../../apis/studentApis'

const Step1 = ({setStepCount, setCode}) => {

    const [attCode, setAttCode] = useState("")

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const res = await validateInStep1({attCode})
            if(res?.error === false){
                setCode(attCode)
                setStepCount(2)
            }else{
                alert(res?.message || 'something went wrong')
            }
        } catch (error) {
            console.log('validateInStep1 error',error)
        }
    }

  return (
    <>
        <Container maxWidth='sm'>
            <form onSubmit={handleSubmit}>
                <TextField
                    label='Attendence code'
                    fullWidth
                    value={attCode}
                    onChange={(e)=>setAttCode(e.target.value)}
                    placeholder='Enter 8 digit attendence code'
                />
                <Button sx={{my : 5}} variant='contained' type='submit'>Submit</Button>
            </form>
        </Container>
    </>
  )
}

export default Step1