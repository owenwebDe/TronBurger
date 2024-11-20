import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useTgUser } from "../hooks/use-tg-user";

export const Wallet = () => {
  const currentTgUser = useTgUser();
  const user = useQuery(api.queries.userByTelegramId, {
    tgUserId: currentTgUser?.id,
  });

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gray-100">
      {/* Wallet Header */}
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg mt-10">
        <p className="text-center text-xl font-semibold text-gray-700">
          My Wallet
        </p>
      </div>

      {/* Token Balance Card */}
      <div className="w-full max-w-md p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl shadow-lg mt-6">
        <p className="text-lg">Balance</p>
        <p className="text-[3rem] font-bold font-mono">
          {user?.points || 0} TGR
        </p>
      </div>

      {/* User Details and Actions */}
      <div className="w-full max-w-md mt-8">
        <div className="bg-white p-4 rounded-xl shadow-md text-center">
          <p className="text-lg font-medium">
            Hello, {user?.firstName || "User"}
          </p>
          <p className="text-gray-500">Wallet ID: {currentTgUser?.id}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-around mt-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200">
            Withdraw
          </button>
          {/* <button className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition duration-200">
            Receive
          </button> */}
        </div>
      </div>
    </div>
  );
};
