import React from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';

const LinkButton = ({ url = '/', title = 'Home', onClose }) => (
  <Link onClick={onClose} to={url}>
    <Button variant={'ghost'}>{title}</Button>
  </Link>
);

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = {
    role: 'admin',
  };
  const isAuthenticated = true;
  const logoutHandler = () => {
    console.log('Logout');
    onClose();
  };

  return (
    <>
      <ColorModeSwitcher />

      <Button
        onClick={onOpen}
        colorScheme={'yellow'}
        width="12"
        height={'12'}
        rounded={'full'}
        zIndex={'overlay'}
        position={'fixed'}
        top={'6'}
        left={'6'}
      >
        <RiMenu5Fill />
      </Button>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={'1px'}>LEARN CRAFT</DrawerHeader>

          <DrawerBody>
            {/* prettier-ignore */}
            <VStack spacing={'4'} alignItems={'flex-start'}>
              <LinkButton onClose={onClose} url="/" title="Home" />
              <LinkButton onClose={onClose} url="/courses" title="Browse All Courses" />
              <LinkButton onClose={onClose} url="/request" title="Request a Course" />
              <LinkButton onClose={onClose} url="/contact" title="Contact Us" />
              <LinkButton onClose={onClose} url="/about" title="About" />
            </VStack>

            <HStack
              justifyContent={'space-evenly'}
              position={'absolute'}
              bottom={'2rem'}
              width={'80%'}
            >
              {isAuthenticated ? (
                <>
                  <VStack>
                    <HStack>
                      <Link to="/profile">
                        <Button variant={'ghost'} colorScheme={'yellow'}>
                          Profile
                        </Button>
                        <Button variant={'ghost'} onClick={logoutHandler}>
                          <RiLogoutBoxLine />
                          Logout
                        </Button>
                      </Link>
                    </HStack>
                    {user && user.role === 'admin' && (
                      <Link to="/admin/dashboard" onClose={onClose}>
                        <Button colorScheme="purple" variant={'ghost'}>
                          <RiDashboardFill style={{ margin: '4px' }} />
                          Dashboard
                        </Button>
                      </Link>
                    )}
                  </VStack>
                </>
              ) : (
                <>
                  <Link to="/login" onClose={onClose}>
                    <Button colorScheme={'yellow'}>Login</Button>
                  </Link>

                  <p>OR</p>

                  <Link to="/register" onClose={onClose}>
                    <Button colorScheme={'yellow'}>Sign Up</Button>
                  </Link>
                </>
              )}
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
