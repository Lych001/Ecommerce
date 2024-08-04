import React from 'react'
import Carousel from './Carousel'
import BestProducts from './BestProducts'
import RecentProducts from './RecentProducts'
import { Container } from '@mui/material'

function Home() {
  return (
    <Container sx={{width:'100%'}}>
      <Carousel />
      <BestProducts />
      <RecentProducts />
    </Container>
  )
}

export default Home