export const SHOW_POPIN = 'SHOW_POPIN';
export const HIDE_POPIN = 'HIDE_POPIN';

export const showPopin = popinType => {
  return {
    type: SHOW_POPIN,
    popinType
  };
};

export const hidePopin = () => {
  return {
    type: HIDE_POPIN
  };
};
