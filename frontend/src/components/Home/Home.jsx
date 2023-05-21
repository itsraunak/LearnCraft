import {
  Button,
  Text,
  Heading,
  Link,
  Stack,
  VStack,
  Image,
  Box,
  HStack,
} from '@chakra-ui/react';
import React from 'react';
import './home.css';
import vg from '../../assets/images/bg.png';
import { CgGoogle, CgYoutube } from 'react-icons/cg';
import { SiCoursera, SiUdemy, SiUdacity } from 'react-icons/si';
import { DiAws } from 'react-icons/di';
import introVideo from '../../assets/videos/intro.mp4';

const Home = () => {
  return (
    <section className="home">
      <div className="container">
        <Stack
          direction={['column', 'row']}
          height="100%"
          justifyContent={['center', 'space-between']}
          alignItems="Center"
          spacing={['16', '56']}
        >
          <VStack
            width={'full'}
            alignItems={['center', 'flex-end']}
            spacing={'8'}
          >
            <Heading children="LEARN FORM THE EXPERTS" size={'2xl'}></Heading>
            <Text
              fontSize={'2xl'}
              fontFamily={'cursive'}
              textAlign={['center', 'left']}
              children="Find Valuable Content At Reasonable Price"
            ></Text>
            <Link to="/courses"></Link>
            <Button size={'lg'} colorScheme="yellow">
              Explore Now
            </Button>
          </VStack>

          <Image
            className="vector-graphics"
            boxSize={'md'}
            src={vg}
            objectFit={'contain'}
          />
        </Stack>
      </div>
      <Box padding={'8'} bg={'blackAlpha.800'}>
        <Heading
          textAlign={'center'}
          fontFamily={'body'}
          color={'yellow.400'}
          children="OUR BRANDS"
        ></Heading>
        <HStack
          className="brandBanner"
          justifyContent={'space-evenly'}
          marginTop={'5'}
        >
          <CgGoogle />
          <CgYoutube />
          <SiCoursera />
          <SiUdacity />
          <SiUdemy />
          <DiAws />
        </HStack>
      </Box>

      <div className="container2">
        <video
          autoPlay
          controls
          controlsList="nodownload nofullscreen"
          disablePictureInPicture
          disableRemotePlayback
          src={introVideo}
        ></video>
      </div>
    </section>
  );
};

export default Home;
