import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import Sidebar from '../Sidebar';
import cursor from '../../../assets/images/cursor.png';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import CourseModal from './CourseModal';

const AdminCourses = () => {
  const courses = [
    {
      _id: 'fashdfjasdhjgbsakjdng',
      title: 'React Course',
      category: 'Web development',
      role: 'admin',
      poster: {
        url: 'https://neural.love/cdn/thumbnails/1ed7adcd-17d6-6dde-96a6-1d666bffeb02/41fee43b-626b-5afe-acd9-4700b554b1bb.webp?Expires=1735689599&Signature=bJwo6BEiUGQ9AIFqQvPFwDHAbHiaQs6RpCfbONqYIX8e2Bo-CmLrFDM3Ym~bwRcVSkvjngBCa78sfSdlSAX-LMCItCKxf5CYCvK5QVtTL-Rnca6eRqsZIN7h4jiReCzGb6FVFACpHM9v0sIhRLST0T-4V3ZjH6k0yBJCtWX910oveb0To60hB2Lv~trhoN1bdC50Yx~Prn7PkiSH5UIA9cRu21V9fmulUQpu0-y~NEXSbIvQ7ZNj~gXYBphDxtdH9yEAdTyOV~UiqM0lAmsBKFG2tKZhEXVJIgShje0btidue71zhxTgnaZvY5y0kwLjQNf5KQ0dZhFIPyOzYyMF~A__&Key-Pair-Id=K2RFTOXRBNSROX',
      },
      createdBy: 'Raunak Kumar Sah',
      Views: 123,
      numOfVideos: 12,
    },
  ];

  const courseDetailsHandler = userId => {
    onOpen();
  };

  const deleteButtonHandler = userId => {
    console.log(userId);
  };

  const deleteLectureButtonHandler = (courseId, lectureId) => {
    console.log(courseId);
    console.log(lectureId);
  };

  const addLectureHandler = (e, courseId, title, description, video) => {
    e.preventDefault();
  };

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Grid
      css={{
        cursor: `url(${cursor}), default`,
      }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      <Box p={['0', '8']} overflowX={'auto'}>
        <Heading
          textTransform={'uppercase'}
          children="All Courses"
          my={'16'}
          textAlign={['center', 'left']}
        />

        <TableContainer w={['100vw', 'full']}>
          <Table varient="simple" size="lg">
            <TableCaption>All available courses in the database</TableCaption>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Poster</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Created By</Th>
                <Th isNumeric>Views</Th>
                <Th isNumeric>Lectures</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>

            <Tbody>
              {courses.map(item => (
                <Row
                  courseDetailsHandler={courseDetailsHandler}
                  deleteButtonHandler={deleteButtonHandler}
                  key={item._id}
                  item={item}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <CourseModal
          isOpen={isOpen}
          onClose={onClose}
          id={'afkdasfddkajs'}
          courseTitle="React Course"
          deleteButtonHandler={deleteLectureButtonHandler}
          addLectureHandler={addLectureHandler}
        />
      </Box>
      <Sidebar />
    </Grid>
  );
};

function Row({ item, courseDetailsHandler, deleteButtonHandler }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>{item.title}</Td>
      <Td>
        <Image src={item.poster.url} />
      </Td>
      <Td textTransform={'uppercase'}>{item.category}</Td>
      <Td>{item.createdBy}</Td>
      <Td isNumeric>{item.Views}</Td>
      <Td isNumeric>{item.numOfVideos}</Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            onClick={() => courseDetailsHandler(item._id)}
            varient={'outline'}
            color={'purple.500'}
          >
            View Lectures
          </Button>
          <Button
            onClick={() => deleteButtonHandler(item._id)}
            color={'purple.600'}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}

export default AdminCourses;
