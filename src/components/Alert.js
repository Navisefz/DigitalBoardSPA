import * as React from 'react';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useDispatch, useSelector } from "react-redux";
import { updateIsError, updateIsMessage } from "../utils/app/mainSlice";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const AlertMessage = ()=> {
    const isError = useSelector((state) =>state.mainSlice.error);
    const isMessage = useSelector((state) => state.mainSlice.message);
    const dispatch = useDispatch();

    const horizontal = 'right';
    const vertical = 'top';

    const [error, setErrorTrigger] = React.useState(false);
    const [message, setMessageTrigger] = React.useState(false);

    const handleCloseError = () => {
        dispatch(updateIsError(''));

        setErrorTrigger(false);
    };

    const handleCloseMessage = () => {
        dispatch(updateIsMessage(''));
        setMessageTrigger(false);
    };

    React.useEffect(() => {

        if(isMessage.length > 1){
            setMessageTrigger(true);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [isMessage]);

    React.useEffect(() => {

        if(isError !== ""){
            setErrorTrigger(true);
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError]);

    return (
    
        <React.Fragment>
            <Snackbar open={error} autoHideDuration={6000} onClose={handleCloseError}
                anchorOrigin={{vertical,horizontal }} key={vertical + horizontal}
            >
                <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%', color: "white"}}>
                    {isError}
                </Alert>
                </Snackbar>
                <Snackbar open={message} autoHideDuration={6000} onClose={handleCloseMessage}
                    anchorOrigin={{vertical,horizontal }} key={horizontal + vertical}
                >
                <Alert onClose={handleCloseMessage} severity="success" sx={{ width: '100%', color: "white" }}>
                    {isMessage}
                </Alert>
            </Snackbar>
        </React.Fragment> 
    );
}

export default AlertMessage;