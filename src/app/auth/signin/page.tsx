"use client";
import React, { useState, useEffect } from "react";
import { Metadata } from "next";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { useAppDispatch } from "@/redux/hooks";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "@/redux/slice/authSlice";
import { errorToast, successToast, warningToast } from "@/components/Toast";
import { storeUserInfo } from "@/services/auth.services";
import Image from "next/image";
import { TextInput } from "@/components/FormInputs";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "@/components/CustomButton";
import { useAppSelector } from "@/redux/hooks";
import useRedirectHelper from "@/utils/authRedirectHelper";
import Loader from "@/components/common/Loader";
import toast from "react-hot-toast";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  useRedirectHelper("/dashboard");
  const [showPassword, setShowPassword] = useState(false);
  const [userLogin] = useUserLoginMutation();
  const methods = useForm<FormData>({ resolver: zodResolver(schema) });
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormData> = async (data: any) => {
    // setLoading(true);
    try {
      dispatch(signInStart());
      const res = await userLogin({ ...data }).unwrap();
      if (res?.data?.user?.role === "customer") {
        // errorToast('Access denied.');
        toast.error("Access denied.");
      } else if (res?.data?.user?.role === "admin" && res?.data?.accessToken) {
        router.push("/dashboard");
        // setLoading(false);
        const { _id, name, email, role } = res.data.user;
        const userData = { _id, name, email, role };
        dispatch(signInSuccess(userData));
        successToast(res?.message);
      }
      storeUserInfo({ accessToken: res?.data?.accessToken });
      //  setLoading(false);
    } catch (error: any) {
      // errorToast(error?.data?.message);
      toast.error(error?.data?.message);
      // setLoading(false);
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-r from-blue-50 to-orange-50">
      <div className="flex max-w-full overflow-hidden rounded-lg bg-white shadow-inner">
        <div className="flex flex-col justify-center p-8">
          <h2 className="mb-4 text-3xl font-semibold">
            Welcome <span className="text-teal_blue">TripNest Admin !!</span>
          </h2>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <TextInput name="email" label="Email" />
              <div className="relative">
                <TextInput
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                />
                <div
                  className="absolute right-3 top-10 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash color="#6d6d6d" />
                  ) : (
                    <FaEye color="#6d6d6d" />
                  )}
                </div>
              </div>

              <Button
                title={loading ? "Loading..." : "Sign In"}
                btnType="submit"
                isDisabled={loading}
                containerStyles={`w-full ${loading ? "bg-slate-600" : "bg-orange-deep"} text-white py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              />
            </form>
          </FormProvider>
          <div className="mt-4 flex flex-col items-center space-y-4"></div>
        </div>
      </div>
    </div>
  );
};
export default Login;
