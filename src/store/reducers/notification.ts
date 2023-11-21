import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UseToastOptions } from '@chakra-ui/react';

type NotificationType = {
  status: UseToastOptions['status'];
  title: string;
};

export type NotificationStore = {
  notifications: NotificationType[];
};

const initialState: NotificationStore = {
  notifications: []
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    openSuccessNotification: (state, action: PayloadAction<string>) => {
      state.notifications[0] = {
        status: 'success',
        title: action.payload
      };
    },
    openErrorNotification: (state, action: PayloadAction<string>) => {
      state.notifications[0] = {
        status: 'error',
        title: action.payload
      };
    },
    closeNotifications: (state) => {
      state.notifications = [];
    }
  }
});

export const {
  openSuccessNotification,
  openErrorNotification,
  closeNotifications
} = notificationSlice.actions;

export default notificationSlice.reducer;
