import React from 'react'
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router';
import { Typography } from '@mui/material';

const Sidebar = ({routes}) => {
    const navigate = useNavigate()
    return (
        <div>
            <Toolbar>
            <div>
               <Typography color='primary' fontWeight='medium' variant='h6'>Attendence Helper</Typography>
            </div>
            </Toolbar>
            <Divider />
            <List>
                {routes.map((route, index) => (
                    <ListItem button key={index} onClick={()=>navigate(route.path)}>
                        <ListItemIcon color='primary'>
                            {<route.icon/>}
                        </ListItemIcon>
                        <ListItemText primary={route.name} color='primary' />
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export default Sidebar