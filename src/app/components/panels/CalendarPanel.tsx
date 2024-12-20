'use client'

import Button from "../Button";
import GameController from "@/app/data/GameController";
import { CalendarTickBar } from "../ColoredBar";
import { Calendar } from "@/app/data/Calendar";

export default function CalendarPanel(gameController: GameController) {

    const MAX_TICK_DAY = gameController.MAX_TICK_DAY;
    const currentTick = gameController.current_tick_day;

    const isShowMaxSpeed = false;

    return (
        <div style={{ fontSize: 14, display: 'grid' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                { Button('Pause', gameController.pauseGame.bind(gameController)) }
                { Button('1x', gameController.normalSpeedGame.bind(gameController)) }
                { Button('2x', gameController.speedUp2Game.bind(gameController)) }
                { Button('5x', gameController.speedUp5Game.bind(gameController)) }
                { Button('10x', gameController.speedUp10Game.bind(gameController)) }
                { isShowMaxSpeed && Button('50x', gameController.speedUp50Game.bind(gameController)) }
            </div>
            { CalendarTickBar(currentTick, MAX_TICK_DAY) }
            <label>{Calendar.getYear()}y, day {Calendar.getDay()}</label>
        </div>
    );

}