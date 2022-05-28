import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { getMyAttendence } from '../../../apis/studentApis'
import Dashboard from '../../../components/Dashboard'
import Loading from '../../../components/Loading'
import AttendenceTable from '../../../components/AttendenceTable'

const MyAttHistory = () => {
    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchHistory = async () => {
            const res = await getMyAttendence()
            if (res?.error === false) {
                setHistory(res?.data)
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
                        <AttendenceTable rows={history} />
                    </Box>
                </>
            )}
        </Dashboard>
    )
}

export default MyAttHistory