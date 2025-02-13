import { User } from "@/type/interfaces";
import Badges from "../Badges";
import Box from "../Box";
import CloudImage from "../CloudImage";
interface ProfileDataProps {
  user: User;
  profile: {
    title: string;
    name: string;
    email: string;
    role: string;
  };
  role: {
    user: string;
    moderator: string;
    admin: string;
  };
}
export default function ProfileData({ user, profile, role }: ProfileDataProps) {
  const color: { [key: string]: "yellow" | "blue" | "gray" } = {
    admin: "yellow",
    moderator: "blue",
    user: "gray",
  };

  return (
    <Box>
      <h3 className="text-2xl font-bold">{profile.title}</h3>
      <div className="flex flex-row flex-wrap items-center justify-center gap-4">
        <div>
          {user && user.avatar_url ? (
            <CloudImage
              width={56}
              height={56}
              src={user?.avatar_url}
              alt={`avatar of ${user?.full_name}`}
              className="block h-14 w-14 rounded-full ring-2 ring-gray-100 dark:ring-gray-800"
            />
          ) : (
            <div className="relative inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600">
              <span className="text-2xl font-medium text-gray-600 dark:text-gray-300">
                {user && user.full_name && user.full_name[0]}
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap font-medium dark:text-white">
            <div className="mr-1">{profile.role}:</div>
            <Badges text={role[user.role]} color={color[user.role]} />
          </div>
          <div className="flex flex-wrap font-medium dark:text-white">
            <div className="mr-1">{profile.email}:</div>
            <div className="break-words">{user.email}</div>
          </div>
          <div className="flex flex-wrap font-medium dark:text-white">
            <div className="mr-1">{profile.name}:</div>
            <div className="break-words">{user.full_name}</div>
          </div>
        </div>
      </div>
    </Box>
  );
}
