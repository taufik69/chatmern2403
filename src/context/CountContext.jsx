import { createContext, useState } from "react";

export const countContext = createContext(0);

export const CounterProvider = ({ children }) => {
  const [count, setcount] = useState(0);
  return (
    <countContext.Provider value={count}>
      {children} //app
    </countContext.Provider>
  );
};
