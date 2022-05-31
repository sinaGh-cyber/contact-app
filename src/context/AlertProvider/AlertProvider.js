import { createContext, useReducer, useContext } from 'react';

const alertContext = createContext();

const initStat = {
  alertIsShown: false,
  alertMessage: '',
  buttonText: '',
  buttonColor: { color: 'transparent', backgroundColor: 'transparent' },
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
        buttonColor: {
          color: 'rgb(79, 44, 47)',
          backgroundColor: 'rgb(227, 120, 129)',
        },
        buttonText: 'حذف',
        alertMessage: 'شما در حال حذف یکی از مخاطبینتان هستید!',
      };
    }

    case 'alertGroupDelete': {
      return {
        ...newStat,
        buttonColor: {
          color: 'rgb(79, 44, 47)',
          backgroundColor: 'rgb(227, 120, 129)',
        },
        buttonText: 'حذف',
        alertMessage: 'شما درحال حذف گروهی چند نفر از مخاطبانتان هستید!',
      };
    }

    case 'alertEdit': {
      return {
        ...newStat,
        buttonColor: {
          color: 'rgb(35, 71, 26 )',
          backgroundColor: 'rgb(111, 218, 86  )',
        },
        buttonText: 'اعمال تغییرات',
        alertMessage: 'شما درحال تغییر اطلاعات این مخاطب هستید.',
      };
    }

    case 'alertAdd': {
      return {
        ...newStat,
        buttonColor: {
          color: 'rgb(35, 71, 26 )',
          backgroundColor: 'rgb(111, 218, 86  )',
        },
        buttonText: 'افزودن',
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
  const [alert, dispatchAlert] = useReducer(reducer, initStat);

  return (
    <alertContext.Provider value={{ alert, dispatchAlert }}>
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
