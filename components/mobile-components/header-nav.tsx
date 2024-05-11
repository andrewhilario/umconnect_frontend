import { usePathname, useRouter } from "next/navigation";
import {
  AiOutlineHome,
  AiFillHome,
  AiOutlineMessage,
  AiFillMessage
} from "react-icons/ai";
import { HiOutlineUsers, HiUsers } from "react-icons/hi";
import { BiMoviePlay, BiSolidMoviePlay } from "react-icons/bi";
import { FaRegBell, FaBell } from "react-icons/fa";

export default function HeaderNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="grid grid-cols-5 gap-2 bg-white">
      <div
        className={`flex justify-center items-center p-4 cursor-pointer ${
          pathname === "/" ? "border-b-2 border-blue-600" : ""
        }`}
        onClick={() => {
          router.push("/");
        }}
      >
        {pathname === "/" ? (
          <AiFillHome size={24} className="text-blue-600" />
        ) : (
          <AiOutlineHome size={24} className="text-blue-600" />
        )}
      </div>
      <div
        className={`flex justify-center items-center p-4 cursor-pointer ${
          pathname === "/friends" ? "border-b-2 border-blue-600" : ""
        }`}
        onClick={() => {
          router.push("/friends");
        }}
      >
        {pathname === "/friends" ? (
          <HiUsers size={24} className="text-blue-600" />
        ) : (
          <HiOutlineUsers size={24} className="text-blue-600" />
        )}
      </div>
      <div
        className={`flex justify-center items-center cursor-pointer p-4 ${
          pathname === "/messages" ? "border-b-2 border-blue-600" : ""
        }`}
        onClick={() => {
          router.push("/messages");
        }}
      >
        {pathname === "/messages" ? (
          <AiFillMessage size={24} className="text-blue-600" />
        ) : (
          <AiOutlineMessage size={24} className="text-blue-600" />
        )}
      </div>
      <div
        className={`flex justify-center items-center p-4 cursor-pointer ${
          pathname === "/watch" ? "border-b-2 border-blue-600" : ""
        }`}
      >
        {pathname === "/watch" ? (
          <BiSolidMoviePlay size={24} className="text-blue-600" />
        ) : (
          <BiMoviePlay size={24} className="text-blue-600" />
        )}
      </div>
      <div
        className={`flex justify-center items-center p-4 cursor-pointer ${
          pathname === "/notifications" ? "border-b-2 border-blue-600" : ""
        }`}
      >
        {pathname === "/notifications" ? (
          <FaBell size={24} className="text-blue-600" />
        ) : (
          <FaRegBell size={24} className="text-blue-600" />
        )}
      </div>
    </div>
  );
}
