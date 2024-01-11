import { FC } from 'react';
import ContactItem from '../ContactItem';
import { Contact } from '../../redux/contactsSlice';
import Notification from '../Notification';
import { useAppSelector } from '../../redux/hooks';
import { getContacts, getFilter } from '../../redux/selectors';

const ContactList: FC = () => {
  const filter = useAppSelector(getFilter);
  const contacts = useAppSelector(getContacts);
  const normalizedFilter: string = filter.value.toLowerCase();

  const getVisibleContacts: Contact[] = contacts.items.filter(({ name }) =>
    name?.toLowerCase()?.includes(normalizedFilter)
  );

  return (
    <div className='w-[500px] p-4 flex flex-col justify-center items-center shadow-xl rounded-lg bg-lightBlue'>
      <h2 className='mb-4 text-5xl font-bold text-deepBlue'>Contacts</h2>
      {contacts.items.length > 0 ? (
        <ul className='w-full p-4 flex flex-col justify-center items-center gap-4'>
          {getVisibleContacts.map(({ id, name, number }) => (
            <ContactItem key={id} id={id} name={name} number={number} />
          ))}
        </ul>
      ) : (
        <Notification message="There is no contact in Phonebook" />
      )}
    </div>
  );
};

export default ContactList;
