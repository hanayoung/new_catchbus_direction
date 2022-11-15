import React, { createContext, useState } from 'react';

const BusContext = createContext({
  Bus: [],
  dispatch: () => {},
});

const BusProvider = ({ children }) => {
  const [bus, setBus] = useState([]);
 // console.log("providers", bus.routeId);
  //console.log("in?", bus.name);

  const value = { bus , dispatch: setBus };
  return <BusContext.Provider value={value}>{children}</BusContext.Provider>;
};

const BusConsumer = BusContext.Consumer;

export { BusProvider, BusConsumer };
export default BusContext;