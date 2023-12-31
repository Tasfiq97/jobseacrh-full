import React, { useEffect, useState } from "react";
import loginImage from "../assets/login.svg";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../features/auth/authSlice";
import { toast } from "react-hot-toast";
import { googleSignIn, loginUser } from "../features/auth/authSlice";
const Signup = () => {
  const { handleSubmit, register, reset, control } = useForm();
  const password = useWatch({ control, name: "password" });
  const { isError, error } = useSelector((state) => state.auth);
  const confirmPassword = useWatch({ control, name: "confirmPassword" });
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      password !== undefined &&
      password !== "" &&
      confirmPassword !== undefined &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, confirmPassword]);

  const onSubmit = (data) => {
    dispatch(createUser({ email: data.email, password: data.password }));
    // console.log(data);
  };
  const handleGoogleSignIn = () => {
    dispatch(googleSignIn());
  };
  useEffect(() => {
    if (isError) {
      toast.error(error);
    }
  }, [isError, error]);

  return (
    <div className="flex max-h-screen items-center bg-gray-400 p-6">
      <div className="w-1/2 mt-20 mb-10">
        <img src={loginImage} className="h-full w-[80%]" alt="" />
      </div>
      <div className="w-1/2 grid place-items-center">
        <div className="bg-white shadow-2xl rounded-lg grid place-items-center p-10">
          <h1 className="mb-10 font-medium text-2xl">Sign up</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <div className="flex flex-col items-start">
                <label htmlFor="email" className="ml-5">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  {...register("email")}
                />
              </div>

              <div className="flex flex-col items-start">
                <label htmlFor="password" className="ml-5">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  {...register("password")}
                />
              </div>
              <div className="flex flex-col items-start">
                <label htmlFor="confirm-password" className="ml-5">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  {...register("confirmPassword")}
                />
              </div>
              <div className="!mt-8 ">
                <button
                  type="submit"
                  className="font-bold text-white py-3 rounded-full bg-primary w-full disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={disabled}
                >
                  Sign up
                </button>
              </div>
              <div>
                <p>
                  Already have an account?{" "}
                  <span
                    className="text-primary hover:underline cursor-pointer"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </span>
                </p>
              </div>
              <button
                type="submit"
                className="font-bold text-white py-3 rounded-full bg-primary w-full"
                onClick={handleGoogleSignIn}
              >
                Signup with google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
