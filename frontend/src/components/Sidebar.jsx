import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { useMutation,  useQuery, useQueryClient } from "@tanstack/react-query";
import { IoAddOutline } from "react-icons/io5";
import { LuLibrary } from "react-icons/lu";

const Sidebar = () => {
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
      <ul className="flex justify-between bg-gray-700 text-white p-2">
        <li>
          <Link
            to="/"
            className="flex flex-col items-center text-xs"
          >
            <MdHomeFilled className="w-6 h-6" />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <div className="flex items-center justify-center">
            <IoAddOutline className="w-6 h-6 bg-info-content hover:bg-blue-600 text-white font-bold p-2 rounded-full" onClick={handleOpenCreatePostFullScreen} />
          </div>
        </li>
        <li>
          <Link
            to="/landing"
            className="flex flex-col items-center text-xs"
          >
            <LuLibrary className="w-6 h-6" />
            <span>Library</span>
          </Link>
        </li>
        <li>
          <Link
            to={`/profile/${data?.username}`}
            className="flex flex-col items-center text-xs"
          >
            <FaUser className="w-6 h-6" />
            <span>Profile</span>
          </Link>
        </li>

        {data && (
          <li>
            <div
              className="flex flex-col items-center text-xs cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
            >
              <BiLogOut className="w-6 h-6" />
              <span>Logout</span>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
