import { SystemStyleObject } from '@chakra-ui/react';

const styles: SystemStyleObject = {
  height: '100%',
  '& .r6o-content-wrapper': {
    height: '100%'
  },

  '&.open-editor': {
    '& .r6o-editor': {
      display: 'flex'
    }
  },
  '& .r6o-relations-layer': {
    display: 'none'
  },
  '& .content': {
    height: '100%',
    margin: '-30px -40px',
    padding: '30px 40px',
    _selection: {
      bg: '#B4D5FE'
    }
  },
  '& .r6o-selection': {
    bg: '#B4D5FE',
    _selection: {
      bg: '#B4D5FE'
    }
  },
  '& .r6o-annotation': {
    bg: 'examYellow.200',
    borderBottom: '1px dashed #222',
    cursor: 'pointer',
    _hover: {
      bg: 'examYellow.600'
    }
  },
  '& .r6o-editor': {
    display: 'none',
    fontFamily: 'var(--chakra-fonts-exam)',
    position: 'fixed',
    top: 'initial !important',
    bottom: 0,
    left: '0 !important',
    right: 0,
    width: '100vw',
    minHeight: 275,
    flexDirection: 'column',
    zIndex: 11
  },
  '& .r6o-arrow': {
    height: 45,
    px: 8,
    py: '13px',
    bg: 'black',
    position: 'relative',
    '&::before': {
      content: '"New Annotation"',
      position: 'absolute',
      top: '13px',
      left: 8,
      color: 'white',
      lineHeight: '19px',
      fontSize: 16,
      fontWeight: 600
    }
  },
  '& .r6o-editor-inner': {
    display: 'flex',
    flexDirection: 'column',
    mt: 'auto',
    bg: 'examGray.200',
    px: 8,
    py: 4
  },
  '& .r6o-widget': {
    '&.r6o-tag': {
      position: 'relative',
      order: -1,
      mb: 3,
      height: 8,
      '&::before': {
        content: '"Highlight Color:"',
        position: 'absolute',
        top: '50%',
        left: 0,
        transform: 'translateY(-50%)',
        color: 'black',
        fontSize: 16,
        fontWeight: 600
      },
      '&:after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        left: '130px',
        transform: 'translateY(-50%)',
        width: 6,
        height: 6,
        borderRadius: '50%',
        bg: 'examYellow.200'
      },
      '& .r6o-autocomplete': {
        position: 'absolute',
        height: '100%',
        width: '25%',
        left: '25%',
        '&::before': {
          content: '""',
          position: 'absolute',
          left: '138px',
          top: '24px',
          width: '5px',
          height: '2px',
          bg: 'black',
          zIndex: 1
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          left: '146px',
          top: '24px',
          width: '4px',
          height: '2px',
          bg: 'black',
          zIndex: 1
        },
        '& > div': {
          display: 'block',
          position: 'absolute',
          left: 0,
          width: '100%',
          height: '100%',
          '&::before': {
            content: '"Underline style:"',
            position: 'absolute',
            top: '50%',
            left: 0,
            transform: 'translateY(-50%)',
            color: 'black',
            fontSize: 16,
            fontWeight: 600
          },
          '&:after': {
            content: '"U"',
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            top: '50%',
            left: '130px',
            transform: 'translateY(-50%)',
            width: 6,
            height: 6,
            borderRadius: 5,
            bg: 'white',
            fontSize: 18,
            fontWeight: 600,
            border: '2px solid black'
          }
        },

        '& *': {
          display: 'none'
        }
      }
    },
    '&.comment': {
      position: 'relative',
      py: 1.5,
      width: '100%',
      maxWidth: '1558px',
      '& textarea': {
        fontSize: 16,
        width: '100%',
        color: 'black',
        height: 'auto !important',
        fontWeight: 500,
        bg: 'transparent'
      },
      '& .r6o-icon': {
        content: '""',
        position: 'absolute',
        top: 2,
        right: 0,
        width: 4,
        height: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid',
        borderColor: 'examGray.400',
        cursor: 'pointer',
        borderRadius: 3,
        '& svg': {
          width: 4,
          height: 4
        }
      },
      '& .r6o-comment-dropdown-menu': {
        position: 'absolute',
        right: 0,
        top: 6,
        transform: 'translateX(40%)',
        width: 20,
        pl: 0,
        bg: 'white',
        zIndex: 1,
        borderRadius: 5,
        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
        overflow: 'hidden',
        '& li': {
          padding: 2,
          cursor: 'pointer',
          fontSize: 'sm',
          fontWeight: 500,
          listStyleType: 'none',
          bg: 'transparent',
          _hover: {
            bg: 'rgba(68, 129, 198, 0.2)'
          }
        }
      }
    },
    '&.editable': {
      '& textarea': {
        height: '135px !important',
        width: '100%',
        maxWidth: '1558px',
        p: 3,
        border: '1px solid black',
        fontSize: 16,
        color: 'black'
      },
      '& .r6o-icon': {
        display: 'none'
      }
    }
  },
  '& .r6o-footer': {
    display: 'flex',
    gap: 5,
    '& .r6o-btn:not(.outline, .delete-annotation)': {
      position: 'relative',
      py: 2,
      px: '26px',
      boxShadow: 'none',
      minHeight: 9,
      fontSize: 'sm',
      bg: 'examBlue.400',
      color: 'transparent',
      borderRadius: 20,
      minWidth: 20,
      '&::before': {
        content: '"Save"',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        fontSize: 'sm',
        fontWeight: 600,
        lineHeight: 1
      }
    },
    '& .r6o-btn.outline': {
      order: 1,
      p: '6px 12px',
      borderRadius: 5,
      minHeight: 8,
      bg: 'transparent',
      color: 'black',
      fontWeight: 600,
      fontSize: 'sm',
      _hover: { bg: '#0000000d' }
    },
    '& .r6o-btn.delete-annotation': {
      position: 'relative',
      order: '1',
      p: '6px 12px',
      borderRadius: 5,
      minHeight: 8,
      bg: 'transparent',
      color: 'red.800',
      fontWeight: 600,
      minWidth: 20,
      '&::before': {
        content: '"Delete"',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-45%)',
        left: 7,
        fontSize: 14
      },
      '& svg': {
        height: 4,
        width: 'auto'
      }
    }
  }
};

export default styles;
