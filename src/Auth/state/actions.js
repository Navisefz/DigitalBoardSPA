import * as types from "./types";

export const setUserAuth = (data, isAuthenticated) => {
    return {
        type: types.SET_USER_AUTH,    
        accessToken: data.accessToken,
        idToken: data.idToken,
        accountId: data.accountId,    
        isAuthenticated: isAuthenticated,
    }
}

export const authenticateNewUser = () => ({
    type: types.AUTHENTICATE_NEW_USER
});

export const setAuthenticated = (bool) => ({
    type: types.SET_AUTHENTICATED,
    payload: bool,
});

export const setUserInfo = (data) => ({
    type: types.SET_USER_INFO,
    accountName: `${data.FirstName} ${data.LastName}`,
    firstName: data.FirstName,  
    accountId: data.AcctId,
    accountNo: data.AccountNumber,
});

export const setLinkAccounts = (data) => ({
    type: types.SET_LINK_ACCOUNTS,
    payload: data,
});

export const setNotifications = (bool) => ({
    type: types.SET_NOTIFICATIONS,
    payload: bool
});

export const setIdle = (bool) => ({
    type: types.SET_IDLE,
    payload: bool
});

export const logoutUser = () => ({
    type: types.LOGOUT_USER,
});

export const clear = () => ({
    type: types.CLEAR,
});


