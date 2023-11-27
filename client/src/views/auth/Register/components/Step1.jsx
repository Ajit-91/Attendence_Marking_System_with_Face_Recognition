import { Button, Paper, TextField, Box, Container, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { checkIfAlreadyRegistered } from '../../../../apis/commonApis'
import { SET_FORM_DETAILS } from '../../../../redux/slices/formSlice'
import { batchInfo, branchInfo } from '../../../../constants/institutionInfo'


const Step1 = ({ setStepCount, setActiveStep }) => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [enrollmentNo, setEnrollmentNo] = useState('')
    const [branch, setBranch] = useState('')
    const [batch, setBatch] = useState('')
    const dispatch = useDispatch()

    const handleNext = async (e) => {
        e.preventDefault()
        if (enrollmentNo.length !== 10) {
            return alert('Enrollment number must be 10 digit long')
        }
        const res = await checkIfAlreadyRegistered({ enrollmentNo })
        if (res?.error === false) {
            dispatch(SET_FORM_DETAILS({
                name,
                enrollmentNo,
                batch,
                branch,
                password
            }))
            setStepCount(prev => prev + 1)
            setActiveStep(prev => prev + 1)
        } else {
            alert(res?.message || 'something went wrong')
        }
    }
    return (
        <>
            <Container maxWidth='sm'>
                <Paper elevation={5} p={4} component={Box}>
                    <form onSubmit={handleNext} >
                        <TextField
                            label='Enrollment No'
                            type='number'
                            placeholder='Enter 10 digit Enrollment number'
                            value={enrollmentNo}
                            onChange={(e) => setEnrollmentNo(e.target.value)}
                            fullWidth
                            required
                            margin='normal'
                        />
                          <FormControl sx={{ width: '100%', mt: 1, mb: 2 }}>
                            <InputLabel id="batch-label">Batch</InputLabel>
                            <Select
                                labelId="batch-label"
                                id="batch-select"
                                value={batch}
                                onChange={(e) => setBatch(e.target.value)}
                                label="Batch"
                                required
                            >
                                {batchInfo?.map((item, i) => (
                                    <MenuItem key={i} value={item?.value}>{item?.label}</MenuItem>
                                ))}                             
                            </Select>
                        </FormControl>
      
                        <FormControl sx={{ width: '100%', mb: 0 }}>
                            <InputLabel id="branch-label">Branch</InputLabel>
                            <Select
                                labelId="branch-label"
                                id="branch-select"
                                value={branch}
                                onChange={(e) => setBranch(e.target.value)}
                                label="Branch"
                                required
                            >
                                {branchInfo?.map((item, i) => (
                                    <MenuItem key={i} value={item?.value}>{item?.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            label='Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            required
                            margin='normal'
                        />
                        <TextField
                            label='Password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            required
                            margin='normal'
                        />
                        <Button
                            sx={{ mt: 3, display: 'block', ml: 'auto' }}
                            variant='contained'
                            type='submit'
                            disabled={
                                !enrollmentNo ||
                                    !name ||
                                    !password
                                    ? true
                                    : false
                            }
                        >Next
                        </Button>
                    </form>
                </Paper>
            </Container>
        </>
    )
}

export default Step1