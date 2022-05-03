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
      if (data && data !== stat.filterWord) {
        const filteredList = stat.allContacts.filter((contact) =>
          contact.name.includes(data)
        );
        return {
          ...stat,
          filteredContacts: filteredList,
        };
      }
      return {
        ...stat,
        filteredContacts: stat.allContacts,
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
      case 'groupDelete': {
        contactDispatcher({ type: 'LoadingMode' });
        try {
          for (let contact of contactList.allContacts) {
            if (contact.isSelected) {
              await httpRequests.deleteContact(contact.id);
            }
          }
        } catch (error) {
          toast.error(error.message, { toastId: 'groupDelete' });
        }

        try {
          contactDispatcher({ type: 'toggleSelectMode' });
        } catch (error) {
          console.log(error);
        }

        return;
      }

      case 'toggleContactItemSelectionStatus': {
        contactDispatcher({ type: 'toggleContactItemSelectionStatus', id });
        contactDispatcher({ type: 'filterContacts', data });

        return;
      }

      case 'toggleSelectMode': {
        contactDispatcher({ type: 'toggleSelectMode' });
        contactDispatcher({ type: 'filterContacts', data });
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
        } catch (err) {
          toast.error(`${err}`, { toastId: `delete${id}` });
        }
        try {
          contactDispatcher({ type: 'filterContacts', data });
          contactDispatcher({ type: 'LoadedMode' });
          toast.info('Contact deleted successfully. ', {
            toastId: `deleteSucceed${id}`,
          });
        } catch (err) {
          console.log(err);
        }

        return;
      }

      case 'getData': {
        try {
          contactDispatcher({ type: 'LoadingMode' });
          const res = await httpRequests.getAllContacts();
          contactDispatcher({ type: 'getData', data: res.data });
        } catch (err) {
          toast.error(err, { toastId: 'getErr' });
        }
        try {
          contactDispatcher({ type: 'LoadedMode' });
        } catch (err) {
          toast.error(err, { toastId: 'LoadErr' });
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
