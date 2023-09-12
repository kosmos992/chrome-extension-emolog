import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface InitialModalState {
  modalType: string;
  isOpen: boolean;
}

const initialState: InitialModalState = {
  modalType: '',
  isOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, actions) => {
      const { modalType } = actions.payload;
      state.modalType = modalType;
      state.isOpen = true;
    },
    closeModal: state => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectModal = (state: RootState) => state.modal;

export default modalSlice.reducer;
