import { useQuery } from "convex/react";
import { Link } from "react-router-dom";
import { Toaster } from "sonner";
import { api } from "../../convex/_generated/api";
import { Avatar } from "../components/avatar";
import { GlowingStarsBackgroundCard } from "../components/glowing-stars";
import { useTgUser } from "../hooks/use-tg-user";
import logo from "/mb-logo.png";

export const PointsSkeleton = () => {
  return (
    <div className="text-center h-10 bg-slate-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
  );
};

export const Home = () => {
  const currentTgUser = useTgUser();
  const user = useQuery(api.queries.userByTelegramId, {
    tgUserId: currentTgUser?.id,
  });

  return (
    <>
      <Toaster position="top-center" duration={3000} />
      <main className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-purple-600 to-indigo-700 text-white relative">
        {/* Background with Stars */}
        <GlowingStarsBackgroundCard />

        {/* Logo in top-right */}
        <div className="absolute top-4 right-4">
          <img src={logo} alt="logo" className="h-8 opacity-90" />
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center space-y-6 bg-white bg-opacity-10 backdrop-blur-md px-8 py-10 rounded-2xl shadow-lg relative z-10">
          {/* Avatar and User Name */}
          <div className="flex flex-col items-center">
            <Avatar
              firstName={currentTgUser?.firstName}
              lastName={currentTgUser?.lastName}
              size="large"
            />
            <div className="mt-3 text-lg font-semibold">
              {user?.firstName} {user?.lastName}
            </div>
          </div>

          {/* Points Display */}
          <div className="text-center">
            <p className="text-3xl font-extrabold font-mono">
              {user?.points || 0} P
            </p>
            <p className="mt-2 text-lg font-medium">
              Step into the <span className="text-yellow-300">$TURGER</span>{" "}
              universe!
            </p>
          </div>

          {/* Game Introduction */}
          <div className="px-4 text-center text-base leading-relaxed max-w-md">
            <p>
              Play and earn rewards as you unlock achievements and rise through
              the ranks with
              <span className="font-bold text-yellow-300"> $TURGER</span>. Are
              you ready to begin?
            </p>
          </div>

          {/* Start Game Button */}
          <Link
            to="/game"
            className="px-6 py-3 mt-4 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
          >
            Start the Game
          </Link>
        </div>
      </main>
    </>
  );
};
