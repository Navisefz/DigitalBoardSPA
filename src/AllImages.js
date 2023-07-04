import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType,
} from "@microsoft/signalr";
const AllImages = () => {
  const [items, setItems] = useState([]);
  const [connection, setConnection] = useState();
  
    const fetchData = async () => {
     
      try {
        const cebuResponse = await axios.get(`https://localhost:44313/api/CebuImage/GetAllCebuImages`);
        const clarkResponse = await axios.get(`https://localhost:44313/api/ClarkImage/GetAllClarkImages`);

        const combinedImages = [...cebuResponse.data, ...clarkResponse.data];
       setItems(combinedImages);
       
      } catch (error) {
        console.log(error);
      }
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
  

  

  const [count,setcount] = useState([]);

  connection &&
    connection.on("message", (message) => {
      setcount(message);
      
    });

    useEffect(() => {
    fetchData()
      
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
  )
};

export default AllImages;
