import { Button, Box, Paper, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { generateAttCode } from '../../../../apis/adminApis'
import Loading from '../../../../components/Loading'
import { batchInfo, branchInfo } from '../../../../constants/institutionInfo'

const GenerateCode = ({ setReload }) => {
    const [subject, setSubject] = useState('')
    const [validity, setValidity] = useState('')
    const [branch, setBranch] = useState('')
    const [batch, setBatch] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (validity) {
            let minutes = Number(validity)
            if (minutes < 10 || minutes > 120) {
                setError(true)
            } else {
                setError(false)
            }
        }
    }, [validity])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const res = await generateAttCode({ 
            subject, 
            validity,
            branch,
            batch 
        })
        if (res?.error === false) {
            setReload(prev => !prev)
        }
        setLoading(false)
    }

    return (
        <>
            <Paper component={Box} elevation={5} p={4}>
                {loading && <Loading />}
                <form onSubmit={handleSubmit}>
                    <FormControl sx={{ width: '100%', mb: 2 }}>
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

                    <FormControl sx={{ width: '100%', mb: 2 }}>
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
                        label='Subject'
                        placeholder='Enter Subject'
                        fullWidth
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                    <TextField
                        label='Validity'
                        type='number'
                        error={error}
                        margin='normal'
                        helperText='Validity  must lie between 10 to 120 minutes'
                        fullWidth
                        required
                        value={validity}
                        onChange={(e) => setValidity(e.target.value)}
                    />
                    <Button
                        variant='contained'
                        type='submit'
                        disabled={error === false && subject ? false : true}
                    >Submit
                    </Button>
                </form>
            </Paper>
        </>
    )
}

export default GenerateCode