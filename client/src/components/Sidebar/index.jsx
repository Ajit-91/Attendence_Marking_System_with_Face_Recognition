import React from 'react'
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { useLocation, useNavigate } from 'react-router';
import { Typography } from '@mui/material';

const Sidebar = ({routes}) => {
    const location = useLocation()
    const navigate = useNavigate()

    const isActive = (route) => {
        if(location.pathname === route){
            return true
        }else{
            return false
        }
    }

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
                    <ListItem 
                        style={{backgroundColor : `${isActive(route.path) ? '#7e57c2' : ''}`}} 
                        button 
                        key={index} 
                        onClick={()=>navigate(route.path)}
                    >
                        <ListItemIcon color='primary' style={{color : `${isActive(route.path) ? 'white' : ''}`}}>
                            {<route.icon/>}
                        </ListItemIcon>
                        <ListItemText primary={route.name} style={{color : `${isActive(route.path) ? 'white' : ''}`}} />
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export default Sidebar