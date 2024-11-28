'use client'

import { createRoot } from "react-dom/client";

import { Calendar } from "./Calendar";
import { MessageController } from "./messages/MessageController";

import { CharacterController } from "./character/CharacterController";
import { GameState } from "../components/GameState";
import { MainContentEnum } from "./MainContentEnum";
import { ModalTypeEnum } from "./modal/ModalTypeEnum";
import { ExplorationController } from "./exploration/ExplorationController";
import { ExploreZoneIdEnum } from "./exploration/ExploreZoneIdEnum";
import { ActivityEnum } from "./activities/ActivityEnum";
import { ModalController } from "./modal/ModalController";
import { ActivitiesController } from "./activities/ActivitiesController";
import ItemCreator from "./items/ItemCreator";
import ZoneCreator from "./exploration/ZoneCreator";
import ActivityCreator from "./activities/ActivityCreator";
import { ItemUnlockController } from "./items/ItemUnlockController";

export default class GameController {

    globalRoot: any;

    // mechanic 
    isGameWorking = false;
    isPaused = false;
    gameSpeed = 1;

    modalType = ModalTypeEnum.NOTHING;

    selectedContent = MainContentEnum.JOURNAL;

    calendar: Calendar;

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

    private setupBasicData() {
        this.calendar.resetDefaultValues();
        CharacterController.startFirstCharacter();

        //items come first
        ItemCreator.createItems();

        //zones depend on items for rewards
        ZoneCreator.createZones();
        
        //activities 
        ActivityCreator.createActivities();
        
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
    
    unpauseGame() {
        this.isPaused = false;
        this.gameSpeed = 1;
    }
    
    speedUp2Game() {
        this.isPaused = false;
        this.gameSpeed = 2;
    }
    
    speedUp5Game() {
        this.isPaused = false;
        this.gameSpeed = 5;
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
                this.modalType = (CharacterController.getDeathNumber() > 0) ? ModalTypeEnum.DEATH : ModalTypeEnum.DEATH_FIRST
            }
    
        }        
    }

    private doGameLoop() {
        return new Promise(async () => {
            /* 1 tick is 100 ms */
            /* 1 day is X amount of ticks */
            /* 365 days in a year */
            /* game speed reduces tick time */
            
            let tickCount = 0;
            const dayTickReq = 6; // how many ticks for day change
            // keep it above 3, so hydration works properly
            while(this.isGameWorking) {
                await this.sleep(100 / this.gameSpeed);
                if (!this.isPaused && this.modalType == ModalTypeEnum.NOTHING) {
                    tickCount += 1
                    while (tickCount >= dayTickReq) {
                        tickCount += -dayTickReq
                        
                        // check if doing anything
                        if (ExplorationController.selectedZoneId != ExploreZoneIdEnum.NOTHING) {
                            //if exploring, then cant work on selected activity
                            //only do explore here
                            ExplorationController.doExploreSelectedZone()
                        } else if(ActivitiesController.selectedActivity != ActivityEnum.NOTHING) {
                            //only do activity if not exploring
                            //and only if selected one activity
                            ActivitiesController.doActivityTick();
                        }
                        //day will pass anyway
                        this.addDayCalendar();
                    }
                }
                // ui must be updated based on react hooks, not forced by dom changes
                // update
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
        //create zones again since they were removed
        ZoneCreator.createZones();    
        //create activities again since they were removed
        ActivityCreator.createActivities();

        CharacterController.getItemList().forEach(itemId => {
            ItemUnlockController.unlockThingsFromItem(itemId)
        });
        
        this.doCloseModal();
    }
      
}