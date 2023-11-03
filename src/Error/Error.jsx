import React from "react";

const Error = () => {
  return (
    <div className="flex justify-center items-center text-center flex-col min-h-screen space-y-3">
      <h1 className="font-semibold text-5xl">Somting Went Wrong!</h1>
      <p className="text-red-400">Please Try Again and Check Your Code!</p>
    </div>
  );
};

export default Error;
