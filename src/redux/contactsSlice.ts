import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export type Contact = {
  id: string;
  name: string;
  number: string;
}

export type Data = {
  name: string;
  number: string;
}

type ContactsState = {
  items: Contact[];
}

const initialState: ContactsState = {
  items: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: {
      reducer(state, action: PayloadAction<Contact>) {
        state.items.push(action.payload);
      },
      prepare(data: Data) {
        const { name, number } = data;
        return {
          payload: {
            id: nanoid(),
            name,
            number,
          },
        };
      },
    },
    deleteContact(state, action: PayloadAction<string>) {
      const index: number = state.items.findIndex(
        contact => contact.id === action.payload
      );
      state.items.splice(index, 1);
    },
  },
});

const persistConfig = {
  key: 'contacts',
  storage,
};

export const contactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);
export const { addContact, deleteContact } = contactsSlice.actions;
