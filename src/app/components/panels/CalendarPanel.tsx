'use client'

import { CharacterController } from "@/app/data/character/CharacterController";
import Button from "../Button";
import GameController from "@/app/data/GameController";

export default function CalendarPanel(gameController: GameController) {

    const character = CharacterController.getCharacter()

    return (
        <div style={{ fontSize: 14, display: 'grid' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                { Button('Pause', gameController.pauseGame.bind(gameController)) }
                { Button('1x', gameController.unpauseGame.bind(gameController)) }
                { Button('2x', gameController.speedUp2Game.bind(gameController)) }
                { Button('5x', gameController.speedUp5Game.bind(gameController)) }
                { Button('10x', gameController.speedUp10Game.bind(gameController)) }
                { Button('100x', gameController.speedUp100Game.bind(gameController)) }
            </div>
            <label>{gameController.calendar.year}y, day {gameController.calendar.day}</label>
            <label>{character.year}y (max {character.maxAge}y)</label>
        </div>
    );

}