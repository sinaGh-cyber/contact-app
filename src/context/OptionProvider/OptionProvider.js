import { createContext, useContext, useReducer } from 'react';
import reducer from './reducer';
import initStat from './initStat';

const optionContext = createContext();

const OptionProvider = ({ children }) => {
  const [contactOptionMenu, dispatchOption] = useReducer(
    reducer,
    initStat
  );
  return (
    <optionContext.Provider value={{ contactOptionMenu, dispatchOption }}>
      {children}
    </optionContext.Provider>
  );
};

const useOption = () => {
  const option = useContext(optionContext);
  if (!option) {
    throw Error("Option provider doesn't found");
  }
  return option;
};
export { useOption };
export default OptionProvider;
