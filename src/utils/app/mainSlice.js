import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {LOGIN_MESSAGES, API_MESSAGES} from "../contants";

const initialState = {
    loading: false,
    zones: [],
    locations:[],
    buildings: [],
    floors: [],
    error: '',
    message: [],
    seats: [],
    token: null,
    login: [],
    isLogin : false,
    availableReservation : [],
    navigation: "Dashboard",
    reservationByUser : [],
    // announcements: [],
    // reservationDataToCheck : [],
    isDevelopmentMode : true,
    currentUserDataRoles : [],
    user : [],
    users : [],
    areas : [],
    // shifts : [],
    // holidays : [],
    locationsDetail: [],
    // userPreferences : [],
    // reports : [],
    roles : [],
    generated : "",
    // fixedSeatsDropdown : [],
    // reportToDownload : [],
    // reservations: [],
    // reservedCheckerByUser : [],
    notifications : [],
    userLogs : [],
    requestsLogs : [],
    // zoneDropdown : [],
}

const baseURLZone = "https://localhost:44313/api/Image";
// const baseURLLocation ="https://localhost:44385/api/location";
// const baseURLBuilding ="https://localhost:44385/api/building";
const baseURLFloor ="https://localhost:44313/api/floor";
// const baseURLSeat = "https://localhost:44385/api/seat";
const baseURLLogin = "https://localhost:44313/api/login";
// const baseURLReservation = "https://localhost:44385/api/reservation";
const baseURLAnnouncement = "https://localhost:44313/api/announcement";
const baseURLUser = "https://localhost:44313/api/user";
// const baseURLReports = "https://localhost:44385/api/reports";
// const baseURLTimeKeeping = "https://localhost:44385/api/timekeeping";

//INT
// const baseURLZone = "https://mbgsp-portal.adc-apac.corpintra.net/tvapi/api/image";
// const baseURLLocation ="https://mbgsp-portal-int.apac.bg.corpintra.net/mainapp_api/api/location";
// const baseURLBuilding ="https://mbgsp-portal-int.apac.bg.corpintra.net/mainapp_api/api/building";
//  const baseURLFloor ="https://mbgsp-portal.adc-apac.corpintra.net/tvapi/api/floor";
// const baseURLSeat = "https://mbgsp-portal-int.apac.bg.corpintra.net/mainapp_api/api/seat";
//  const baseURLLogin = "https://mbgsp-portal.adc-apac.corpintra.net/tvapi/api/login";
// const baseURLReservation = "https://mbgsp-portal-int.apac.bg.corpintra.net/mainapp_api/api/reservation";
//  const baseURLAnnouncement = "https://mbgsp-portal.adc-apac.corpintra.net/tvapi/api/announcement"
//  const baseURLUser = "https://mbgsp-portal.adc-apac.corpintra.net/tvapi/api/user"
// const baseURLReports = "https://mbgsp-portal-int.apac.bg.corpintra.net/mainapp_api/api/reports"
// const baseURLTimeKeeping = "https://mbgsp-portal-int.apac.bg.corpintra.net/mainapp_api/api/timekeeping";

//PROD
//const baseURLZone = "https://mbgsp-portal.apac.bg.corpintra.net/tvapi/api/image";
// const baseURLLocation ="https://mbgsp-portal.apac.bg.corpintra.net/mainapp_api/api/location";
// const baseURLBuilding ="https://mbgsp-portal.apac.bg.corpintra.net/mainapp_api/api/building";
//const baseURLFloor ="https://mbgsp-portal.apac.bg.corpintra.net/tvapi/api/floor";
// const baseURLSeat = "https://mbgsp-portal.apac.bg.corpintra.net/mainapp_api/api/seat";
 //const baseURLLogin = "https://mbgsp-portal.apac.bg.corpintra.net/tvapi/api/login";
// const baseURLReservation = "https://mbgsp-portal.apac.bg.corpintra.net/mainapp_api/api/reservation";
 //const baseURLAnnouncement = "https://mbgsp-portal.apac.bg.corpintra.net/tvapi/api/announcement";
