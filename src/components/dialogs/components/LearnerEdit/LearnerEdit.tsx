import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';

import {
  Box,
  Button,
  Center,
  Checkbox,
  Grid,
  GridItem,
  IconButton,
  Text
} from '@chakra-ui/react';

import {
  // useAppDispatch,
  useAppSelector
} from 'store/hooks';

// import { learnerCheckIn } from 'store/actions/inPersonTests';
import { getSelectOptions } from 'utils/tests';

import { AbsenceStatus, SelectOptions } from 'types/global';
import { Device } from 'types/models';

import { Select, TextField } from 'components/ui';

const presenceOptions: SelectOptions[] = [
  { value: '', label: 'Unknown' },
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' }
];

type FormFields = {
  absence_status?: AbsenceStatus;
  extended_time: boolean;
  notes: string;
  device_name?: string;
  device_status?: string;
};

const LearnerEdit = () => {
  // const dispatch = useAppDispatch();
  const {
    learner: {
      first_name,
      last_name,
      absence_status,
      extended_time,
      notes,
      devices,
      enrollment_id,
      id
    }
  } = useAppSelector((state) => state.learners);

  const { control, handleSubmit } = useForm<FormFields>({
    defaultValues: {
      absence_status: absence_status || undefined,
      extended_time: extended_time || false,
      notes: notes || '',
      device_name: '',
      device_status: ''
    }
  });

  const onLearnerSave = (data: FormFields) => {
    const checkInData = {
      ...data,
      enrollment_id,
      id
    };
    console.log(checkInData, 'checkInData on save');
    // dispatch(learnerCheckIn('1'));
  };

  const deviceNameOptions = useMemo(
    () =>
      devices
        ? getSelectOptions(devices, {
            value: 'name',
            label: 'name'
          })
        : [],
    [devices]
  );

  const deviceStatusOptions = useMemo(
    () => [
      { value: 'borrowed', label: 'Borrowed' },
      { value: 'returned', label: 'Returned' }
    ],
    []
  );

  return (
    <form onSubmit={handleSubmit(onLearnerSave)} noValidate>
      <Grid
        gap={4}
        gridTemplateColumns={{ md: 'repeat(6, 1fr)' }}
        alignItems={{ md: 'flex-end' }}
      >
        <GridItem gridColumn={{ md: 'span 3' }}>
          <TextField value={first_name || ''} label='First Name' isReadOnly />
        </GridItem>
        <GridItem gridColumn={{ md: 'span 3' }}>
          <TextField value={last_name || ''} label='Last Name' isReadOnly />
        </GridItem>
        <GridItem gridColumn={{ md: 'span 3' }}>
          <Controller
            name='absence_status'
            control={control}
            render={({ field: { ref, value, onChange, ...other } }) => (
              <Select
                {...other}
                options={presenceOptions}
                onChange={(option) => onChange((option as SelectOptions).value)}
                label='Present'
                placeholder='Choose the option'
                colorScheme='lightBlue'
              />
            )}
          />
        </GridItem>
        <GridItem gridColumn={{ md: 'span 3' }}>
          <Controller
            name='extended_time'
            control={control}
            render={({ field: { ref, value, ...other } }) => (
              <Checkbox {...other} defaultChecked={!!value} mb={{ md: '10px' }}>
                50% Extended Time
              </Checkbox>
            )}
          />
        </GridItem>
        <GridItem gridColumn='span 6'>
          <Controller
            name='notes'
            control={control}
            render={({ field: { ref, ...other } }) => (
              <TextField {...other} label="Proctor's comment" />
            )}
          />
        </GridItem>
        <GridItem gridColumn='span 6'>
          <Text color='blue.700' fontWeight={500}>
            Technology loaned out:
          </Text>
          <Grid
            gap={4}
            mt={4}
            gridTemplateColumns={{ md: '3fr 2fr 1fr' }}
            alignItems={{ md: 'flex-end' }}
          >
            <GridItem>
              <Controller
                name='device_name'
                control={control}
                render={({ field: { ref, value, onChange, ...other } }) => (
                  <Select
                    {...other}
                    options={deviceNameOptions}
                    placeholder='Device type & Serial number'
                    colorScheme='lightBlue'
                  />
                )}
              />
            </GridItem>
            <GridItem>
              <Controller
                name='device_status'
                control={control}
                render={({ field: { ref, value, onChange, ...other } }) => (
                  <Select
                    {...other}
                    options={deviceStatusOptions}
                    placeholder='Status'
                    colorScheme='lightBlue'
                  />
                )}
              />
            </GridItem>
            <GridItem>
              <Button colorScheme='light'>Add</Button>
            </GridItem>
          </Grid>
          {devices?.map((device: Device) => (
            <Grid
              key={device.name}
              gap={4}
              mt={4}
              gridTemplateColumns={{ md: '3fr 2fr 1fr' }}
              alignItems={{ md: 'flex-end' }}
            >
              <GridItem>{device.name}</GridItem>
              <GridItem>{device.status}</GridItem>
              <GridItem>
                <Center
                  width={{ md: 100 }}
                  color='blue.700'
                  sx={{ '& > button': { width: 5, height: 5 } }}
                >
                  <IconButton
                    aria-label='delete device'
                    minH={5}
                    minW={5}
                    bg='transparent'
                    color='blue.700'
                    onClick={() => {}}
                  >
                    <MdClose size='100%' />
                  </IconButton>
                </Center>
              </GridItem>
            </Grid>
          ))}
        </GridItem>
      </Grid>
      <Box mt={{ base: 5, md: '30px' }}>
        <Button type='submit'>Save changes</Button>
      </Box>
    </form>
  );
};

export default LearnerEdit;
