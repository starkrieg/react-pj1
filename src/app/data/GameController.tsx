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
import { ActivitiesEnum } from "./activities/ActivitiesEnum";
import { ItemController } from "./items/ItemController";
import { ItemTypeEnum } from "./items/ItemTypeEnum";
import { ItemIdEnum } from "./items/ItemIdEnum";
import { ModalController } from "./modal/ModalController";
import { ActivitiesController } from "./activities/ActivitiesController";
import { CultivateQi } from "./activities/CultivateQi";
import { PhysicalTraining } from "./activities/PhysicalTraining";
import { OddJobs } from "./activities/OddJobs";
import { ErrorController } from "./utils/ErrorController";

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
            ActivitiesController.reset();
            ExplorationController.reset();
            MessageController.reset();
            ModalController.reset();

            this.setupBasicData();
        }
    }

    private setupBasicData() {
        this.calendar.resetDefaultValues();
        CharacterController.character.firstStartCharacter();

        //items come first
        this.createBasicItems();

        //zones depend on items for rewards
        this.createBasicZones();
        
        //activities 
        this.createBasicActivities();
        /*
            setup flags for game start
        */
        this.modalType = ModalTypeEnum.GAME_START;
    }

    private createBasicItems() {
        ItemController.createItem(
            ItemIdEnum.QI_CULTIVATION_KNOWLEDGE,
            ItemTypeEnum.PERMANENT,
            'Qi Cultivation Technique'
        )
        ItemController.createItem(
            ItemIdEnum.CULTIVATION_FOUNDATION_KNOWLEDGE,
            ItemTypeEnum.PERMANENT,
            'Cultivation Foundation Knowledge'
        );
        ItemController.createItem(
            ItemIdEnum.FOREST_MAP,
            ItemTypeEnum.PERMANENT,
            'A guide on the outside forest and its surroundings'
        );
        ItemController.createItem(
            ItemIdEnum.HAUNTED_HOUSE_KEY,
            ItemTypeEnum.TEMPORARY,
            'An iron key that unlocks a door or something'
        );
    }

    private createBasicZones() {
        ExplorationController.createExplorableZone(
            ExploreZoneIdEnum.VILLAGE_DOJO,
            'Village Dojo',
            'Face off against some wood dolls and novice warriors',
            10,
            1,
            [
                ItemIdEnum.QI_CULTIVATION_KNOWLEDGE,
                ItemIdEnum.FOREST_MAP
            ]
        );
    }

    private createBasicActivities() {
        const character = CharacterController.character;
        
        ActivitiesController.createActivity(new PhysicalTraining(character));
        ActivitiesController.createActivity(new OddJobs(character));
    }

    static unlockGameFromItem(itemId: ItemIdEnum | undefined) {
        if (!itemId) {
            ErrorController.throwSomethingWrongError();
            return
        }

        //give the character the item
        CharacterController.character.giveItem(itemId);

        //check what is unlocked after getting item
        if (itemId == ItemIdEnum.QI_CULTIVATION_KNOWLEDGE) {
            //unlock activity to cultivate qi
            ActivitiesController.createActivity(new CultivateQi(CharacterController.character));
            
            //unlock zone forest outside village
            ExplorationController.createExplorableZone(
                ExploreZoneIdEnum.FOREST_OUTSIDE_VILLAGE_1,
                'Forest outside village',
                'Many trees and some rough paths. Watch out for animals or bandits.',
                10,
                2,
                [
                    ItemIdEnum.HAUNTED_HOUSE_KEY
                ]
            );
        } else if (itemId == ItemIdEnum.HAUNTED_HOUSE_KEY) {
            //unlock zone forest outside village
            ExplorationController.createExplorableZone(
                ExploreZoneIdEnum.VILLAGE_HAUNTED_HOUSE,
                'Old and scary house inside the village',
                'Run down and moldy, an old house known for being cursed',
                20,
                100,
                [
                    //no reward right now
                ]
            );
        }

        //add references to unlocked zones later
    }

    private doReviveCharacter() {
        this.calendar.resetDefaultValues();
        CharacterController.character.reviveCharacter();
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
            CharacterController.character.year += 1;
        }
        
        if (CharacterController.character.year >= CharacterController.character.maxAge) {
            this.modalType = (CharacterController.character.deaths > 0) ? ModalTypeEnum.DEATH : ModalTypeEnum.DEATH_FIRST
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
                        } else if(ActivitiesController.selectedActivity != ActivitiesEnum.NOTHING) {
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
        this.doCloseModal();
    }
      
}