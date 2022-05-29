import { Paper, Box, TextField, Button } from '@mui/material'
import React, { useState } from 'react'
import { makeAnnouncement } from '../../../../apis/adminApis'
import Loading from '../../../../components/Loading'

const MakeAnnouncement = ({setReload}) => {
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            setLoading(true)
            const res = await makeAnnouncement({description})
            if(res?.error === false){
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
                sx={{mt : 4}} 
                disabled={!description ? true : false}
            >Announce
            </Button>
            </form>
        </Paper>
    </>
  )
}

export default MakeAnnouncement