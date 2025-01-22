'use client'

import { createRoot } from "react-dom/client";

import { Calendar } from "./Calendar";
import { MessageController } from "./messages/MessageController";

import { CharacterController } from "./character/CharacterController";
import { GameState } from "../components/GameState";
import { MainContentEnum } from "./MainContentEnum";
import { ModalTypeEnum } from "./modal/ModalTypeEnum";
import { ExplorationController } from "./exploration/ExplorationController";
import { ActivitiesController } from "./activities/ActivitiesController";
import ItemCreator from "./items/ItemCreator";
import ZonePool from "./exploration/ZonePool";
import ActivityPool from "./activities/ActivityPool";
import { ContentUnlockController } from "./ContentUnlockController";
import { MarketController } from "./market/MarketController";
import { ItemMarketCreator } from "./market/ItemMarketCreator";
import { EventController } from "./events/EventController";
import { EventCreator } from "./events/EventCreator";
import { load_from_localstorage, startAutoSaveTimer } from "./SaveDataController";
import { ModalController } from "./modal/ModalController";

export default class GameController {

    globalRoot: any;

    // mechanic 
    isGameWorking = false;
    isPaused = false;
    gameSpeed = 0;
    speedBtnSelected = 0;

    selectedContent = MainContentEnum.JOURNAL;

    readonly MAX_TICK_DAY = 48;
    current_tick_day = 0;

    constructor() {
        this.globalRoot = undefined;
        this.doChangeGameSpeedNormal();
    }

    private setupContentPools() {
        //items come first
        ItemCreator.createItemPool();
        ItemMarketCreator.createMarketItems();

        //zones depend on items for rewards
        ZonePool.createZonePool();

        //activities 
        ActivityPool.createActivityPool();
    }

    private setupBasicData() {
        Calendar.resetDefaultValues();
        CharacterController.resetToGameStart();

        //unlock content from present items
        ContentUnlockController.unlockContent();
        EventCreator.createEvents();
        
        ModalController.setCurrentModal(ModalTypeEnum.GAME_START);
        MessageController.pushMessageGeneral('You wake up!');
    }

    private doReviveCharacter() {
        Calendar.resetDefaultValues();
        this.doChangeGameSpeedNormal();
        CharacterController.reviveCharacter();
        MessageController.pushMessageGeneral('You wake up!');
        MessageController.pushMessageStory(`You wake up! You open your eyes, alive and young again. You are weak, but all you went through will push you to even greater heights.`);
    }

    // functions

    /**
     * Creates a separate thread that waits a time in milliseconds.
     * Use this with 'await' to make the current thread do nothing for some time.
     * Minimum value is 4ms - limited by setTimeout
     * @param ms a number in milisseconds
     * @returns 
     */
    private sleep(ms: any) {
        return new Promise(resolve => setTimeout(resolve, ms));  // Define sleep
    }
    
    /**
     * Changes game speed to paused
     */
    doPauseGame() {
        this.isPaused = true;
        this.speedBtnSelected = 0;
    }
    
    /**
     * Changes game speed to normal speed
     */
    doChangeGameSpeedNormal() {
        this.isPaused = false;
        this.gameSpeed = 0.5;
        this.speedBtnSelected = 1;
    }
    
    doChangeGameSpeed2x() {
        this.isPaused = false;
        this.gameSpeed = 1;
        this.speedBtnSelected = 2;
    }
    
    doChangeGameSpeed5x() {
        this.isPaused = false;
        this.gameSpeed = 2.5;
        this.speedBtnSelected = 3;
    }

    doChangeGameSpeed10x() {
        this.isPaused = false;
        this.gameSpeed = 5;
        this.speedBtnSelected = 4;
    }

    doChangeGameSpeed50x() {
        this.isPaused = false;
        this.gameSpeed = 25;
        this.speedBtnSelected = 5;
    }

    selectContent(contentId = MainContentEnum.ACTIVITIES) {
        this.selectedContent = contentId;
    }
  
    private addDayCalendar() {        
        if (Calendar.incrementDay()) {
            
            if (CharacterController.ageCharacter1Year()) {
                ModalController.setCurrentModal((CharacterController.getDeathCount() > 0) ? ModalTypeEnum.DEATH : ModalTypeEnum.DEATH_FIRST)
            } else {
                //character still alive
                if (EventController.getNextMilestoneYear() == Calendar.getYear()) {
                    EventController.doEventMilestone();
                }
            }
    
        }        
    }

    private doGameLoop() {
        new Promise(async () => {
            /* 1 tick is 100 ms */
            /* 1 day is X amount of ticks */
            /* 365 days in a year */
            /* game speed reduces tick time */
            
            startAutoSaveTimer();
            const ticksPerFightRound = 6; // how many ms for a small day tick
            // a day has MAX_TICK_DAY of walks
            // keep it above 3, so hydration works properly
            while(this.isGameWorking) {
                await this.sleep(100 / this.gameSpeed);
                if (!this.isPaused && ModalController.getCurrentModal() == ModalTypeEnum.NOTHING) {
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
                // TODO - ui must be updated based on react hooks, not by forcing dom changes

                // update UI
                this.updateUIState();
            }
        });
    }

    private updateUIState() {
        //this check is required so typescript compiler wont complain and choke
        if (typeof document == "undefined") {
            return;
        }

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
            //load data from storage if exists
            load_from_localstorage();
            this.doGameLoop();
        }
    }
    
    doAfterDeathModalClick() {
        this.doReviveCharacter();
        this.selectContent();
        //recreate areas
        ExplorationController.reset();
        ActivitiesController.softReset();
        MarketController.reset();
        EventController.reset();

        //unlock content from what is kept on character revival
        ContentUnlockController.unlockContent();
        EventCreator.createEvents();
        ModalController.clearModal();
    }
      
}