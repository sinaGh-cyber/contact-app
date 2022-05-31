import initStat from './initStat';

const reducer = (stat, { type, onDelete, id }) => {
  switch (type) {
    case 'optionShow': {
      return { isOptionMenuVisible: true, onDelete, id };
    }

    case 'optionClose': {
      return initStat;
    }

    default:
      throw Error("unknown action type in optionProvider's reducer");
  }
};
export default reducer;
