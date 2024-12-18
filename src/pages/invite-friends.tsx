import { initUtils } from "@tma.js/sdk";
import { UserItemSkeleton, UserList } from "../components/user-list";
import { useGetInvitees } from "../hooks/use-get-invitees";
import { useTgUser } from "../hooks/use-tg-user";
import { useState, useEffect } from "react"; // Import useEffect for debugging

export const InviteFriends = () => {
  const utils = initUtils();
  const currentTgUser = useTgUser();

  const invitees = useGetInvitees();
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    console.log("Invitees data:", invitees); // Debugging invitees data
  }, [invitees]);

  const openLink = () => {
    const botLink = `https://t.me/Tdgigvbjhfrtbot?start=${currentTgUser.id}`;
    const text = "Join me in Turger! Let's see who can tap the fastest!";
    const shareLink = `https://t.me/share/url?url=${botLink}&text=${text}`;

    setUserPoints((prevPoints) => prevPoints + 100);

    utils.openTelegramLink(shareLink);
  };

  return (
    <main className="relative h-screen w-screen justify-center mx-auto p-10 flex items-center bg-red-500">
      <div className="flex flex-col space-y-4 text-center w-full h-full max-w-lg">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-users mx-auto"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>

          <h2 className="text-2xl font-semibold text-white mb-2">
            Invite friends!
          </h2>
          <p className="text-sm text-white">
            Invite your friends to join Turger and earn 100 Turger points for
            each friend that joins! More friends, more points!
          </p>
        </div>
        <button
          onClick={openLink}
          className="px-5 py-3 text-sm font-medium text-center hover:text-white text-white bg-blue-700 rounded-lg cursor-pointer hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
        >
          Invite friends
        </button>
        {invitees === undefined ? <UserItemSkeleton /> : null}
        {invitees && invitees.length === 0 && (
          <div className="rounded-md border-opacity-[0.2] border border-dashed border-white h-20 flex items-center justify-center">
            List is empty
          </div>
        )}

        {invitees && invitees.length > 0 ? <UserList users={invitees} /> : null}

        <div className="text-white mt-4">
          <p>Your current points: {userPoints}</p>
        </div>
      </div>
      <div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 bg-red-500"></div>
    </main>
  );
};
