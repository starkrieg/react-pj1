'use client'

import { createRoot } from "react-dom/client";

import { Calendar } from "./Calendar";
import { MessageController } from "./messages/MessageController";

import { CharacterController } from "./character/CharacterController";
import { GameState } from "../components/GameState";
import { MainContentEnum } from "./MainContentEnum";
import { ModalTypeEnum } from "./modal/ModalTypeEnum";
import { ExplorationController } from "./exploration/ExplorationController";
import { ModalController } from "./modal/ModalController";
import { ActivitiesController } from "./activities/ActivitiesController";
import ItemCreator from "./items/ItemCreator";
import ZonePool from "./exploration/ZonePool";
import ActivityPool from "./activities/ActivityPool";
import { ContentUnlockController } from "./ContentUnlockController";

export default class GameController {

    globalRoot: any;

    // mechanic 
    isGameWorking = false;
    isPaused = false;
    gameSpeed = 1;

    modalType = ModalTypeEnum.NOTHING;

    selectedContent = MainContentEnum.JOURNAL;

    calendar: Calendar;

    readonly MAX_TICK_DAY = 48;
    current_tick_day = 0;

    constructor() {
        this.calendar = new Calendar();        
        this.globalRoot = undefined;
    }

    public resetEverything() {
        const ans = confirm('Reset everything. Are you sure?');
        if (ans) {
            ActivitiesController.hardReset();
            ExplorationController.hardReset();
            MessageController.hardReset();
            ModalController.hardReset();

            this.setupBasicData();
        }
    }

    private setupContentPools() {
        //items come first
        ItemCreator.createItemPool();

        //zones depend on items for rewards
        ZonePool.createZonePool();

        //activities 
        ActivityPool.createActivityPool();
    }

    private setupBasicData() {
        this.calendar.resetDefaultValues();
        CharacterController.resetToGameStart();

        //unlock content from present items
        ContentUnlockController.unlockContent();
        
        this.modalType = ModalTypeEnum.GAME_START;
    }

    private doReviveCharacter() {
        this.calendar.resetDefaultValues();
        CharacterController.reviveCharacter();
        MessageController.pushMessageSimple('You are alive!');
    }

    // functions

    private sleep(ms: any) {
        return new Promise(resolve => setTimeout(resolve, ms));  // Define sleep
    }
    
    pauseGame() {
        this.isPaused = true;
    }
    
    halfSpeedGame() {
        this.isPaused = false;
        this.gameSpeed = 0.5;
    }

    normalSpeedGame() {
        this.isPaused = false;
        this.gameSpeed = 1;
    }
    
    speedUp2Game() {
        this.isPaused = false;
        this.gameSpeed = 2;
    }
    
    speedUp3Game() {
        this.isPaused = false;
        this.gameSpeed = 3;
    }

    speedUp10Game() {
        this.isPaused = false;
        this.gameSpeed = 10;
    }

    speedUp100Game() {
        this.isPaused = false;
        this.gameSpeed = 50;
    }

    selectContent(contentId = MainContentEnum.CHARACTER) {
        this.selectedContent = contentId;
    }
  
    private addDayCalendar() {
        this.calendar.day += 1;
        if (this.calendar.day > 365) {
            this.calendar.day -= 365;
            this.calendar.year += 1;
            
            if (CharacterController.add1YearCharacter()) {
                this.modalType = (CharacterController.getDeathCount() > 0) ? ModalTypeEnum.DEATH : ModalTypeEnum.DEATH_FIRST
            }
    
        }        
    }

    private doGameLoop() {
        return new Promise(async () => {
            /* 1 tick is 100 ms */
            /* 1 day is X amount of ticks */
            /* 365 days in a year */
            /* game speed reduces tick time */
            
            const ticksPerFightRound = 6; // how many ms for a small day tick
            // a day has MAX_TICK_DAY of walks
            // keep it above 3, so hydration works properly
            while(this.isGameWorking) {
                await this.sleep(100 / this.gameSpeed);
                if (!this.isPaused && this.modalType == ModalTypeEnum.NOTHING) {
                    if (ExplorationController.selectedZone) {
                        this.current_tick_day += 1;
                    } else {
                        this.current_tick_day += 8;
                    }
                    
                    if (ExplorationController.selectedZone
                        && (this.current_tick_day % (ticksPerFightRound) == 0)
                    ) {
                        //if exploring, then cant work on selected activity
                        //exploring means days do not pass
                        ExplorationController.doExploreSelectedZone()
                    }

                    if (this.current_tick_day >= this.MAX_TICK_DAY) {
                        this.current_tick_day = 0;
                        
                        // check if doing anything
                        if(ActivitiesController.selectedActivity
                            && !ExplorationController.selectedZone
                        ) {
                            //only do activity if not exploring
                            //and only if selected one activity
                            ActivitiesController.doActivityTick();
                        }

                        if (!ExplorationController.selectedZone) {
                            CharacterController.recoverInternalInjury();
                        }
                        
                        //day will pass
                        this.addDayCalendar();
                    }
                    
                }
                // TODO - ui must be updated based on react hooks, not forced by dom changes

                // update UI
                this.updateUIState();
            }
        });
    }

    private updateUIState() {
        if (this.globalRoot == undefined) {
            const root = document.getElementById('root');
            this.globalRoot = root ? createRoot(root) : undefined;
        } else {
            this.globalRoot.render(GameState(this));
        }
    }

    public doStartGame() {
        if (!this.isGameWorking) {
            this.isGameWorking = true;
            /* start game loop */
            this.setupContentPools();
            this.setupBasicData();
            this.doGameLoop();
        }
    }

    doCloseModal() {
        this.modalType = ModalTypeEnum.NOTHING;
    }
    
    doAfterDeathModalClick() {
        this.doReviveCharacter();
        //recreate areas
        ExplorationController.hardReset();
        ActivitiesController.softReset();

        //unlock content from what is kept on character revival
        ContentUnlockController.unlockContent();
        
        this.doCloseModal();
    }
      
}