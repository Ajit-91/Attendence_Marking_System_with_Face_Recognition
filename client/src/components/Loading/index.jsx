import { Backdrop, CircularProgress, Typography } from '@mui/material'
import React from 'react'

const Loading = ({ msg, backdrop = true }) => {

    return (
        <>
            {
                backdrop ?
                    <>
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open
                        >
                            <CircularProgress color="secondary" size={60} />
                            {msg && <Typography variant='h5' color='primary'>{msg}</Typography>}
                        </Backdrop>
                    </>
                    : (
                        <div style={{ height: "100vh", width : '100%', display : 'grid', placeItems : 'center' }}>
                            <div>
                                <div style={{display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '10px'}} >
                                    <CircularProgress color="primary" size={60}  />
                                </div>
                                {msg && <Typography variant='h5' color='primary'>{msg}</Typography>}
                            </div>
                        </div>
                    )
            }

        </>
    )
}

export default Loading