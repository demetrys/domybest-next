import {
  Image as ChakraImage,
  ImageProps as ChakraImageProps
} from '@chakra-ui/react';

type ImageProps = ChakraImageProps & {
  fillLayout?: boolean;
};

const Image = ({
  fillLayout = false,
  width,
  height,
  position,
  ...other
}: ImageProps) => {
  const props = {
    ...other,
    ...(fillLayout
      ? {
          position: 'absolute' as const,
          width: '100%',
          height: '100%'
        }
      : {
          width,
          height,
          position
        })
  };

  return <ChakraImage {...props} />;
};

export default Image;
