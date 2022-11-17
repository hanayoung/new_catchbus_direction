import React, { createContext, useState } from 'react';

const AlertContext = createContext({
  Alert: [],
  dispatch_alert: () => {},
});

const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState([]);
 // console.log("providers", bus.routeId);
  //console.log("in?", bus.name);

  const value = { alert , dispatch_alert : setAlert };
  return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>;
};

const AlertConsumer = AlertContext.Consumer;

export { AlertProvider, AlertConsumer };
export default AlertContext;