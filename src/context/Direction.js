import React, { createContext, useState } from 'react';

const DirectionContext = createContext({
  direction: [],
  dispatch: () => {},
});

const DirectionProvider = ({ children }) => {
  const [direction, setDirection] = useState([]);
  console.log("providers", direction.name);
 // console.log("in?", station.name);

  const value = { direction , dispatch: setDirection };
  return <DirectionContext.Provider value={value}>{children}</DirectionContext.Provider>;
};

const DirectionConsumer = DirectionContext.Consumer;

export { DirectionProvider, DirectionConsumer };
export default DirectionContext;