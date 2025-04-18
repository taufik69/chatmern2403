import { toast, Bounce } from "react-toastify";
import moment from "moment/moment";
const _ = {};
_.singUpdata = () => {
  const singupiterm = [
    {
      id: 1,
      name: "email",
      required: true,
    },
    {
      id: 2,
      name: "fullName",
      required: true,
    },
    {
      id: 3,
      name: "password",
      required: true,
    },
  ];

  return singupiterm;
};
_.SucessToast = (msg = "sucess msg missing" , positon = "top-right") => {
  toast.success(msg, {
    position: positon,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

_.ErrorToast = (msg = "Error here") => {
  toast.error(msg, {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });
};

_.infoToast = (msg = "info Missing") => {
  toast.info(msg, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

// time and data 
_.getTimeNow = ()=> {
  return moment().format("MM DD YYYY, h:mm:ss a")
}

export default _;
