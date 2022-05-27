import { Button, Card, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { generateAttCode } from '../../../../apis/adminApis'
import Dashboard from '../../../../components/Dashboard'

const GenerateCode = ({setReload}) => {
    const [subject, setSubject] = useState('')
    const [data, setData] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await generateAttCode({subject})
        if(res?.error === false){
            setData(res?.data)
            setReload(prev => !prev)
        }
    }
    return (
        <>
            <Dashboard page='Attendence Code'>
                <Card>
                    <form onSubmit={handleSubmit}>
                    <TextField
                        label='Subject'
                        margin='dense'
                        fullWidth
                        value={subject}
                        onChange={(e)=>setSubject(e.target.value)}
                    />
                    <Button variant='contained' type='submit'>Submit</Button>
                    </form>
                </Card>

                {data && (
                <Card sx={{mt : 3}}>
                    <Typography> {data?.subject} : {data?.code} </Typography>
                </Card>
                )}
            </Dashboard>
        </>
    )
}

export default GenerateCode