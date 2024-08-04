import React from 'react';
import Slider from 'react-slick';
import { Box } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import banner1 from '../imagesFront/banner1.png';
import banner2 from '../imagesFront/banner2.png';


const imageUrls = [banner1, banner2];


const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000, 
    arrows: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],

  };

  return (
    <Box sx={{ width: '100%' }}>
      <Slider {...settings}>
        {imageUrls.map((url, index) => (
          <Box key={index}>
            <img src={url} alt={`Slide ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Carousel;
