import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAttndenceHistory } from '../../../apis/adminApis'
import AttendenceTable from '../../../components/AttendenceTable'
import Dashboard from '../../../components/Dashboard'
import Loading from '../../../components/Loading'

const AttHistory = () => {
    const [attHistory, setAttHistory] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchHistory = async () => {
            const res = await getAttndenceHistory()
            if (res?.error === false) {
                setAttHistory(res?.data)
            }
            setLoading(false)
        }
        fetchHistory()
    }, [])
    return (
        <Dashboard page='All Attendences'>
            {loading ? <Loading /> : (
                <>
                    <Box py={4}>
                        <AttendenceTable rows={attHistory} />
                    </Box>
                </>
            )}
        </Dashboard>
    )
}

export default AttHistory