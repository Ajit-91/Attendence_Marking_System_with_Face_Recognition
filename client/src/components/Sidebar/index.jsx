import React from 'react'
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router';

const Sidebar = ({routes}) => {
    const navigate = useNavigate()
    return (
        <div>
            <Toolbar>
            <div>
                <img 
                    src="https://cdn.hevodata.com/customer/logo/8c76f62bd88177a78bb6e2810a244446.png" 
                    width={"100px"} 
                    alt="brand-img"
                    />
            </div>
            </Toolbar>
            <Divider />
            <List>
                {routes.map((route, index) => (
                    <ListItem button key={index} onClick={()=>navigate(route.path)}>
                        <ListItemIcon>
                            {<route.icon/>}
                        </ListItemIcon>
                        <ListItemText primary={route.name} />
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export default Sidebar