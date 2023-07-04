import React from 'react';
import { Routes, Route,BrowserRouter } from "react-router-dom";
import {anAuthenticatedPaths} from '../app-modules';
import {integrationAnAuthenticatedPaths} from '../app-modules';
// import ImageSlides from '../ImageSlides';

const UnAuthenticatedApp = (props) => {


    return(
        <React.Fragment>
            {/* <Routes>
            {anAuthenticatedPaths.map((route, idx) => (
                <Route 
                    key= {idx}
                    path={route.path} 
                    element={route.component}
                >
                </Route>
            ))}
            </Routes> */}
         
            <Routes>
            {integrationAnAuthenticatedPaths.map((route, idx) => (
                <Route 
                    key= {idx}
                    path={route.path} 
                    exact element={route.component}
                >
                </Route>
            ))}
            </Routes>
           
        </React.Fragment>
    );
}


export default UnAuthenticatedApp;