import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="bg-white h-screen flex justify-center	 items-center">
      <div className="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:pxzz-8 z-20">
        <h2 className="text-3xl font-extrabold text-black sm:text-4xl">
          <span className="block">Want to Succeed ?</span>
          <span className="block text-green-500">
            use our product Management tool.
          </span>
        </h2>
        <p className="text-xl mt-4 max-w-md mx-auto text-gray-400">
          The Product Management System is a versatile tool designed to empower
          users with efficient control over their product inventory.
        </p>
        <div className="lg:mt-0 lg:flex-shrink-0">
          <div className="mt-12 inline-flex rounded-md shadow">
            <Link
              to={"/login"}
              type="button"
              className="py-4 px-6  bg-green-500 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
