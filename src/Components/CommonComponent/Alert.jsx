import React from "react";

const Alert = ({ blockmsg = "lsdkf" }) => {
  console.log(blockmsg);

  return (
    <div
      class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      <span class="font-medium">Danger alert!</span> {blockmsg}
    </div>
  );
};

export default Alert;
