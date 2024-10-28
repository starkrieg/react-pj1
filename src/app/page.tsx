'use client'

import { GameState } from "./components/GameState";
import CentralController from "./data/CentralController";

const centralController = new CentralController();

export default function Home() {
  /* start game loop */
  centralController.doStartGame();
  /* set up page */
  return GameState(centralController);
}
