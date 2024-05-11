import { useState } from "react";

import { MdHomeFilled } from "react-icons/md";
import { IoCloseSharp, IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IoAddOutline } from "react-icons/io5";
import { LuLibrary } from "react-icons/lu";
import CreatePost from "../pages/home/CreatePost";

const Sidebar = () => {
  const [showCreatePostFullScreen, setShowCreatePostFullScreen] = useState(
    false
  );
  const queryClient = useQueryClient();
  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/logout", {
          method: "POST",
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: () => {
      toast.error("Logout failed");
    },
  });
  const { data } = useQuery({ queryKey: ["authUser"] });
  const handleOpenCreatePostFullScreen = () => {
    setShowCreatePostFullScreen(true);
  };

  const handleCloseCreatePostFullScreen = () => {
    setShowCreatePostFullScreen(false);
  };

  return (
    <div className="md:hidden bg-blue-600 bg-opacity-50 fixed bottom-0 left-0 w-full">
      <div className="flex justify-between bg-gray-700 text-white p-2">
        <Link
          to="/"
          className="flex flex-col items-center text-xs p-2"
        >
          <MdHomeFilled className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </Link>

        <Link
          to="/landing"
          className="flex flex-col items-center text-xs p-2"
        >
          <LuLibrary className="w-6 h-6" />
          <span className="text-xs">Library</span>
        </Link>

        <div className="flex flex-col items-center text-xs p-2">
          <IoAddOutline className="w-6 h-6 bg-info-content hover:bg-blue-600 text-white font-bold p-2 rounded-full" onClick={handleOpenCreatePostFullScreen} />
          <span className="text-xs">Add Post</span>
        </div>

        <Link
          to={`/profile/${data?.username}`}
          className="flex flex-col items-center text-xs p-2"
        >
          <FaUser className="w-6 h-6" />
          <span className="text-xs">Profile</span>
        </Link>

        {data && (
          <div
            className="flex flex-col items-center text-xs cursor-pointer p-2"
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
          >
            <BiLogOut className="w-6 h-6" />
            <span className="text-xs">Logout</span>
          </div>
        )}
      </div>
       {/*  CREATE POST INPUT */}
       {showCreatePostFullScreen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center  z-50">
            <div className="relative bg-base-200 p-8 mt-100 rounded-[2.5rem] h-[600px] w-[600px]">
              <CreatePost />
              <IoCloseSharp
                className="absolute top-2 font-bold right-2 text-red-500 hover:text-gray-900 cursor-pointer"
                onClick={handleCloseCreatePostFullScreen}
              />
            </div>
          </div>
        )}
    </div>
  );
};

export default Sidebar;
