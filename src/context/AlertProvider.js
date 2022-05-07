import { createContext, useReducer, useContext, Children } from 'react';
import { httpRequests } from '../../services/httpRequest';

const alertContext = createContext();

const initStat = {
  alertIsShown: false,
  alertMessage: '',
  onUserAcceptation: () => {
    throw Error("onUserAcceptation callBack function doesn't passed");
  },
};

const reducer = (stat, { mode, onUserAcceptation }) => {
  const newStat = { ...stat, onUserAcceptation, alertIsShown: true };
  switch (mode) {
    case 'alertSingleDelete': {
      return {
        ...newStat,
        alertMessage: 'شما در حال حذف یکی از مخاطبینتان هستید!',
      };
    }

    case 'alertGroupDelete': {
      return {
        ...newStat,
        alertMessage: 'شما درحال حذف گروهی چند نفر از مخاطبانتان هستید!',
      };
    }

    case 'alertEdit': {
      return {
        ...newStat,
        alertMessage: 'شما درحال تغییر اطلاعات این مخاطب هستید.',
      };
    }

    case 'alertAdd': {
      return {
        ...newStat,
        alertMessage: 'شما در حال افزودن مخاطب جدید هستید.',
      };
    }

    case 'alertClose':
      return initStat;

    default:
      throw Error('unknown alert switch case!');
  }
};

const AlertProvider = ({ children }) => {
  const [alert, dispatch] = useReducer(reducer, initStat);

  return (
    <alertContext.Provider value={{ alert, dispatch }}>
      {' '}
      {children}{' '}
    </alertContext.Provider>
  );
};

const useAlert = () => {
  const context = useContext(alertContext);
  if (context) {
    return context;
  }
  throw Error('alertContext is not defined');
};

export { useAlert };
export default AlertProvider;
