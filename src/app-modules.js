import React from 'react';
//Modules imports
import Dashboard from './components/Dashboard';
import NotFoundPage from './OtherPages/404';
import Login from './Auth/Login';
import {Navigate} from 'react-router-dom';
import ImageSlides from './ImageSlides';
import Image from './components/Image';
import AllImages from './AllImages';


// Module Routes
export const rootRoutes = [
    //Routes
    {
        path: '*',
        component: <NotFoundPage />  //if page does not exist
    },
    {
        path: '/',
        component: <Dashboard />  //path to display image carousel on dashboard
    },
    {
        path: '/Image',
        component: <Image /> //path to the image component for uploads of images on different floors
    }
];


export const integrationRootRoutes = [
    //Routes
    
   
    {
        path: '/tvdash/*',
        component: <NotFoundPage /> //path to  the component dashboard if page does not exist
    },
    {
        path: '/tvdash',
        component: <Dashboard /> //path to display image carousel on dashboard
    },
    
    {
        path:'/tvdash/Image',
        component: <Image/>, //path to the image component for uploads of images on different floors
    },
    
]

export const anAuthenticatedPaths = [
    //Routes
    {
        path: '*',
        component: <Navigate to="/" replace />
    },
    {
        path : '/',
        component : <Login />
    },
     {
       path: '/ImageSlides',
        component: <ImageSlides/>,
    },
    {
        path: '/AllImages',
         component: <AllImages/>,
     },

]

export const integrationAnAuthenticatedPaths = [
    //Routes
    {
        path: '/tvdash/*',
        component: <Navigate to="/tvdash" replace />
    },
    {
        path : '/tvdash',
        component : <Login />
    },
    {
        path:'/tvdash/ImageSlides',
        component: <ImageSlides/>,
    },
    {
        path:'/tvdash/AllImages',
        component: <AllImages/>,
    },
   
]