// const baseURLUser = "https://mbgsp-portal.apac.bg.corpintra.net/tvapi/api/user";
// const baseURLReports = "https://mbgsp-portal.apac.bg.corpintra.net/mainapp_api/api/reports";
// const baseURLTimeKeeping = "https://mbgsp-portal.apac.bg.corpintra.net/mainapp_api/api/timekeeping";

// const config = {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization' : `Bearer ${token}`,
//     },
// }
export function checkTokenIsStillValid (token, thunkAPI){
    try{
        let decodedToken= jwt_decode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
            thunkAPI.dispatch(logout());
            return thunkAPI.dispatch(updateIsError("Session Expired. Please re-login your credentials."));
        }
    }
    catch(e){
        thunkAPI.dispatch(logout());
        return thunkAPI.dispatch(updateIsError("Session Expired. Please re-login your credentials."));
    }
}

export const loginUser = createAsyncThunk('loginUser', (param, thunkAPI) => {
    return axios
        .post(baseURLLogin,param)
        .then(response => response.data)
});

// export const getReservationAvailable = createAsyncThunk('getReservationAvailable', (params, thunkAPI) => {
//     checkTokenIsStillValid(params.token, thunkAPI);
//     const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization' : `Bearer ${params.token}`,
//         }
//     }
//     return axios
//         .get(baseURLReservation+"/AvailableForReservation",params.data, config)
//         .then(response => response.data)
// });

// export const saveReservation = createAsyncThunk('saveReservation', (params, thunkAPI) => {
//     checkTokenIsStillValid(params.token, thunkAPI);
//     const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization' : `Bearer ${params.token}`,
//         }
//     }
//     return axios
//         .post(baseURLReservation+"/Reserve",params.data,config)
//         .then(response => response.data)
// });

// export const checkReservationAvailability = createAsyncThunk('checkReservationAvailability', (params, thunkAPI) => {
//     checkTokenIsStillValid(params.token, thunkAPI);
//     const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization' : `Bearer ${params.token}`,
//         }
//     }
//     return axios
//         .post(baseURLReservation+"/CheckReservationAvailability",params.data, config)
//         .then(response => response.data)
// });

// export const removeReservation = createAsyncThunk('removeReservation', (params, thunkAPI) => {
//     checkTokenIsStillValid(params.token, thunkAPI);
//     const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization' : `Bearer ${params.token}`,
//         }
//     }
//     return axios
//         .post(baseURLReservation+"/RemoveReservation",params.data, config)
//         .then(response => response.data)
// });

// export const searchReservationAvailable = createAsyncThunk('searchReservationAvailable',(params, thunkAPI) => {
//     checkTokenIsStillValid(params.token, thunkAPI);
//     const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization' : `Bearer ${params.token}`,
//         }
//     }
//     return axios
//         .post(baseURLReservation+"/SearchReservationAvailableV2",params.data,config)
//         .then(response => response.data)
// });

export const getCurrentUser = createAsyncThunk('getCurrentUser', (login) => {
    return axios
        .post(baseURLLogin,login)
        .then(response => response.data)
});

export const getZone = createAsyncThunk('getZone', (params, thunkAPI) => {
    checkTokenIsStillValid(params.token, thunkAPI);
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${params.token}`,
        }
    }
    return axios
        .get(baseURLZone, config)
        .then(response => response.data)
});

export const saveZone = createAsyncThunk('saveZone', (params, thunkAPI) => {
    checkTokenIsStillValid(params.token, thunkAPI);
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${params.token}`,
        }
    }
    return axios
        .post(baseURLZone,params.data,config)
        .then(response => response.data)
});

export const updateZone = createAsyncThunk('updateZone', (params, thunkAPI) => {
    checkTokenIsStillValid(params.token, thunkAPI);
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${params.token}`,
        }
    }
    return axios
        .post(baseURLZone+"/UpdateZone",params.data,config)
        .then(response => response.data)
});

export const removeZone = createAsyncThunk('removeZone', (params, thunkAPI) => {
    checkTokenIsStillValid(params.token, thunkAPI);
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${params.token}`,
        }
    }
    return axios
        .post(baseURLZone+"/RemoveZone",params.data,config)
        .then(response => response.data)
});

