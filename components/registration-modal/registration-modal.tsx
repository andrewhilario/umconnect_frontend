"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import Link from "next/link";
import useUserRegistration from "@/hooks/useUserRegistration";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { Loader2, X } from "lucide-react";

type Props = {
  trigger: React.ReactNode;
  open?: boolean;
};

const RegistrationModalComponent = ({ trigger, open }: Props) => {
  const { register: UserRegistration, loading } = useUserRegistration();
  const router = useRouter();
  const [closeModal, setCloseModal] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const onRegister = async (data: any) => {
    if (data) {
      const {
        first_name,
        last_name,
        email,
        username,
        phone_number,
        password,
        date_of_birth
      } = data;

      console.log(data);

      await UserRegistration(
        {
          first_name,
          last_name,
          email,
          username,
          phone_number,
          password,
          date_of_birth
        },
        {
          onSuccess: (data) => {
            console.log("REGISTERED", data);
            reset();
            router.push("/");
          },
          onError: (error) => {
            console.error("ERROR", error);
          }
        }
      );
    }
  };
  return (
    <Dialog>
      <DialogTrigger className="w-full" asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="w-full xl:w-[500px]">
        <DialogTitle>Sign Up</DialogTitle>
        <hr className="my-2" />
        <form
          className="flex flex-col space-y-3"
          onSubmit={handleSubmit(onRegister)}
        >
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="First Name"
              className="p-2 border border-gray-300 rounded-md"
              {...register("first_name", { required: true })}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="p-2 border border-gray-300 rounded-md"
              {...register("last_name", { required: true })}
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            className="p-2 border border-gray-300 rounded-md"
            {...register("email", { required: true })}
          />
          <input
            type="text"
            placeholder="Username"
            className="p-2 border border-gray-300 rounded-md"
            {...register("username", { required: true })}
          />
          <input
            type="tel"
            placeholder="e.g. +639123456789"
            className="p-2 border border-gray-300 rounded-md"
            maxLength={13}
            {...register("phone_number", { required: true })}
          />
          <input
            type="password"
            placeholder="New Password"
            className="p-2 border border-gray-300 rounded-md"
            {...register("password", { required: true })}
          />
          {/* birthday */}
          <input
            type="date"
            placeholder="Birthday"
            className="p-2 border border-gray-300 rounded-md"
            {...register("date_of_birth", { required: true })}
          />
          <div className="text-xs">
            People who use our service may have uploaded your contact
            information to Paysbook.{" "}
            <Link href="/" className="text-blue-500 cursor-pointer">
              Learn more
            </Link>
          </div>

          {loading ? (
            <button
              disabled
              className="disabled:bg-green-300 disabled:cursor-not-allowed text-white p-4 rounded-lg flex items-center justify-center gap-2"
            >
              <Loader2 className="animate-spin" size={24} />
              <span>Signing Up...</span>
            </button>
          ) : (
            <button
              type="submit"
              className="bg-green-500 text-white p-4 rounded-lg"
            >
              Sign Up
            </button>
          )}

          {/* <div
            onClick={() => {
              router.replace("/login");
            }}
            className="bg-gray-500 text-white p-2 rounded-lg text-center cursor-pointer"
          >
            Cancel
          </div> */}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationModalComponent;
