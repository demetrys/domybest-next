import { IconButton } from '@chakra-ui/react';

import CollapseIcon from 'assets/icons/collapse.svg';
import ExpandIcon from 'assets/icons/expand.svg';

type ExpandButtonProps = {
  panel: 'question' | 'passage';
  expandedPanel: 'none' | 'question' | 'passage';
  className?: string;
  onClick: () => void;
};

const ExpandButton = ({
  panel,
  className,
  expandedPanel,
  onClick
}: ExpandButtonProps) => (
  <IconButton
    className={className}
    aria-label='expand'
    position='absolute'
    top={0}
    minWidth={8}
    minHeight={8}
    bg='white'
    border='1px solid rgba(153, 153, 153, 0.4)'
    boxShadow='0 2px 8px 1px rgba(0, 0, 0, 0.2)'
    zIndex={1}
    onClick={onClick}
    sx={{
      left: panel === 'question' ? 4 : 'initial',
      right: panel === 'passage' ? 4 : 'initial',
      '& > svg': {
        width: 6,
        height: 6,
        fill: '#999999',
        transform: panel === 'passage' ? 'scale(-1) rotate(-90deg)' : 'initial'
      }
    }}
    _hover={{
      bg: 'white'
    }}
  >
    {(panel === 'passage' && expandedPanel === 'passage') ||
    (panel === 'question' && expandedPanel === 'question') ? (
      <CollapseIcon />
    ) : (
      <ExpandIcon />
    )}
  </IconButton>
);

export default ExpandButton;
