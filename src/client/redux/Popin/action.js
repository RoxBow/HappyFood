export const showPopin = popinType => {
  return {
    type: 'SHOW_POPIN',
    popinType
  };
};

export const hidePopin = () => {
  return {
    type: 'HIDE_POPIN'
  };
};
