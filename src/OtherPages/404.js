import React from 'react';
import {Link} from "react-router-dom";
import Container from '@mui/material/Container';
import { useSelector } from 'react-redux';
import ConstructionIcon from '@mui/icons-material/Construction';

const NotFoundPage = () => {
    const isDevelopmentMode = useSelector((state) => state.mainSlice.isDevelopmentMode);
    return (
        <React.Fragment>
            <Container sx={{
               backgroundImage: `url(${process.env.PUBLIC_URL}/img/123456.png)`,
               backgroundSize:'contain',
               backgroundRepeat:'no-repeat',
               height:'100vh',
               width:'100wh'
                }}>
               
                        <p  >
                            We could not find the page you were looking for.
                            Meanwhile, you may <Link   to = {isDevelopmentMode === true ? "/tvdash?floor=10" : "/tvdash?floor=10"}  >return to the default page.</Link>
                        </p>
                       
                    
              
            </Container>
        </React.Fragment>
    )
}

export default NotFoundPage;
