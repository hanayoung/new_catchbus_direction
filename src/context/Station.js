import React, { createContext, useState } from 'react';

const StationContext = createContext({
  station: [],
  dispatch: () => {},
});

const StationProvider = ({ children }) => {
  const [station, setStation] = useState([]);
  console.log("providers", station.id);
  console.log("in?", station.name);

  const value = { station , dispatch: setStation };
  return <StationContext.Provider value={value}>{children}</StationContext.Provider>;
};

const StationConsumer = StationContext.Consumer;

export { StationProvider, StationConsumer };
export default StationContext;