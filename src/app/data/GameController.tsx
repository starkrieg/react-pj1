'use client'

import { createRoot } from "react-dom/client";

import { Calendar } from "./Calendar";
import { Character } from "./Character";
import { MessageController } from "./MessageController";
import { ActivitiesController } from "./ActivitiesController";
import { CharacterController } from "./CharacterController";
import { ModalController } from "./ModalController";
import { GameState } from "../components/GameState";
import { MainContentEnum } from "./MainContentEnum";
import { ModalTypeEnum } from "./ModalTypeEnum";
import { ExplorationController } from "./ExplorationController";
import { ExploreZoneEnum } from "./zones/ExploreZoneEnum";
import { ActivitiesEnum } from "./activities/ActivitiesEnum";

export default class GameController {

    modalController: ModalController;
    messageController: MessageController;
    activitiesController: ActivitiesController;
    explorationController: ExplorationController;
    characterController: CharacterController;

    globalRoot: any;

    // mechanic 
    isGameWorking = false;
    isPaused = false;
    gameSpeed = 1;

    modalType = ModalTypeEnum.NOTHING;

    selectedContent = MainContentEnum.JOURNAL;

    calendar: Calendar;
    character: Character;

    constructor() {
        this.calendar = new Calendar();
        this.character = new Character();

        // components
        this.modalController = new ModalController(this);
        this.messageController = new MessageController();
        this.activitiesController = new ActivitiesController(this);
        this.explorationController = new ExplorationController();
        this.characterController = new CharacterController();
        
        this.globalRoot = undefined;
    }

    public resetEverything() {
        const ans = confirm('Reset everything. Are you sure?');
        if (ans) {
            this.activitiesController.reset();
            this.explorationController.reset();
            
            this.messageController.reset();
            this.modalController.reset();
            this.firstStartCharacter();
        }
    }

    private firstStartCharacter() {
        this.calendar.resetDefaultValues();
        this.character.firstStartCharacter();
        /*
            setup flags for game start
        */
        this.modalType = ModalTypeEnum.GAME_START;
        console.log('Alive!');
    }

    private doReviveCharacter() {
        this.calendar.resetDefaultValues();
        this.character.reviveCharacter();
        this.messageController.pushMessage(this.character.year, 
            this.character.day, 'You are alive!');
        console.log('Alive!');
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
            this.character.year += 1;
        }
        
        if (this.character.year >= this.character.maxAge) {
            this.modalType = (this.character.deaths > 0) ? ModalTypeEnum.DEATH : ModalTypeEnum.DEATH_FIRST
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
                        if (this.explorationController.selectedZone != ExploreZoneEnum.NOTHING) {
                            //if exploring, then cant work on selected activity
                            //only do explore here
                            this.explorationController.doExploreSelectedZone()
                        } else if(this.activitiesController.selectedActivity != ActivitiesEnum.NOTHING) {
                            //only do activity if not exploring
                            //and only if selected one activity
                            this.activitiesController.doActivityTick();
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
            this.firstStartCharacter();
            this.doGameLoop();
        }
    }

    doCloseModal() {
        this.modalType = ModalTypeEnum.NOTHING;
    }
    
    doAfterDeathModalClick() {
        this.doReviveCharacter();
        this.doCloseModal();
    }
      
}