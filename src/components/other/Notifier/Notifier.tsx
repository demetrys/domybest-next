import { useEffect } from 'react';

import { useToast } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { closeNotifications } from 'store/reducers/notification';

const Notifier = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(
    (state) => state.notification.notifications
  );
  const toast = useToast();

  useEffect(() => {
    notifications.forEach((notification) => {
      toast({
        ...notification,
        duration: 5000,
        isClosable: true,
        position: 'top-right',
        onCloseComplete: () => dispatch(closeNotifications())
      });
    });
  }, [dispatch, notifications, toast]);

  return null;
};

export default Notifier;
