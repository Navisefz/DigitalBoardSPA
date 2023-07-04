import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType,
} from "@microsoft/signalr";

const cebufetchApi = "https://localhost:44313/api/CebuImage/?cebufloor=";
const clarkfetchApi = "https://localhost:44313/api/ClarkImage/?clarkfloor=";
function ImageCarousel() {
  const [items, setItems] = useState([]);
  const [connection, setConnection] = useState();
  const [cebufloor, setFloor] = React.useState("");
  const [clarkfloor, setclarkFloor] = React.useState("");
  const [loading, isLoading] = useState(false);
  const [location, setLocation] = useState();
  const [open, setOpen] = React.useState(false);
  // const fApi = "https://localhost:44313/api/CebuImage/?cebufloor=";
  const imageAPI = (
    url = "https://localhost:44313/api/CebuImage/?cebufloor=" + cebufloor
  ) => {
    return {
      fetchAll: (val) =>
        axios.get(
          val === undefined ? cebufetchApi + cebufloor : cebufetchApi + val
        ),
    };
  };
  function refreshImageList(Flores) {
    isLoading(false);
    imageAPI()
      .fetchAll(Flores)
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => console.log(err));
  }
  const clarkimageAPI = (
    url1 = "https://localhost:44313/api/ClarkImage/?cebufloor=" + clarkfloor
  ) => {
    return {
      fetchAll1: (val) =>
        axios.get(
          val === undefined ? clarkfetchApi + clarkfloor : clarkfetchApi + val
        ),
    };
  };
  function clarkrefreshImageList(Flores1) {
    isLoading(false);
    clarkimageAPI()
      .fetchAll1(Flores1)
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => console.log(err));
  }
  function handleChange(event) {
    // imageAPI().fetchAll();
    refreshImageList(event.target.value);
  }
  function handleChange1(event) {
    // imageAPI().fetchAll();
    clarkrefreshImageList(event.target.value);
  }

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

  const cebufetchImages = async () => {
    const cebufloor = new URLSearchParams(window.location.search).get(
      "cebufloor"
    );
    await axios
      .get(`https://localhost:44313/api/CebuImage/?cebufloor=${cebufloor}`)
      .then((res) => {
        setItems([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const clarkfetchImages = async () => {
    const clarkfloor = new URLSearchParams(window.location.search).get(
      "clarkfloor"
    );
    await axios
      .get(`https://localhost:44313/api/ClarkImage/?clarkfloor=${clarkfloor}`)
      .then((res) => {
        setItems([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const loadData = async () => {
      const socketConnection = new HubConnectionBuilder()
        .configureLogging(LogLevel.Debug)
        .withUrl("https://localhost:44313/tvapi/imageHub", {
          skipNegotiation: true,
          transport: HttpTransportType.WebSockets,
        })
        .build();
      await socketConnection.start();
      setConnection(socketConnection);
    };
    loadData();
  }, []);

  useEffect(() => {
    cebufetchImages();
  }, []);
  useEffect(() => {
    clarkfetchImages();
  }, []);
  const [count, setcount] = useState([]);

  connection &&
    connection.on("message", (message) => {
      setcount(message);
    });

  useEffect(() => {
    isLoading(false);
    cebufetchImages();
  }, [count]);

  useEffect(() => {
    isLoading(false);
    clarkfetchImages();
  }, [count]);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="floorname1">
        {location === "clark"
          ? "CLARK URL " + clarkfloor
          : "CEBU URL " + cebufloor}
      </div>

      <div className="selectFloor1">
        <Box sx={{ minWidth: 120 }} key={"123"}>
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
                  </MenuItem>
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
      <Carousel
        fade
        interval={5000}
        pause={false}
        indicators={false}
        controls={false}
      >
        {items.map((item) => (
          <Carousel.Item key={item.ImageID}>
            <img
              src={item.ImageSrc}
              alt={item.title}
              style={{
                width: "100%",
                maxHeight: "100vh",
                height: "100%",
                minWidth: "100vh",
                objectFit: "fixed",
              }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}
export default ImageCarousel;
