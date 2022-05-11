import { createContext, useReducer, useContext } from 'react';
import { toast } from 'react-toastify';
import { httpRequests } from '../../services/httpRequest';

const contactContext = createContext();
const contactDispatcherContext = createContext();

const reducer = (stat, { type, id, data }) => {
  switch (type) {
    case 'toggleContactItemSelectionStatus': {
      const allContacts = stat.allContacts.map((contact) => {
        if (contact.id === id) {
          contact = { ...contact, isSelected: !contact.isSelected };
        }
        return contact;
      });

      return { ...stat, allContacts };
    }

    case 'toggleSelectMode': {
      const unSelectedContacts = stat.allContacts.map((contact) => {
        return { ...contact, isSelected: false };
      });
      return {
        ...stat,
        allContacts: unSelectedContacts,
        isSelectModeOn: !stat.isSelectModeOn,
      };
    }

    case 'filterContacts': {
      if (data && (data !== stat.filterWord || stat.isSelectModeOn)) {
        const filteredList = stat.allContacts.filter(
          (contact) =>
            contact.name.includes(data) || contact.email.includes(data)
        );
        return {
          ...stat,
          filteredContacts: filteredList,
          filterWord: data,
        };
      }
      return {
        ...stat,
        filteredContacts: data ? stat.filteredContacts : stat.allContacts,
        filterWord: data,
      };
    }

    case 'deleteContact': {
      if (data < 300 && 199 < data) {
        const cleanedList = stat.allContacts.filter(
          (contact) => contact.id !== id
        );
        return { ...stat, allContacts: cleanedList };
      }
      return stat;
    }

    case 'LoadedMode': {
      return { ...stat, currentStatus: 'Loaded' };
    }

    case 'LoadingMode': {
      return { ...stat, currentStatus: 'Loading' };
    }

    case 'getData': {
      return {
        ...stat,
        allContacts: data,
        filteredContacts: data,
      };
    }

    default: {
      throw Error('unknown action in reducer');
    }
  }
};

const ContactProvider = ({ children }) => {
  const initValue = {
    allContacts: [],
    filteredContacts: [],
    currentStatus: 'Loading',
    filterWord: '',
    isSelectModeOn: false,
  };

  const [contactList, contactDispatcher] = useReducer(reducer, initValue);

  const asyncDispatcher = async ({ type, id, data }) => {
    switch (type) {
      case 'filterContacts': {
        if (contactList.isSelectModeOn) {
          contactDispatcher({ type: 'toggleSelectMode' });
        }
        contactDispatcher({ type: 'filterContacts', data });
        return;
      }

      case 'groupDelete': {
        contactDispatcher({ type: 'LoadingMode' });
        try {
          // better way to delete a group of contacts for real backend:
          // **********************************************************
          // let toBeDeleted = [];
          // for (let contact of contactList.allContacts) {
          //   if (contact.isSelected) {
          //     toBeDeleted.push(+contact.id);
          //   }
          // }
          // **********************************************************

          let deletedContactCounter = 0;
          for (let contact of contactList.allContacts) {
            if (contact.isSelected) {
              await httpRequests.deleteContact(contact.id);
              deletedContactCounter++;
            }
          }
          toast.info(`${deletedContactCounter} مخاطب حذف شد`, {
            toastId: 'info',
          });
        } catch (error) {
          toast.error('عدم اتصال به اینترنت', { toastId: 'error' });
        }

        try {
          contactDispatcher({ type: 'toggleSelectMode' });
          contactDispatcher({
            type: 'filterContacts',
            data: '',
          });
        } catch (error) {
          console.log(error);
        }

        return;
      }

      case 'toggleContactItemSelectionStatus': {
        contactDispatcher({ type: 'toggleContactItemSelectionStatus', id });
        contactDispatcher({
          type: 'filterContacts',
          data: contactList.filterWord,
        });

        return;
      }

      case 'toggleSelectMode': {
        contactDispatcher({ type: 'toggleSelectMode' });

        contactDispatcher({
          type: 'filterContacts',
          data: contactList.filterWord,
        });
        return;
      }

      case 'addContact': {
        try {
          await httpRequests.addNewContact(data);
          toast.info('مخاطب افزوده شد.');
        } catch (error) {
          toast.error('خطای اتصال به اینترنت!');
        }
        return;
      }
      case 'deleteContact': {
        try {
          contactDispatcher({ type: 'LoadingMode' });
          const res = await httpRequests.deleteContact(id);
          contactDispatcher({
            type: 'deleteContact',
            id,
            data: res.status,
          });
          contactDispatcher({ type: 'filterContacts', data });

          toast.info('مخاطب با موفقیت حذف شد.', {
            toastId: `info`,
          });
        } catch (err) {
          toast.error('عدم اتصال به اینترنت', { toastId: 'error' });
        }
        contactDispatcher({ type: 'LoadedMode' });

        return;
      }

      case 'getData': {
        try {
          contactDispatcher({ type: 'LoadingMode' });
          const res = await httpRequests.getAllContacts();
          contactDispatcher({ type: 'getData', data: res.data });
        } catch (err) {
          toast.error('عدم اتصال به اینترنت', { toastId: 'error' });
        }
        try {
          contactDispatcher({ type: 'LoadedMode' });
        } catch (err) {
          toast.error('عدم اتصال به اینترنت', { toastId: 'error' });
        }
        return;
      }

      default: {
        throw Error('unknown action in asyncDispatcher');
      }
    }
  };

  return (
    <contactContext.Provider value={contactList}>
      <contactDispatcherContext.Provider value={asyncDispatcher}>
        {children}
      </contactDispatcherContext.Provider>
    </contactContext.Provider>
  );
};

const useContactDispatcher = () => {
  const dispatch = useContext(contactDispatcherContext);
  if (dispatch) {
    return dispatch;
  }

  throw Error('contactDispatcherContext Context issue');
};

const useContact = () => {
  const contact = useContext(contactContext);
  if (contact) {
    return contact;
  }

  throw Error('contactContext Context issue');
};

export default ContactProvider;
export { useContactDispatcher, useContact };
