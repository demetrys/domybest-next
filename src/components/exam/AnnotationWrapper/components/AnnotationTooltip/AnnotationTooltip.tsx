import { Box, ListItem, UnorderedList } from '@chakra-ui/react';

import { useAppSelector } from 'store/hooks';
import { AnnotationType } from 'store/reducers/persistAnnotation';

type AnnotationTooltipProps = {
  type: AnnotationType;
};

const AnnotationTooltip = ({ type }: AnnotationTooltipProps) => {
  const {
    tooltip: {
      open,
      id,
      offset: { left, top }
    },
    annotations
  } = useAppSelector((state) => state.persistAnnotation);
  const annotation = annotations[type].find((item) => item.id === id);

  return (
    annotation &&
    Boolean(annotation.body.length) &&
    open && (
      <Box
        sx={{
          position: 'fixed',
          top: `${top - (annotation.body.length * 33 + 16)}px`,
          left: `${left}px`,
          zIndex: 11,
          bg: 'white',
          border: '2px solid black',
          borderRadius: 5,
          '& > ul': {
            px: 3
          }
        }}
      >
        <UnorderedList styleType='none' ml={0} py={1.5}>
          {annotation.body.map(({ value }) => (
            <ListItem
              key={value}
              fontWeight={500}
              py={1.5}
              sx={{
                '&:not(:last-of-type)': {
                  borderBottom: '1px solid',
                  borderColor: 'blackAlpha.600'
                }
              }}
            >
              {value}
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
    )
  );
};

export default AnnotationTooltip;
