import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { Wallet } from "./pages/wallet";
import { InviteFriends } from "./pages/invite-friends";
import { Leaderboard } from "./pages/leaderboard";
import { Result } from "./pages/result";
import { Game } from "./pages/game";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/invite-friends" element={<InviteFriends />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/result" element={<Result />} />
    </Route>
    <Route path="/game" element={<Game />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default AppRoutes;
