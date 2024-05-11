"use client";

import FriendRequestsCardComponent from "@/components/friend-request-card/friend-request-card";
import Navbar from "@/components/navbar/navbar";
import useGetAllFriendRequests from "@/hooks/useGetAllFriendRequests";
import useGetProfileByUser from "@/hooks/useGetProfileByUser";
import { useRouter } from "next/navigation";

export default function FriendsPage() {
  const router = useRouter();
  const { profile } = useGetProfileByUser();

  const { friendRequests, friendRequestLoading, error } =
    useGetAllFriendRequests();

  return (
    <div className="w-full bg-[#EDEDED] h-[100vh]">
      <Navbar />
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 h-full">
        <div className="col-span-1 h-full bg-white hidden lg:block">
          <div className="flex flex-col gap-2 p-5 col-span-2 w-[80%] justify-self-start ">
            <div className="flex items-center gap-2 p-2">
              <div>
                <p className="text-2xl">
                  <strong>Friends</strong>
                </p>
              </div>
            </div>
            <div
              className="flex items-center gap-4
                        cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
              onClick={() => router.push(`/friends/requests`)}
            >
              <div>
                <p className="text-lg">Friend Requests</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="flex">
            <div className="flex flex-col gap-4 p-2 lg:p-5 w-full">
              <div className="flex items-center gap-2 p-2">
                <div className="flex items-center justify-between w-full gap-4 cursor-pointer hover:bg-gray-200 p-2 rounded-lg">
                  <p className="text-md lg:text-2xl">
                    <strong>Friend Requests</strong>
                  </p>
                  <p
                    className="lg:hidden text-md lg:text-2xl underline text-blue-500 cursor-pointer"
                    onClick={() => router.push(`/friends/requests`)}
                  >
                    <strong>View Friend Requests</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-6 px-7 gap-4">
            {friendRequests?.results?.length === 0 && (
              <div className="col-span-6">
                <p className="text-center lg:text-2xl text-gray-500">
                  No Friend Requests
                </p>
              </div>
            )}

            {friendRequests?.results?.map((friendRequest: any) => {
              return (
                <FriendRequestsCardComponent
                  key={friendRequest.id}
                  image={friendRequest?.sender?.profile_picture}
                  name={`${friendRequest?.sender?.first_name} ${friendRequest?.sender?.last_name}`}
                  senderId={friendRequest?.sender?.id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
