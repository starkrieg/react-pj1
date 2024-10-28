'use client'

import GameController from "./data/GameController";

const gameController = new GameController();

export default function Home() {

  /* start game loop */
  /* game loop will render page via DOM */
  gameController.doStartGame();
  
  return ;
}
