import { toast, Bounce } from "react-toastify";

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
_.SucessToast = (msg = "sucess msg missing") => {
  toast.success(msg, {
    position: "top-right",
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

export default _;
