'use client'

import CentralController from "./central_controller";

var centralController = new CentralController();

export default function Home() {
  /* start game loop */
  centralController.doStartGame();
  /* set up page */
  return centralController.getStatePage();
}
