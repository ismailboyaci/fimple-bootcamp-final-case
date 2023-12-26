import { createContext, useContext, useState } from 'react';
import Toastr from '~/shared/Toastr';

const ToastrContext = createContext();

export const ToastrProvider = ({ children }) => {
  const [toastr, setToastr] = useState(null);

  const showToastr = (type, message) => {
    setToastr({
      type,
      message,
    });

    // Toastr'ı belirli bir süre sonra kaldır
    setTimeout(() => {
      setToastr(null);
    }, 300000);
  };

  const onClose = () => {
    setToastr(null);
  }

  return (
    <ToastrContext.Provider value={{ showToastr }}>
      {children}
      {toastr && <Toastr type={toastr.type} message={toastr.message} onClose={onClose}/>}
    </ToastrContext.Provider>
  );
};

export const useToastr = () => {
  const { showToastr } = useContext(ToastrContext);

  return showToastr;
};
