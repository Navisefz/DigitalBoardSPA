import React, { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { Modal, Button } from "react-bootstrap";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button1 from '@mui/material/Button';
import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType,
} from "@microsoft/signalr";
import { Typography } from "@material-ui/core";

export default function Imagelist() {
  
  const [imageList, setImageList] = useState([]);
  // const[clarkimageList, setclarkimageList] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [recordForEdit1, setRecordForEdit1] = useState(null);
  const [loading, isLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [remarks, setRemarks] = useState([]);
  const [currentRemark, setCurrentRemark] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [connection, setConnection] = useState();
  const [userName, setUserName] = useState("");

  const msg = {
    id: Math.random() * 10,
    message,
    userName: userName,
  };
  //for local
  // const clarkapiDelete = "https://localhost:44313/api/ClarkImage/";
  const apiDelete = "https://localhost:44313/api/CebuImage/";
  const imagehub = "https://localhost:44313/imageHub";
  const cebufetchApi = "https://localhost:44313/api/CebuImage/?cebufloor=";

  
  //  const apiDelete="https://mbgsp-portal.adc-apac.corpintra.net/tvapi/api/CebuImage/";
  //  const imagehub= "https://mbgsp-portal.adc-apac.corpintra.net/tvapi/imageHub";
  //  const cebufetchApi= "https://mbgsp-portal-int.apac.bg.corpintra.net/tvapi/api/CebuImage/?cebufloor=";

  //for prod
  //  const apiDelete="https://mbgsp-portal.apac.bg.corpintra.net/tvapi/api/CebuImage/";
  //  const imagehub= "https://mbgsp-portal.apac.bg.corpintra.net/tvapi/imageHub";
  //  const fetchApi= "https://mbgsp-portal.apac.bg.corpintra.net/tvapi/api/CebuImage/?floor=";
  // const [clarkimageList, clarksetImageList] = useState([]);
  const clarkapiDelete = "https://localhost:44313/api/ClarkImage/";
  const clarkfetchApi = "https://localhost:44313/api/ClarkImage/?clarkfloor=";
  // const clarkapiDelete="https://mbgsp-portal-int.apac.bg.corpintra.net/tvapi/api/ClarkImage/";
  // const clarkfetchApi= "https://mbgsp-portal-int.apac.bg.corpintra.net/tvapi/api/ClarkImage/?clarkfloor=";
  const [deleteId, setDeleteId] = useState(null);
  const [location, setLocation] = useState();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [open, setOpen] = React.useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={2} ref={ref} variant="filled" {...props} />;
  });

  const ITEM_HEIGHT = 80;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 150,
      },
    },
  };
 
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleModalClose = () => setShowModal(false);

  useEffect(() => {
    refreshImageList();
  }, []);
  useEffect(() => {
    clarkrefreshImageList();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const socketConnection = new HubConnectionBuilder()
        .configureLogging(LogLevel.Debug)
        .withUrl(imagehub, {
          skipNegotiation: true,
          transport: HttpTransportType.WebSockets,
        })
        .build();
      await socketConnection.start();
      setConnection(socketConnection);
    };
    loadData();
  }, []);
  connection &&
    connection.on("message", (message) => {
      setMessages(message);
    });

  const windowUrl = window.location.href;
  const params = new URL(windowUrl);
  const floors = params.search.split("=")[1];
  const [cebufloor, setFloor] = React.useState("");
  const [clarkfloor, setclarkFloor] = React.useState("");
  const imageAPI = (url = cebufetchApi + cebufloor) => {
    return {
      fetchAll: (val) =>
        axios.get(
          val == undefined ? cebufetchApi + cebufloor : cebufetchApi + val
        ),
      create: (newRecord) => axios.post(url, newRecord),
      update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
    };
  };
  const clarkimageAPI = (url3 = clarkfetchApi + clarkfloor) => {
    return {
      fetchAll3: (val1) =>
        axios.get(
          val1 == undefined ? clarkfetchApi + clarkfloor : clarkfetchApi + val1
        ),
      create1: (newRecord1) => axios.post(url3, newRecord1),
      update1: (id, updatedRecord1) => axios.put(url3 + id, updatedRecord1),
    };
  };
  const imageAPI2 = (url2 = apiDelete) => {
    return {
      fetchAll2: () => axios.get(url2),
      delete: (id) => axios.delete(url2 + id),
    };
  };
  const clarkdelete = (url4 = clarkapiDelete) => {
    return {
      fetchAll2: () => axios.get(url4),
      delete: (id) => axios.delete(url4 + id),
    };
  };
  
  
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDrop = async (e, newIndex) => {
    e.preventDefault();

    const oldIndex = e.dataTransfer.getData("text/plain");

    const newImageList = [...imageList];

    [newImageList[oldIndex], newImageList[newIndex]] = [
      newImageList[newIndex],
      newImageList[oldIndex],
    ];

    // Make an HTTP POST request to the API endpoint
    try {
      const response = await axios.post(
        "https://localhost:44313/api/CebuImage/api/images/reorder" ,
        newImageList.map((image) => image.ImageID)
      );

      setImageList(response);

      // Handle the response as needed
    } catch (error) {
      // Handle any error that occurs during the request
    }
    refreshImageList();
   
    connection && connection.invoke("message", msg);
    setImageList(newImageList);
  };
  const handleDrop1 = async (e, newIndex) => {
    e.preventDefault();

    const oldIndex = e.dataTransfer.getData("text/plain");

    const newImageList = [...imageList];

    [newImageList[oldIndex], newImageList[newIndex]] = [
      newImageList[newIndex],
      newImageList[oldIndex],
    ];

    // Make an HTTP POST request to the API endpoint
    try {
      const response = await axios.post(
        // "https://localhost:44313/api/ClarkImage/api/images/reorder"
        "https://localhost:44313/api/ClarkImage/api/images/reorder"
        ,
        newImageList.map((image) => image.ImageID)
      );

      setImageList(response);

      // Handle the response as needed
    } catch (error) {
      // Handle any error that occurs during the request
    }
    clarkrefreshImageList();
   
    connection && connection.invoke("message", msg);
    setImageList(newImageList);
  };
  
  function refreshImageList(Flores) {
    isLoading(false);
    imageAPI()
      .fetchAll(Flores)
      .then((res) => {
        setImageList(res.data);
        console.log(res.data)
      })
      .catch((err) => console.log(err));
  }
  function clarkrefreshImageList(Flores1) {
    isLoading(false);
    clarkimageAPI()
      .fetchAll3(Flores1)
      .then((res) => {
     
        setImageList(res.data);
        
     
      })
      .catch((err) => console.log(err));
  }
  const addOrEdit = (formData, onSuccess) => {
    isLoading(true);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
 
    if (formData.get("imageKey") === "null") {
    
      imageAPI()
        .create(formData, config)
     
        .then((_res) => {
          onSuccess();

          refreshImageList();

          connection && connection.invoke("message", msg);
        })
        .catch((err) => console.log(err));
    }
  };
  const addOrEdit1 = (formData1, onSuccess) => {
    isLoading(true);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      
      },
    };

    if (formData1.get("imageKey") === "null") {
      clarkimageAPI()
        .create1(formData1, config)
     
        .then((_res) => {
          onSuccess();
        
          clarkrefreshImageList();
          connection && connection.invoke("message", msg);
        })
        .catch((err) => console.log(err));
    }
  };
  const showRecordDetails = (data) => {
    setRecordForEdit(data);
  };
  const showRecordDetails1 = (data) => {
    setRecordForEdit1(data);
  };
  //delete an image
  const onDelete = (e, id) => {
    e.stopPropagation();
    setDeleteId(id);
    setShowModal(true);
  };
  const handleDelete = (id) => {
    imageAPI2()
      .delete(id)
      .then((_res) => {
        connection && connection.invoke("message", msg);
        refreshImageList();
        setShowModal(false);
        setDeleteId(null);
        setShowSnackbar(true);
        setSnackbarMessage("Image deleted successfully");
      })
      .catch((err) => {
        console.log(err);
        setShowSnackbar(true);
        setSnackbarMessage("Failed to delete image");
      });
  };
 const handleDelete1 = (id) => {
  clarkdelete()
      .delete(id)
      .then((_res) => {
        connection && connection.invoke("message", msg);
        clarkrefreshImageList();
        setShowModal(false);
        setDeleteId(null);
        setShowSnackbar(true);
        setSnackbarMessage("Image deleted successfully");
      })
      .catch((err) => {
        console.log(err);
        setShowSnackbar(true);
        setSnackbarMessage("Failed to delete image");
      });
  };
  const imageCard = (data) => (
    <div
      className="card"
      onClick={() => {
        showRecordDetails(data);
       
        
      }}
    >
      <img src={data.ImageSrc} alt="" className="cardimage" />
      <div className="card-body">
        <button
          className="btn btn-light delete-button"
          onClick={(e) => onDelete(e, parseInt(data.ImageID))}
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  );
  // const imageCard1 = (data) => (
  //   <div
  //     className="card"
  //     onClick={() => {
     
  //       showRecordDetails1(data);
  //     }}
  //   >
  //     <img src={data.ImageSrc} alt="" className="cardimage" />
  //     <div className="card-body">
  //       <button
  //         className="btn btn-light delete-button"
  //         onClick={(e) => onDelete(e, parseInt(data.ImageID))}
  //       >
  //         <i className="fas fa-trash-alt"></i>
  //       </button>
  //     </div>
  //   </div>
  // );
  function handleChange(event) {
    // imageAPI().fetchAll();
    refreshImageList(event.target.value);
  }
  function handleChange1(e) {
    clarkrefreshImageList(e.target.value);
  }
  // const handleInputChange = (event) => {
  //   setCurrentRemark(event.target.value);
  // };

  // const addRemark = () => {
  //   if (currentRemark.trim() !== "") {
  //     setRemarks([...remarks, currentRemark]);
  //     setCurrentRemark("");
  //   }
  // };

  // const updateRemark = (index, updatedRemark) => {
  //   const updatedRemarks = [...remarks];
  //   updatedRemarks[index] = updatedRemark;
  //   setRemarks(updatedRemarks);
  // };

  // const deleteRemark = (index) => {
  //   const updatedRemarks = [...remarks];
  //   updatedRemarks.splice(index, 1);
  //   setRemarks(updatedRemarks);
  // };
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="modalTitle">DELETE IMAGE</Modal.Title>
        </Modal.Header>
        <Modal.Body className="deleteImageModal">
          Are you sure you want to delete this image?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleDelete (deleteId) || handleDelete1 (deleteId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        message={snackbarMessage}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Image deleted successfully!
        </Alert>
      </Snackbar>
      <div className="floorname">
        {location === "clark"
          ? "CLARK URL " + clarkfloor
          : "CEBU URL " + cebufloor}
      </div>

      <div className="selectFloor">
        <Box sx={{ minWidth: 120  }} key={"123"}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Location</InputLabel>
            <Select
              sx={{ fontFamily: "MB Corpo S Text" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              MenuProps={MenuProps}
              value={location}
              label="Location"
              onChange={(event) => {
                setLocation(event.target.value);
                handleChange(event);
              }}
            >
              <MenuItem value="cebu">Cebu</MenuItem>
              <MenuItem value="clark">Clark</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box
          sx={{
            minWidth: 120,
            position: "relative",
            left: "130px",
            bottom: "52px",
          }}
          key={"1265"}
        >
           {location === "cebu" && (
            <>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Floors</InputLabel>

                <Select
                  sx={{ fontFamily: "MB Corpo S Text" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  MenuProps={MenuProps}
                  value={cebufloor}
                  label="Floor"
                  onChange={(event) => {
                    setFloor(event.target.value);
                    handleChange(event);
                  }}
                >
                  <MenuItem key="ceb-1" value="1">
                    Ceb-1
                  </MenuItem>
                  <MenuItem key="ceb-2" value="2">
                    Ceb-2
                  </MenuItem>
                  <MenuItem key="ceb-3" value="3">
                    Ceb-3
                  </MenuItem>
                  <MenuItem key="ceb-4" value="4">
                    Ceb-4
                  </MenuItem>f
                  <MenuItem key="ceb-5" value="5">
                    Ceb-5
                  </MenuItem>
                  <MenuItem key="ceb-6" value="6">
                    Ceb-6
                  </MenuItem>
                  <MenuItem key="ceb-7" value="7">
                    Ceb-7
                  </MenuItem>
                  <MenuItem key="ceb-8" value="8">
                    Ceb-8
                  </MenuItem>
                  <MenuItem key="ceb-9" value="9">
                    Ceb-9
                  </MenuItem>
                  <MenuItem key="ceb-10" value="10">
                    Ceb-10
                  </MenuItem>
                  <MenuItem key="ceb-11" value="11">
                    Ceb-11
                  </MenuItem>

                  {/* Add more Cebu floors here */}
                </Select>
              </FormControl>
            </>
          )}
          {location === "clark" && (
            <>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Floors</InputLabel>

                <Select
                  sx={{ fontFamily: "MB Corpo S Text" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  MenuProps={MenuProps}
                  value={clarkfloor}
                  label="Floor"
                  onChange={(e) => {
                    setclarkFloor(e.target.value);
                    handleChange1(e);
                  }}
                >
                  <MenuItem key="cla-1" value="1">
                    Cla-1
                  </MenuItem>
                  <MenuItem key="cla-2" value="2">
                    Cla-2
                  </MenuItem>
                  <MenuItem key="cla-3" value="3">
                    Cla-3
                  </MenuItem>
                  <MenuItem key="cla-4" value="4">
                    Cla-4
                  </MenuItem>
                  <MenuItem key="cla-5" value="5">
                    Cla-5
                  </MenuItem>
                  <MenuItem key="cla-6" value="6">
                    Cla-6
                  </MenuItem>
                  <MenuItem key="cla-7" value="7">
                    Cla-7
                  </MenuItem>
                  <MenuItem key="cla-8" value="8">
                    Cla-8
                  </MenuItem>
                  <MenuItem key="cla-9" value="9">
                    Cla-9
                  </MenuItem>
                  <MenuItem key="cla-10" value="10">
                    Cla-10
                  </MenuItem>
                  {/* Add more Clark floors here */}
                </Select>
              </FormControl>
            </>
          )}
         
        </Box>

        {/* <SelectFloor/> */}
      </div>
      <div className="imageUploadCard">
        <ImageUpload
          addOrEdit={addOrEdit}
          recordForEdit={recordForEdit}
          addOrEdit1={addOrEdit1}
          recordForEdit1={recordForEdit1}
          // remarks={remarks}
        />
      </div>
      {/* <Stack>
      <Box className="remark">
      <Button1 sx={{backgroundColor:"black", color:"white", position:"relative",left:"250px", bottom:'120px'}} variant="outlined" onClick={handleClick}>
       Add Remark <AddIcon/>
      </Button1>
      <Dialog  open={open} onClose={handleClose}>
        <DialogTitle>Remarks</DialogTitle>
        <DialogContent> */}
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          {/* <TextField
            multiline
            autoFocus
            margin="dense"
            id="name"
            label="Write your Remark"
            type="email"
            fullWidth
            variant="standard"
            sx={{ width:"500px",height:"80px" }}
            value={remarks}
            onChange={(e)=>setRemarks( e.target.value)
             
            }
            
          /> */}

{/*          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
      <Typography style={{color: "black", fontSize:"0.8rem" }}>{remarks}
      </Typography>
      
    </Box>
    </Stack> */}
      {/* <div className="remark">
        <TextField
          sx={{width:"400px",color:"black"}}
          id="standard-basic"
        
          variant="standard"
          value={currentRemark}
          onChange={handleInputChange}
          placeholder="Write your remark"
         
          
        />
        <Stack
          spacing={2}
          direction="row"
          sx={{ position: "relative", top: "20px", left: "150px" }}
        >
          <Button variant="contained" onClick={addRemark}>
            Add A Remark
            <AddIcon />
          </Button>
        </Stack>
        <ul>
          {remarks.map((remark, index) => (
            <li key={index}>
              <textarea
                value={remark}
                onChange={(event) => updateRemark(index, event.target.value)}
              />
              <button onClick={() => deleteRemark(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div> */}

      {/* I just want to thank you everyone in the dev team specially sir Jeremiah Rojas for giving me the chance to experience what
a developer does in a corporate world.   */}
      <Grid
        container
        spacing={0.5}
        sx={{
          backgroundColor: "whitesmoke",
          objectFit: "cover",
          width: "100%",
          position: "relative",
          bottom: "35px",
        }}
      >
        {imageList.map((image, index) => (
          
          <Grid
            className="gridimages"
            item
            xs={1.5}
            sm={1.5}
            md={1.5}
            key={image.ImageID}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => 
              {
              handleDrop(e, index);
              handleDrop1(e, index);
              }
            }
          > 
          
            {imageCard(image)}
          </Grid>
        ))}
        
        
      </Grid>
    </>
  );
}
