import { BiCollapseAlt, BiExpandAlt } from 'react-icons/bi';

import { Button } from '@chakra-ui/react';

type CollapseButtonProps = {
  collapsed: boolean;
  onClick: () => void;
};

const CollapseButton = ({ collapsed, onClick }: CollapseButtonProps) => (
  <Button
    onClick={onClick}
    sx={{
      p: 0,
      bg: 'transparent',
      mr: 2,
      ml: 'auto',
      minHeight: 'initial',
      fontSize: 16,
      _hover: {
        bg: 'transparent'
      },
      '& .btn-icon': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '22px',
        height: '22px',
        borderRadius: 4,
        bg: 'white',
        color: 'black',
        mr: 1.5,
        '& > svg': {
          mr: 0
        }
      }
    }}
  >
    <span className='btn-icon'>
      {collapsed ? <BiExpandAlt size={20} /> : <BiCollapseAlt size={20} />}
    </span>
    <span>{collapsed ? 'Expand' : 'Collapse'}</span>
  </Button>
);

export default CollapseButton;