export const searchZone = createAsyncThunk('searhZone', (params, thunkAPI) => {
    checkTokenIsStillValid(params.token, thunkAPI);
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${params.token}`,
        }
    }
    return axios
        .get(baseURLZone+"/SearchZone",params.data,config)
        .then(response => response.data)
});


// export const getLocations = createAsyncThunk('getLocations', (params, thunkAPI) => {
//     checkTokenIsStillValid(params.token, thunkAPI);
//     const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization' : `Bearer ${params.token}`,
//         }
//     }
//     return axios
//         .get(baseURLLocation,config)
//         .then(response => response.data)
// });

// export const saveLocation = createAsyncThunk('saveLocation', (params, thunkAPI) => {
//     checkTokenIsStillValid(params.token, thunkAPI);
//     const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization' : `Bearer ${params.token}`,
//         }
//     }
//     return axios
//         .post(baseURLLocation,params.data,config)
//         .then(response => response.data)
// });

// export const updateLocation = createAsyncThunk('updateLocation', (params, thunkAPI) => {
//     checkTokenIsStillValid(params.token, thunkAPI);
//     const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization' : `Bearer ${params.token}`,
//         }
//     }
//     return axios
//         .post(baseURLLocation+"/UpdateLocation",params.data,config)
//         .then(response => response.data)
// });

// export const removeLocation = createAsyncThunk('removeLocation', (params, thunkAPI) => {
//     checkTokenIsStillValid(params.token, thunkAPI);
//     const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization' : `Bearer ${params.token}`,
//         }
//     }
//     return axios
//         .post(baseURLLocation+"/RemoveLocation",params.data,config)
//         .then(response => response.data)
// });

// export const getBuildings = createAsyncThunk('getBuildings', (params, thunkAPI) => {
//     checkTokenIsStillValid(params.token, thunkAPI);
//     const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization' : `Bearer ${params.token}`,
//         }
//     }
//     return axios
//         .get(baseURLBuilding, config)
//         .then(response => response.data)
// });

// export const saveBuilding = createAsyncThunk('saveBuilding', (params, thunkAPI) => {
//     checkTokenIsStillValid(params.token, thunkAPI);
//     const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization' : `Bearer ${params.token}`,
//         }
//     }
//     return axios
//         .post(baseURLBuilding,params.data, config)
//         .then(response => response.data)
// });

// export const updateBuilding = createAsyncThunk('updateBuilding', (params, thunkAPI) => {
//     checkTokenIsStillValid(params.token, thunkAPI);
//     const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization' : `Bearer ${params.token}`,
//         }
//     }
//     return axios
//         .post(baseURLBuilding+"/UpdateBuilding",params.data,config)
//         .then(response => response.data)
// });

// export const removeBuilding = createAsyncThunk('removeBuilding', (params, thunkAPI) => {
//     checkTokenIsStillValid(params.token, thunkAPI);
//     const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization' : `Bearer ${params.token}`,
//         }
//     }
//     return axios
//         .post(baseURLBuilding+"/RemoveBuilding",params.data, config)
//         .then(response => response.data)
// });

export const getFloors = createAsyncThunk('getFloors', (params, thunkAPI) => {
    checkTokenIsStillValid(params.token, thunkAPI);
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${params.token}`,
        }
    }
    return axios
        .get(baseURLFloor, config)
        .then(response => response.data)
});

export const saveFloor = createAsyncThunk('saveFloor', (params, thunkAPI) => {
    checkTokenIsStillValid(params.token, thunkAPI);
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${params.token}`,
        }
    }
    return axios
        .post(baseURLFloor,params.data,config)
        .then(response => response.data)
});

export const updateFloor = createAsyncThunk('updateFloor', (params, thunkAPI) => {
    checkTokenIsStillValid(params.token, thunkAPI);
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${params.token}`,
        }
    }
    return axios
        .post(baseURLFloor+"/UpdateFloor",params.data,config)
        .then(response => response.data)
});

