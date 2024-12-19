'use client'

import { CharacterController } from "@/app/data/character/CharacterController";
import Button from "../Button";
import GameController from "@/app/data/GameController";
import { CalendarTickBar } from "../ColoredBar";

export default function CalendarPanel(gameController: GameController) {

    const character = CharacterController.getCharacter();

    const MAX_TICK_DAY = gameController.MAX_TICK_DAY;
    const currentTick = gameController.current_tick_day;

    return (
        <div style={{ fontSize: 14, display: 'grid' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                { Button('Pause', gameController.pauseGame.bind(gameController)) }
                { Button('0.5x', gameController.halfSpeedGame.bind(gameController)) }
                { Button('1x', gameController.normalSpeedGame.bind(gameController)) }
                { Button('3x', gameController.speedUp3Game.bind(gameController)) }
                { Button('10x', gameController.speedUp10Game.bind(gameController)) }
                { Button('100x', gameController.speedUp100Game.bind(gameController)) }
            </div>
            { CalendarTickBar(currentTick, MAX_TICK_DAY) }
            <label>{gameController.calendar.year}y, day {gameController.calendar.day}</label>
            <label>{character.year}y (max {character.maxAge}y)</label>
        </div>
    );

}