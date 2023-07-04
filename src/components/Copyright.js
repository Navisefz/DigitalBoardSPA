import React from 'react';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';

// <Copyright sx={{ mt: 8, mb: 4 }} />

const Copyright = (props) =>{
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            <strong>Copyright &copy; {' '} {new Date().getFullYear()} {' '}
                {/* <NavLink color="secondary" to="/tvdash?floor=10"> */}
                    Mercedes-Benz Group Services Philippines
                {/* </NavLink> */}
                    {'.'}
                    {' '}
                    All Rights Reserved.
            </strong>
        </Typography>
    );
}

export default Copyright;