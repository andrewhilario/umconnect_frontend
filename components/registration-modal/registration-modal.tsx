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
import { X } from "lucide-react";

type Props = {
  trigger: React.ReactNode;
  open?: boolean;
};

const RegistrationModalComponent = ({ trigger, open }: Props) => {
  const { register: UserRegistration } = useUserRegistration();
  const router = useRouter();
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

      await UserRegistration({
        first_name,
        last_name,
        email,
        username,
        phone_number,
        password,
        date_of_birth
      });

      reset();
    }
  };
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) reset();
      }}
    >
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
            information to Paysbook.
            <Link href="/" target="_blank" rel="noopener noreferrer">
              Learn more.
            </Link>
          </div>
          <div className="text-xs">
            By clicking Sign Up, you agree to our
            <a href="/" target="_blank" rel="noopener noreferrer">
              {" "}
              Terms
            </a>
            ,
            <a href="/" target="_blank" rel="noopener noreferrer">
              {" "}
              Data Policy
            </a>{" "}
            and
            <a href="/" target="_blank" rel="noopener noreferrer">
              {" "}
              Cookies Policy
            </a>
            . You may receive SMS notifications from us and can opt out at any
            time.
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white p-4 rounded-lg"
          >
            Sign Up
          </button>

          <div
            onClick={() => {
              router.replace("/login");
            }}
            className="bg-gray-500 text-white p-2 rounded-lg text-center cursor-pointer"
          >
            Cancel
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationModalComponent;
