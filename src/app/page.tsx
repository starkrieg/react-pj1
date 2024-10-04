'use client'

import CentralController from "./components/central_controller";

const centralController = new CentralController();

export default function Home() {
  /* start game loop */
  centralController.doStartGame();
  /* set up page */
  return centralController.getStatePage();
}
