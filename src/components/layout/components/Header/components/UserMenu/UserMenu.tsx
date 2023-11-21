import { PropsWithChildren } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

import { Box, Image, Menu, MenuButton, MenuList } from '@chakra-ui/react';

type UserMenuProps = PropsWithChildren & {
  username: string;
  avatar?: string;
};

const UserMenu = ({ username, avatar, children }: UserMenuProps) => (
  <Box
    minWidth={180}
    _hover={{
      borderColor: 'blue.200',
      '& .chakra-menu__menu-list': {
        borderColor: 'blue.200'
      },
      '& .chakra-menu__menu-button': {
        borderColor: 'blue.200'
      },
      '& .chakra-menu__menuitem': {
        color: 'blue.700',
        px: {
          base: 2,
          md: 3
        },
        py: {
          base: 1,
          md: 1.5
        }
      }
    }}
  >
    <Menu autoSelect={false} matchWidth gutter={0}>
      {({ isOpen }) => (
        <>
          <MenuButton
            color='blue.700'
            bg='white'
            borderColor='blue.50'
            py={{
              base: 1,
              md: 2
            }}
            px={{
              base: 1.5,
              md: 5
            }}
            borderRadius={{
              base: 17,
              md: 23
            }}
            borderBottomLeftRadius={{
              base: isOpen ? 0 : 17,
              md: isOpen ? 0 : 23
            }}
            borderBottomRightRadius={{
              base: isOpen ? 0 : 17,
              md: isOpen ? 0 : 23
            }}
            sx={{
              '& > span': {
                display: 'flex',
                alignItems: 'center',
                '& .avatar': {
                  width: {
                    base: 6,
                    md: 7
                  },
                  height: {
                    base: 6,
                    md: 7
                  },
                  mr: 2,
                  '& > svg': {
                    width: '100%',
                    height: '100%',
                    fill: 'blue.200'
                  }
                },
                '& > .chakra-image': {
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  mr: 2
                },
                '& > .text': {
                  mr: 2,
                  fontSize: {
                    base: '12px',
                    md: '14px'
                  }
                },
                '& > svg': {
                  ml: 'auto'
                }
              }
            }}
          >
            {avatar ? (
              <Image src={avatar} alt={username} />
            ) : (
              <span className='avatar'>
                <FaUserCircle />
              </span>
            )}
            <span className='text'>{username}</span>
            {isOpen ? <FiChevronUp /> : <FiChevronDown />}
          </MenuButton>
          <MenuList
            border='1px solid'
            borderColor='blue.50'
            bg='white'
            borderTop='none'
            py={{
              base: 1.5,
              md: 2
            }}
            px={{
              base: 0,
              md: 1.5
            }}
            borderBottomLeftRadius={{
              base: 17,
              md: 23
            }}
            borderBottomRightRadius={{
              base: 17,
              md: 23
            }}
            sx={{
              '& > a': {
                width: '100%',
                py: {
                  base: 1,
                  md: 1.5
                },
                px: {
                  base: 2,
                  md: 3
                },
                '&.active-link': {
                  fontWeight: 500
                }
              }
            }}
          >
            {children}
          </MenuList>
        </>
      )}
    </Menu>
  </Box>
);

export default UserMenu;
