import React from 'react';
import UnAuthenticatedApp from './Auth/UnAuthenticatedApp';
import AuthenticatedApp from './Auth/AuthenticatedApp';
import './index.css';
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from 'react-redux';
import store from './utils/app/store';
import { persistStore } from "redux-persist";
import { createRoot } from 'react-dom/client';
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import {ON_UNLOAD_MESSAGE} from './utils/contants';
import {useEffect } from 'react';
import {updateEnvironmentMode} from "./utils/app/mainSlice";


let persistor = persistStore(store);
const container = document.getElementById('root');
const root = createRoot(container);

const Root = (props) => {
  return (
      <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Apps {...props} />
        
          </PersistGate>
      </Provider>
  )
}


const Apps = (props) => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.mainSlice.isLogin);
  // const tokenState = useSelector((state) => state.mainSlice.token);

  // React.useEffect(() => {
      
  //   getTokenFromURL();

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[]);

  // const getTokenFromURL = async() => {
  //   const queryParams = new URLSearchParams(window.location.search);
  //   const token = queryParams.get('token');

  //   if(tokenState !== null){
  //     let decodedToken= jwt_decode(tokenState);
  //     if (decodedToken.exp * 1000 < Date.now()) {
  //        dispatch(logout());
  //        return dispatch(updateIsError("Session Expired. Please re-login your credentials."));
  //     }
  //   }

  //   if(token !== null){
  //     try{
  //       let decodedToken= jwt_decode(token);
  //       if (decodedToken.exp * 1000 < Date.now()) {
  //         dispatch(logout());
  //         return dispatch(updateIsError("Session Expired. Please re-login your credentials."));
  //       }
  
  //       let param = { 
  //         data :{
  //           Username : decodedToken.sub,
  //         },
  //         token : token
  //       }
        
  //       let res = await dispatch(checkTokenValidity(param));
  //       let filteredUserData = {}
  //       if(res === undefined && res.payload === undefined){
  //         dispatch(logout());
  //         return dispatch(updateIsError("Token is invalid"));
  //       }
  //       else{
  //         res.payload.filter(filtered=> filtered.Roles === "SeatR-01" ||filtered.Roles === "SeatR-02" || filtered.Roles === "SeatR-03").map(result=>{
            
  //           return filteredUserData = {
  //             Username : result.Username,
  //             Role : result.Roles
  //           }
  //         })

  //         let param2 = { 
  //           data :{
  //             Username : filteredUserData.Username ? filteredUserData.Username : decodedToken.sub,
  //             Role : filteredUserData.Role ? filteredUserData.Role : "SeatR-03"
  //           },
  //           token : token
  //         }
  //         await dispatch(generateTokenThruURL(param2));
  //         await dispatch(getUser(param));
  //         await dispatch(getAnnouncements(param))
  //       }
  //     }
  //     catch(Exception){
  //       dispatch(updateIsError(Exception.message));
  //       dispatch(logout());
  //     }
  //   }
  // }
  
  useOnUnload();
  return (
      <React.Fragment>
        <BrowserRouter>
          {isLogin ? <AuthenticatedApp/> : <UnAuthenticatedApp />}
        
        </BrowserRouter>
      
      </React.Fragment>
  );
}

const useOnUnload = () => {
  const dispatch = useDispatch();
  const onUnload = (e) => {
      e.preventDefault();
      e.returnValue = ON_UNLOAD_MESSAGE;
      return ON_UNLOAD_MESSAGE;
  }
  
  useEffect(() => {
      if (process.env.NODE_ENV === 'production'){
        window.addEventListener('beforeunload', onUnload);
        dispatch(updateEnvironmentMode(false));
      }

      return () => window.removeEventListener('beforeunload', onUnload);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
}


root.render(<Root/>);

