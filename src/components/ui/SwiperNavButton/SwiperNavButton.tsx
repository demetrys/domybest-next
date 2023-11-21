import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

import { IconButton } from '@chakra-ui/react';

/**
 * Prop - className:
 * To make button have unique class name, so that each Swiper instance
 * have reference to it's corresponding navigation.
 * Should be synced with the navigation prop passing in Swiper, e.g.
 * const prevBtnCN = 'swiper-button-prev-demand';
 * const nextBtnCN = 'swiper-button-next-demand';
 *
 * <Box>
 *   <Swiper
 *     navigation={{
 *       prevEl: `.${prevBtnCN}`,
 *       nextEl: `.${nextBtnCN}`
 *     }}
 *   >
 *      ...
 *  </Swiper>
 *  <SwiperNavButton type='prev' className={prevBtnCN}/>
 *  <SwiperNavButton type='next' className={nextBtnCN}/>
 * </Box
 *
 * With this approach we can move navigation elements outside of Swiper element,
 * and we will have more flexibility to place buttons where we need without
 * using position: 'absolute'
 * */

type SwiperNavButtonProps = {
  type: 'next' | 'prev';
  className: string;
  colorScheme?: 'blue' | 'white';
  isDisabled?: boolean;
};

const SwiperNavButton = ({
  type,
  className,
  colorScheme = 'white',
  isDisabled = false
}: SwiperNavButtonProps) => (
  <IconButton
    className={className}
    aria-label={type === 'next' ? 'Next slide' : 'Previous slide'}
    icon={type === 'next' ? <BsArrowRight /> : <BsArrowLeft />}
    isDisabled={isDisabled}
    sx={{
      bg: colorScheme === 'white' ? 'white' : 'whiteAlpha.200',
      color: colorScheme === 'white' ? 'blue.900' : 'white',
      _hover: {
        bg: colorScheme === 'white' ? 'blue.500' : 'white',
        color: colorScheme === 'white' ? 'white' : 'blue.900'
      },
      _active: {
        bg: colorScheme === 'white' ? 'white' : 'whiteAlpha.200',
        color: colorScheme === 'white' ? 'blue.900' : 'white'
      },
      _disabled: {
        opacity: 0.4,
        cursor: 'not-allowed',
        _hover: {
          bg: colorScheme === 'white' ? 'white' : 'whiteAlpha.200',
          color: colorScheme === 'white' ? 'blue.900' : 'white'
        }
      },
      '& svg': {
        width: 5,
        height: 5
      },
      '&.swiper-button-lock': {
        display: 'none'
      }
    }}
  />
);

export default SwiperNavButton;
