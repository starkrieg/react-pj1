'use client'

import { ButtonGameSpeedCustom, ButtonGameSpeedFastForward, ButtonGameSpeedPause, ButtonGameSpeedPlay } from "../Button";
import GameController from "@/app/data/GameController";
import { CalendarTickBar } from "../ColoredBar";
import { Calendar } from "@/app/data/Calendar";

export default function CalendarPanel(gameController: GameController) {

    const MAX_TICK_DAY = gameController.MAX_TICK_DAY;
    const currentTick = gameController.current_tick_day;

    const selectedBtn = gameController.speedBtnSelected;

    return (
        <div style={{ fontSize: 14, display: 'grid' }} >
            <div className="calendar-speed-buttons-div">
                { ButtonGameSpeedPause(gameController.pauseGame.bind(gameController), (selectedBtn == 0)) }
                { ButtonGameSpeedPlay(gameController.normalSpeedGame.bind(gameController), (selectedBtn == 1)) }
                { ButtonGameSpeedFastForward(gameController.speedUp2Game.bind(gameController), (selectedBtn == 2)) }
                { ButtonGameSpeedCustom('5x', gameController.speedUp5Game.bind(gameController), (selectedBtn == 3)) }
                { ButtonGameSpeedCustom('10x', gameController.speedUp10Game.bind(gameController), (selectedBtn == 4)) }
                { ButtonGameSpeedCustom('50x', gameController.speedUp50Game.bind(gameController), (selectedBtn == 5)) }
            </div>
            { CalendarTickBar(currentTick, MAX_TICK_DAY) }
            <label>{Calendar.getYear()}y, day {Calendar.getDay()}</label>
        </div>
    );

}