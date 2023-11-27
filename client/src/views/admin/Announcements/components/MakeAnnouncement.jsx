import { Paper, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import { makeAnnouncement } from '../../../../apis/adminApis'
import Loading from '../../../../components/Loading'
import { batchInfo, branchInfo } from "../../../../constants/institutionInfo";

const MakeAnnouncement = ({ setReload }) => {
    const [description, setDescription] = useState('')
    const [branch, setBranch] = useState('')
    const [batch, setBatch] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            setLoading(true)
            const res = await makeAnnouncement({ 
                branch,
                batch,
                description 
            })
            if (res?.error === false) {
                setDescription('')
                setReload(prev => !prev)
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            alert('something went wrong')
            console.log('announcement error', error)
        }

    }
    return (
        < >
            {loading && <Loading />}
            <Paper component={Box} elevation={4} p={4}>
                <form onSubmit={handleSubmit} >
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
                        multiline
                        fullWidth
                        label='Announce'
                        placeholder='Make Announcement'
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        sx={{ mt: 4 }}
                        disabled={!description ? true : false}
                    >Announce
                    </Button>
                </form>
            </Paper>
        </>
    )
}

export default MakeAnnouncement