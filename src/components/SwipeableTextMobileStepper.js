import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Landing1 from '../uploads/mbgspcar.jpg';
// import Landing2 from '../uploads/landing2.jpg';


const images = [
  {
    imgPath:
      Landing1,
  },
  // {
  //   imgPath:
  //     Landing2,
  // }
];

function SwipeableTextMobileStepper() {
  const [isNight, setIsNight] = React.useState(false);

     
  React.useEffect(() => {
    const date = new Date();
    const showTime = date.getHours();
    setIsNight(showTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          height : '100%',
          display: 'flex',
          alignItems: 'center',
          bgcolor: 'background.default',
        }}
      >
      </Paper>
      {
        isNight > 17 ?
        <React.Fragment>
        <Box
          component="img"
          sx={{
            display: 'block',
            overflow: 'hidden',
            width: '100%',
            objectFit : 'cover',
            height: '100vh'
          }}
          src={images[0].imgPath}
          alt={"Night"}
        />

        </React.Fragment> :

        <React.Fragment>
        <Box
          component="img"
          sx={{
            display: 'block',
            overflow: 'hidden',
            width: '100%',
            objectFit : 'cover',
            height: '100vh'
          }}
          src={images[1].imgPath}
          alt={"Morning"}
        />
        </React.Fragment>
      }
        </Box>
       
  );
}

export default SwipeableTextMobileStepper;