export const removeFloor = createAsyncThunk('removeFloor', (params, thunkAPI) => {
    checkTokenIsStillValid(params.token, thunkAPI);
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${params.token}`,
        }
    }
    return axios
        .post(baseURLFloor+"/RemoveFloor",params.data,config)
        .then(response => response.data)
});
export const generateTokenByLogin = createAsyncThunk('generateTokenByLogin', (param) => {
    return axios
        .post(baseURLLogin+"/GenerateTokenByLogin",param.data)
        .then(response => response.data)
});
export const getUser = createAsyncThunk('getUser', (param, thunkAPI) => {
    checkTokenIsStillValid(param.token, thunkAPI);
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${param.token}`,
        }
    }
    return axios
        .post(baseURLUser+"/GetUser",param.data, config)
        .then(response => response.data)
});
export const getAnnouncements = createAsyncThunk('getAnnouncements', (params, thunkAPI) => {
    checkTokenIsStillValid(params.token, thunkAPI);
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${params.token}`,
        }
    }
    return axios
        .get(baseURLAnnouncement,config)
        .then(response => response.data)
});
// export const getSeats = createAsyncThunk('getSeats', (params, thunkAPI) => {
//     checkTokenIsStillValid(params.token, thunkAPI);
//     const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization' : `Bearer ${params.token}`,
//         }
//     }
//     return axios
//         .get(baseURLSeat,config)
//         .then(response => response.data)
// });

// export const saveSeat = createAsyncThunk('saveSeat', (params, thunkAPI) => {
//     checkTokenIsStillValid(params.token, thunkAPI);
//     const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization' : `Bearer ${params.token}`,
//         }
//     }
//     return axios
//         .post(baseURLSeat,params.data,config)
//         .then(response => response.data)
// });

// export const updateSeat = createAsyncThunk('updateSeat', (params, thunkAPI) => {
//     checkTokenIsStillValid(params.token, thunkAPI);
//     const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization' : `Bearer ${params.token}`,
//         }
//     }
//     return axios
//         .post(baseURLSeat+"/UpdateSeat",params.data,config)
//         .then(response => response.data)
// });

// export const updateSeatStatus = createAsyncThunk('updateSeatStatus', (params, thunkAPI) => {
//     checkTokenIsStillValid(params.token, thunkAPI);
//     const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization' : `Bearer ${params.token}`,
//         }
//     }
//     return axios
//         .post(`${baseURLSeat}/StatusUpdate`,params.data,config)
//         .then(response => response.data)
// });

// export const removeSeat = createAsyncThunk('removeSeat', (params, thunkAPI) => {
//     checkTokenIsStillValid(params.token, thunkAPI);
//     const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization' : `Bearer ${params.token}`,
//         }
//     }
//     return axios
//         .post(baseURLSeat+"/RemoveSeat",params.data,config)
//         .then(response => response.data)
// });



// export const getReservationByUserChecker = createAsyncThunk('getReservationByUserChecker', (params, thunkAPI) => {
//     checkTokenIsStillValid(params.token, thunkAPI);
//     const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization' : `Bearer ${params.token}`,
//         }
//     }
//     return axios
//         .post(baseURLReservation+"/ReservationByUser",params.data,config)
//         .then(response => response.data)
// });

// export const getReservationByUserSearch = createAsyncThunk('getReservationByUserSearch', (params, thunkAPI) => {
//     checkTokenIsStillValid(params.token, thunkAPI);
//     const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization' : `Bearer ${params.token}`,
//         }
//     }
//     return axios
//         .post(`${baseURLReservation}/ReservationByUserSearch`,params.data, config)
//         .then(response => response.data)
// });

// export const reservationCheckedIn = createAsyncThunk('reservationCheckedIn', (params, thunkAPI) => {
//     checkTokenIsStillValid(params.token, thunkAPI);
//     const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization' : `Bearer ${params.token}`,
//         }
//     }
//     return axios
//         .post(baseURLReservation+"/CheckInReservation",params.data,config)
//         .then(response => response.data)
// });

// export const reservationCheckedOut = createAsyncThunk('reservationCheckedOut', (params, thunkAPI) => {
//     checkTokenIsStillValid(params.token, thunkAPI);
//     const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization' : `Bearer ${params.token}`,
//         }
//     }
//     return axios
//         .post(baseURLReservation+"/CheckOutReservation",params.data, config)
//         .then(response => response.data)
// });

// export const searchLocationByName = createAsyncThunk('searchLocationByName', (params, thunkAPI) => {
//     checkTokenIsStillValid(params.token, thunkAPI);
//     const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization' : `Bearer ${params.token}`,
//         }
//     }
//     return axios
//         .post(baseURLLocation+"/Search",params.data,config)
//         .then(response => response.data)
// });



const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        updateIsError: (state, action) =>{
            state.error = action.payload;
        },
        updateIsMessage: (state, action) =>{
            state.message = action.payload;
        },
        logout: (state, action) => {
            state.loading = false;
            state.zones =  [];
            state.locations = [];
            state.buildings = [];
            state.floors =  [];
            state.error = '';
            state.message = [];
            state.seats = [];
            state.token =null;
            state.login = [];
            state.isLogin = false;
            state.availableReservation = [];
            state.navigation = "Dashboard";
            state.reservationByUser = [];
            state.announcements = [];
            state.reservationDataToCheck = [];
            state.isDevelopmentMode = true;
            state.currentUserDataRoles = [];
            state.user = [];
            state.users = [];
            state.userPreferences = [];
            state.reports = [];
            state.roles  = [];
            state.generated = "";
            state.fixedSeatsDropdown = [];
            state.reportToDownload = [];
            state.reservations = [];
            state.reservationDataToCheck = [];
            state.notifications = [];
            state.areas =  [];
            state.shifts = [];
        },
        updateNavigation: (state, action) =>{
            state.navigation = action.payload;
        },
        clearAllReducer: (state,action) => {
            state.zones = [];
            state.locations=[];
            state.buildings= [];
            state.floors= [];
            state.seats= [];
            state.availableReservation = [];
            state.reservationByUser = [];
        },
        clearReservationDataToCheck : (state, action) =>{
            state.reservationDataToCheck = [];
            state.availableReservation = [];
        },
        updateEnvironmentMode : (state,action) =>{
            state.isDevelopmentMode = action.payload;
        },
        removeGeneratedToken : (state , action) => {
            state.generated = "";
        },
        setLoading : (state , action) => {
            state.loading = action.payload;
        },
        updateReservationByUserState : (state, action) => {
            state.reservationByUser = action.payload;
        },
        clearReservation : (state, action) =>{
            state.availableReservation = []
        },
        updateReservationsMasterList : (state, action) =>{
            state.reservations = action.payload
        },
        updateIsLogin : (state, action) =>{
            state.isLogin = true;
        },
        setNotifications : (state, action) => {
            state.notifications = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getZone.pending, state => {
          state.loading = true
        })
        builder.addCase(getZone.fulfilled, (state, action) => {
          state.loading = false
          state.zones = action.payload
          state.error = ''
        })
        builder.addCase(getZone.rejected, (state, action) => {
          state.loading = false
          state.zones = []
          state.error = action.error.message
        })
        builder.addCase(saveZone.pending, state => {
            state.loading = true
        })
        builder.addCase(saveZone.fulfilled, (state, action) => {
            state.loading = false
            state.message = action.payload
            state.error = ''
        })
        builder.addCase(saveZone.rejected, (state, action) => {
            state.loading = false
            state.message = []
            state.error = action.error.message
        })
        builder.addCase(searchZone.pending, state => {
            state.loading = true
        })
            builder.addCase(searchZone.fulfilled, (state, action) => {
            state.loading = false
            state.zones = action.payload
            state.error = ''
        })
        builder.addCase(searchZone.rejected, (state, action) => {
            state.loading = false
            state.zones = []
            state.error = action.error.message
        })
        builder.addCase(updateZone.pending, state => {
            state.loading = true
        })
        builder.addCase(updateZone.fulfilled, (state, action) => {
            state.loading = false
            state.message = action.payload
            state.error = ''
        })
        builder.addCase(updateZone.rejected, (state, action) => {
            state.loading = false
            state.message = []
            state.error = action.error.message
        })
        builder.addCase(removeZone.pending, state => {
            state.loading = true
        })
        builder.addCase(removeZone.fulfilled, (state, action) => {
            state.loading = false
            state.message = action.payload
            state.error = ''
        })
        builder.addCase(removeZone.rejected, (state, action) => {
            state.loading = false
            state.message = []
            state.error = action.error.message
        })
        // builder.addCase(getLocations.pending, state => {
        //     state.loading = true
        // })
        // builder.addCase(getLocations.fulfilled, (state, action) => {
        //     state.loading = false
        //     state.locations = action.payload
        //     state.error = ''
        // })
        // builder.addCase(getLocations.rejected, (state, action) => {
        //     state.loading = false
        //     state.locations = []
        //     state.error = action.error.message
        // })
        // builder.addCase(saveLocation.pending, state => {
        //     state.loading = true
        // })
        // builder.addCase(saveLocation.fulfilled, (state, action) => {
        //     state.loading = false
        //     state.message = action.payload
        //     state.error = ''
        // })
        // builder.addCase(saveLocation.rejected, (state, action) => {
        //     state.loading = false
        //     state.message = []
        //     state.error = action.error.message
        // })
        // builder.addCase(updateLocation.pending, state => {
        //     state.loading = true    
        // })
        // builder.addCase(updateLocation.fulfilled, (state, action) => {
        //     state.loading = false
        //     state.message = action.payload
        //     state.error = ''
        // })
        // builder.addCase(updateLocation.rejected, (state, action) => {
        //     state.loading = false
        //     state.message = []
        //     state.error = action.error.message
        // })
        // builder.addCase(removeLocation.pending, state => {
        //     state.loading = true
        // })
        // builder.addCase(removeLocation.fulfilled, (state, action) => {
        //     state.loading = false
        //     state.message = action.payload
        //     state.error = ''
        // })
        // builder.addCase(removeLocation.rejected, (state, action) => {
        //     state.loading = false
        //     state.message = []
        //     state.error = action.error.message
        // })
        // builder.addCase(getBuildings.pending, state => {
        //     state.loading = true
        // })
        // builder.addCase(getBuildings.fulfilled, (state, action) => {
        //     state.loading = false
        //     state.buildings = action.payload
        //     state.error = ''
        // })
        // builder.addCase(getBuildings.rejected, (state, action) => {
        //     state.loading = false
        //     state.buildings = []
        //     state.error = action.error.message
        // })
        // builder.addCase(saveBuilding.pending, state => {
        //     state.loading = true
        // })
        // builder.addCase(saveBuilding.fulfilled, (state, action) => {
        //     state.loading = false
        //     state.message = action.payload
        //     state.error = ''
        // })
        // builder.addCase(saveBuilding.rejected, (state, action) => {
        //     state.loading = false
        //     state.message = []
        //     state.error = action.error.message
        // })
        builder.addCase(loginUser.pending, state => {
            state.loading = true
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false
            state.error = ''
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false
            state.message = []
            state.error = LOGIN_MESSAGES.FAILED
        })

    }
});

export const {
    updateIsError, 
    updateIsMessage, 
    logout, 
    updateNavigation, 
    clearAllReducer, 
    clearReservationDataToCheck, 
    updateEnvironmentMode, 
    removeGeneratedToken, 
    setLoading, 
    updateReservationByUserState,
    clearReservation,
    updateIsLogin,
    setNotifications
    } = mainSlice.actions;
export default mainSlice;