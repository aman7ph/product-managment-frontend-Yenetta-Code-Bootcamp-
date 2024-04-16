import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateSignupData } from "../utils/validateLoginData";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../store/userSlice";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateSignupData(
      username,
      email,
      password,
      confirmPassword
    );
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      dispatch(signupUser({ username, email, password }));
    }
  };
  // xwqqbl7CgALhD2E;j6D6W9CGaAZTrD7
  // 70LlT79p5ubOzzg;FXrVpbFpB0eqseZ
  useEffect(() => {
    if (Object.keys(currentUser).length !== 0) {
      localStorage.setItem("token", currentUser.token);
      navigate("/dashbord");
    }
  }, [currentUser]);
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form
          className="bg-white px-6 py-8 rounded shadow-md text-black w-full"
          onSubmit={handleSubmit}
        >
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="username"
            value={username}
            placeholder="Full Name"
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username === "" ? (
            ""
          ) : (
            <p className="text-red-500 mb-2">{errors.username}</p>
          )}

          <input
            type="email"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email === "" ? (
            ""
          ) : (
            <p className="text-red-500 mb-2">{errors.email}</p>
          )}

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password === "" ? (
            ""
          ) : (
            <p className="text-red-500 mb-2">{errors.password}</p>
          )}

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="confirm_password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword === "" ? (
            ""
          ) : (
            <p className="text-red-500 mb-2">{errors.confirmPassword}</p>
          )}

          <button
            disabled={loading}
            type="submit"
            className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-dark focus:outline-none my-1"
          >
            {loading ? "Loading...." : " Create Account"}
          </button>
          {error === "" ? "" : <p className="text-red-500 mb-2">{error}</p>}
        </form>

        <div className="text-grey-dark mt-6">
          Already have an account?{"  "}
          <Link
            className="no-underline border-b border-blue text-blue"
            to={"/login"}
          >
            Log in
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default SignUp;
