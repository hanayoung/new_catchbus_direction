import React, { createContext, useState } from 'react';

const TrainContext = createContext({
  Train: [],
  dispatch: () => {},
});

const TrainProvider = ({ children }) => {
  const [train, setTrain] = useState([]);
  //console.log("in?", bus.name);

  const value = { train , dispatch: setTrain };
  return <TrainContext.Provider value={value}>{children}</TrainContext.Provider>;
};

const TrainConsumer = TrainContext.Consumer;

export { TrainProvider, TrainConsumer };
export default TrainContext;