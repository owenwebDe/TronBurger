import Phaser from "phaser";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTgUser } from "../hooks/use-tg-user"; // Assuming you have a hook to get the Telegram user ID
import { useCreateFallingVirusesScene } from "../game/useCreateFallingVirusesScene";

export const Game = () => {
  const phaserGameRef = useRef<Phaser.Game | null>(null);
  const navigate = useNavigate();
  const currentTgUser = useTgUser();

  const handleGameEndCallback = useCallback(
    async (score: number) => {
      if (currentTgUser?.id) {
        // Make a POST request to your backend API
        try {
          await fetch("https://your-ngrok-id.ngrok.io/api/updatePoints", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tgUserId: currentTgUser.id,
              points: score,
            }),
          });
        } catch (error) {
          console.error("Error updating points:", error);
        }
      }

      // Navigate to result screen after updating points
      navigate("/result", {
        state: { score },
      });
    },
    [navigate, currentTgUser],
  );

  const Scene = useCreateFallingVirusesScene(handleGameEndCallback);
  const config: Phaser.Types.Core.GameConfig = useMemo(
    () => ({
      type: Phaser.AUTO,
      backgroundColor: "#282c34",
      parent: "game",
      width: window.innerWidth,
      height: window.innerHeight,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0, x: 0 },
        },
      },
      scene: Scene,
    }),
    [Scene],
  );

  useEffect(() => {
    if (phaserGameRef.current) {
      return;
    }
    phaserGameRef.current = new Phaser.Game(config);
    return () => {
      phaserGameRef.current?.destroy(true);
      phaserGameRef.current = null;
    };
  }, [config]);

  return <div id="game"></div>;
};
