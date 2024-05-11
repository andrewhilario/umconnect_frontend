"use client";

import { SignInResponse, signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useUserRegistration from "@/hooks/useUserRegistration";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import RegistrationModalComponent from "@/components/registration-modal/registration-modal";
import { Loader2 } from "lucide-react";

type Props = {};

export default function Login({}: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { data: session } = useSession();

  const onSubmit = async (data: any) => {
    setLoading(true);
    if (data) {
      const { email, password } = data;

      console.log("DATA", data);

      await signIn("credentials", {
        email,
        password,
        redirect: false
      }).then((response: SignInResponse | undefined) => {
        if (response) {
          const { ok, error } = response;

          if (ok) {
            toast({
              title: "Login Successful",
              description: "You have successfully logged in"
            });
            setLoading(false);
            if (session) {
              router.push("/");
            }
          } else {
            console.error("ERROR", error);
            toast({
              title: "Login Failed",
              description: "Invalid email or password",
              variant: "destructive"
            });
            setLoading(false);
          }
        }
      });

      setEmail("");
      setPassword("");
    }
  };

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [router, session]);

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center mt-24 xl:mx-64 xl:mt-80">
      <div className="text-center ">
        <h1 className="text-4xl 2xl:text-7xl text-blue-500 font-semibold">
          um connect
        </h1>
        <p className="text-xs 2xl:text-2xl">Connect, Share and Earn</p>
      </div>
      <div className="w-full lg:w-[40%] shadow-md p-10 rounded-lg">
        <form className="flex flex-col space-y-3">
          <input
            type="email"
            placeholder="Email"
            className="p-2 border border-gray-300 rounded-md"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 border border-gray-300 rounded-md"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-blue-900 text-white p-4 rounded-lg"
            onClick={(e) => {
              e.preventDefault();
              onSubmit({ email, password });
            }}
          >
            {loading ? (
              <div className="flex justify-center gap-1 items-center">
                <Loader2 className="animate-spin" size={24} />
                <span className="ml-2">Logging in...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <Link href="/">
          <p className="text-blue-500 text-center cursor-pointer w-full mt-2">
            Forgot Password?
          </p>
        </Link>
        <hr className="mt-4" />
        <RegistrationModalComponent
          trigger={
            <div className="bg-green-500 text-white p-4 rounded-lg mt-4 w-full cursor-pointer text-center self-center">
              Create a new account
            </div>
          }
        />
      </div>
    </div>
  );
}
