
import { createContext, useReducer, useContext  } from 'react';


const contactContext = createContext();
const contactDispatcherContext = createContext();

const reducer = (stat, { type, id, data }) => {
    switch (type) {
      case 'refresh':
        return data;

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
  };



  const asyncDispatcher = ({ type, id, data }) => {
    switch (type) {
      case 'refresh':{
          contactDispatcher()
          return data;
      }
        

      default: {
        throw Error('unknown action in asyncDispatcher');
      }
    }
  };

  const [contactList, contactDispatcher] = useReducer(reducer, initValue);

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
