//imports
import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType,
} from "@microsoft/signalr";
//create a function that render images in slideshow
function ImageSlides() {
  const [items, setItems] = useState([]);
  const [connection, setConnection] = useState();


//create a function that fetch images from the server
  const cebufetchImages = async () => {
    const cebufloor = new URLSearchParams(window.location.search).get("cebufloor");
    await axios
      .get(`https://localhost:44313/api/CebuImage?cebufloor=${cebufloor}`)
      .then((res) => {
        console.log(res);
        setItems([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const clarkfetchImages = async () => {
    const clarkfloor = new URLSearchParams(window.location.search).get("clarkfloor");
    await axios
      .get(`https://localhost:44313/api/ClarkImage?clarkfloor=${clarkfloor}`)
      .then((res) => {
        console.log(res);
        setItems([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect( () => {

    const loadData= async() => 
    {
   
   const socketConnection = new HubConnectionBuilder()
     .configureLogging(LogLevel.Debug)
     .withUrl("https://localhost:44313/imageHub", {
       skipNegotiation: true,
       transport: HttpTransportType.WebSockets
     })
     .build();
   await socketConnection.start();
   setConnection(socketConnection);
    };
    loadData();
 }, []);

  // Promise.all([
  //     fetch('https://localhost:44313/api/ClarkImage?clarkfloor=10')
  //     .then(resp => resp.json()),
  //     fetch('https://localhost:44313/api/CebuImage?cebufloor=10')
  //     .then(resp => resp.json()),
  // ]).then(console.log)
  useEffect(() => {

    cebufetchImages();

  }, []);

 useEffect(() => {

  clarkfetchImages();
  
    
  }, []);

  // useEffect(() => {
  //   clarkfetchImages();
          
  
  // }, []);

const [count,setcount] = useState([]);

  connection &&
    connection.on("message", (message) => {
      setcount(message);
      
    });

    useEffect(() => {
  cebufetchImages();
  
      
    }, [count]);

    useEffect(() => { 
      clarkfetchImages();
          
        }, [count]);
  return (
    <Carousel
    
      fade
      interval={5000}
      pause={false}
      indicators={false}
      controls={false}
    >
      {items.map((item) => (
        <Carousel.Item key={item.imageKey}>
          <img
            src={item.ImageSrc}
            alt={item.title}
            style={{
              width: "100%",
              minHeight: "100vh",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
export default ImageSlides;
