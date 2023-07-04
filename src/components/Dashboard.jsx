import { Container } from '@mui/system';
import React from 'react'
import SideNav from '../SideNav';
import ImageCarousel from '../components/ImageCarousel';

function Dashboard() {
  return (
    
    <>
    
    <SideNav/>
   
    <Container sx={{backgroundSize:'cover',width:"100%", height:'100%'}}>
   
  
        <ImageCarousel/>
      </Container>
  

 
  </>
  
  )
}

export default Dashboard
