import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';

const Course = ({
  views,
  title,
  imagesrc,
  id,
  addtoPlaylistHandler,
  creator,
  description,
  lecture,
}) => {
  return (
    <VStack className="course" alignItems={['center', 'flex-start']}>
      <Image src={imagesrc} boxSize={60} objectFit={'contain'} />
      <Heading
        textAlign={['center', 'left']}
        maxWidth="200px"
        size={'sm'}
        fontFamily={'sans-serif'}
        noOfLines={3}
        children={title}
      />
      <Text noOfLines={2} children={description} />

      <HStack>
        <Text
          fontWeight={'bold'}
          textTransform={'uppercase'}
          children={'Creator'}
        />
        <Text
          fontFamily={'body'}
          textTransform={'uppercase'}
          children={creator}
        />
      </HStack>

      <Heading
        textAlign={'center'}
        size={'xs'}
        children={`Lectures - ${lecture}`}
        textTransform={'uppercase'}
      />
      <Heading
        size={'xs'}
        children={`Views - ${views}`}
        textTransform={'uppercase'}
      />

      <Stack direction={['column', 'row']} alignItems={'center'}>
        <Link to={`/course/${id}`}>
          <Button colorScheme={'yellow'}>Watch Now</Button>
        </Link>
        <Button
          variant={'ghost'}
          colorScheme={'yellow'}
          onClick={() => {
            addtoPlaylistHandler(id);
          }}
        >
          Add to Playlist
        </Button>
      </Stack>
    </VStack>
  );
};

const Courses = () => {
  const [keyword, setKeyword] = useState('');
  const [catagory, setCategory] = useState('');
  const addtoPlaylistHandler = () => {
    console.log('Added to Playlist');
  };
  const catagories = [
    'Web Development',
    'Artificial Intellegence',
    'Data Structue & Algorithms',
    'App Developement',
    'Data Science',
    'Game Development',
  ];
  return (
    <Container minH={'95vh'} maxW={'container.lg'} paddingY={'8'}>
      <Heading children="All Courses" m={'8'} />

      <Input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="Search a course ...."
        type={'text'}
        focusBorderColor="yellow.500"
      />

      <HStack
        overflowX={'auto'}
        paddingY={'8'}
        css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {catagories.map((item, index) => (
          <Button key={index} onClick={() => setCategory(item)} minW={'60'}>
            <Text children={item} />
          </Button>
        ))}
      </HStack>

      <Stack
        direction={['column', 'row']}
        flexWrap={'wrap'}
        justifyContent={['flex-start', 'space-evenly']}
        alignItems={['center', 'flex-start']}
      >
        <Course
          title={'sample'}
          description={'Sample'}
          views={23}
          imagesrc={
            'https://neural.love/cdn/thumbnails/1ed7adcd-17d6-6dde-96a6-1d666bffeb02/41fee43b-626b-5afe-acd9-4700b554b1bb.webp?Expires=1735689599&Signature=bJwo6BEiUGQ9AIFqQvPFwDHAbHiaQs6RpCfbONqYIX8e2Bo-CmLrFDM3Ym~bwRcVSkvjngBCa78sfSdlSAX-LMCItCKxf5CYCvK5QVtTL-Rnca6eRqsZIN7h4jiReCzGb6FVFACpHM9v0sIhRLST0T-4V3ZjH6k0yBJCtWX910oveb0To60hB2Lv~trhoN1bdC50Yx~Prn7PkiSH5UIA9cRu21V9fmulUQpu0-y~NEXSbIvQ7ZNj~gXYBphDxtdH9yEAdTyOV~UiqM0lAmsBKFG2tKZhEXVJIgShje0btidue71zhxTgnaZvY5y0kwLjQNf5KQ0dZhFIPyOzYyMF~A__&Key-Pair-Id=K2RFTOXRBNSROX'
          }
          id={'Sample'}
          creator={'Sample Boy'}
          lecture={'2'}
          addtoPlaylistHandler={addtoPlaylistHandler}
        />
      </Stack>
    </Container>
  );
};

export default Courses;
