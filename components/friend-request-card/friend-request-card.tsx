import useAddFriend from "@/hooks/useAddFriend";
import useRemoveFriendRequest from "@/hooks/useRemoveFriendRequest";
import { Loader2 } from "lucide-react";

/* eslint-disable @next/next/no-img-element */
type Props = {
  image?: string;
  name?: string;
  id?: number;
  senderId?: number;
};

export default function FriendRequestsCardComponent({
  image,
  name,
  senderId
}: Props) {
  const { addFriend, addFriendLoading } = useAddFriend();

  const { removeFriendRequest, removeFriendReqLoading } =
    useRemoveFriendRequest();
  return (
    <div className="w-full rounded-lg flex flex-col gap-2 border border-blue-600">
      <div className="w-full">
        <img
          src={image ?? "/images/default.png"}
          alt=""
          className="w-full h-full  object-cover rounded-t-lg"
        />
      </div>
      <div className="flex flex-col gap-3 p-3">
        <div className="flex items-center gap-2">
          <p className="text-lg">
            <strong>{name}</strong>
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          {addFriendLoading ? (
            <button
              className="w-full flex gap-2 justify-center items-center bg-blue-400 text-white p-2 rounded-lg cursor-not-allowed"
              disabled
            >
              <Loader2 className="animate-spin" size={20} />
              <span>Accepting...</span>
            </button>
          ) : (
            <button
              className="w-full bg-blue-600 text-white p-2 rounded-lg"
              onClick={() => addFriend(senderId)}
            >
              Accept
            </button>
          )}
          {removeFriendReqLoading ? (
            <button
              className="w-full flex gap-2 justify-center items-center bg-gray-400 text-white p-2 rounded-lg cursor-not-allowed"
              disabled
            >
              <Loader2 className="animate-spin" size={20} />
              <span>Deleting...</span>
            </button>
          ) : (
            <button
              className="w-full bg-gray-600 text-white p-2 rounded-lg"
              onClick={() => removeFriendRequest(senderId)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
