'use client'

import { createRoot } from "react-dom/client";
import MessagesPanel from "./panels/MessagesPanel";
import ModalController from "./ModalController";

import { Calendar } from "../data/Calendar";
import { Character } from "../data/Character";
import ActivitiesPanel from "./panels/ActivitiesPanel";
import CharacterPanel from "./panels/CharacterPanel";
import CalendarPanel from "./panels/CalendarPanel";
import SettingsPanel from "./panels/SettingsPanel";
import Button from "./Button";

export default class CentralController {

    modalController: ModalController;
    
    characterPanel: CharacterPanel;
    activitiesPanel: ActivitiesPanel;
    messagePanel: MessagesPanel;
    calendarPanel: CalendarPanel;

    globalRoot: any;

    // mechanic 
    isGameWorking = false;
    isPaused = false;
    gameSpeed = 1;

    isModalVisible = false;
    modalType = '';

    selectedContent = 'Character';

    calendar: Calendar;
    character: Character;

    constructor() {
        this.calendar = new Calendar();
        this.character = new Character();

        // components
        this.modalController = new ModalController(this);
        this.characterPanel = new CharacterPanel();
        this.activitiesPanel = new ActivitiesPanel(this);
        this.messagePanel = new MessagesPanel();
        this.calendarPanel = new CalendarPanel();

        this.globalRoot = undefined;
    }

    public resetEverything() {
        const ans = confirm('Reset everything. Are you sure?');
        if (ans) {
            this.activitiesPanel.reset();
            this.messagePanel.reset();
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
        this.modalType = 'game-start';
        this.isModalVisible = true;
        console.log('Alive!');
    }

    private doReviveCharacter() {
        this.calendar.resetDefaultValues();
        this.character.reviveCharacter();
        this.messagePanel.pushToMessageBoard(this.character.year, 
            this.character.day, 'You are alive!');
        console.log('Alive!');
    }

    // functions

    private sleep(ms: any) {
        return new Promise(resolve => setTimeout(resolve, ms));  // Define sleep
    }
    
    private pauseGame() {
        this.isPaused = true;
    }
    
    private unpauseGame() {
        this.isPaused = false;
        this.gameSpeed = 1;
    }
    
    private speedUp2Game() {
        this.isPaused = false;
        this.gameSpeed = 2;
    }
    
    private speedUp5Game() {
        this.isPaused = false;
        this.gameSpeed = 5;
    }

    private speedUp10Game() {
        this.isPaused = false;
        this.gameSpeed = 10;
    }

    private speedUp100Game() {
        this.isPaused = false;
        this.gameSpeed = 50;
    }

    private selectContent(contentId = 'Character') {
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
            this.isModalVisible = true;

            this.modalType = (this.character.deaths > 0) ? 'death' : 'death-first'
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
                if (!this.isPaused && !this.isModalVisible) {
                    tickCount += 1
                    while (tickCount >= dayTickReq) {
                        tickCount += -dayTickReq
                        this.activitiesPanel.doActivityTick();
                        this.addDayCalendar();
                    }
                }
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
            this.globalRoot.render(this.getStatePage());
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

    public getStatePage() {
        return (
          <div className="container">
            {this.getModal()}
            <div id="row-0" className="row">
                <div className="col-3">
              
                <div className="panel">
                  <div style={{ display: 'flex', gap: 10 }}>
                    { Button('Pause', '', {}, this.pauseGame.bind(this)) }
                    { Button('1x', '', {}, this.unpauseGame.bind(this)) }
                    { Button('2x', '', {}, this.speedUp2Game.bind(this)) }
                    { Button('5x', '', {}, this.speedUp5Game.bind(this)) }
                    { Button('10x', '', {}, this.speedUp10Game.bind(this)) }
                    { Button('100x', '', {}, this.speedUp100Game.bind(this)) }
                  </div>
      
                  {this.calendarPanel.createCalendarPanel(this.calendar, this.character, 
                    this.activitiesPanel.getSelectedActivityTitle())}
                </div>
      
                </div>
                
                <div className="panel col-6">
                <div style={{ display: 'flex', gap: 10,
                    borderBottomColor: 'black',
                    borderBottomStyle: 'solid',
                    borderBottomWidth: 1,
                    marginBottom: 15
                    }}>
                    { Button('Character', '', {}, this.selectContent.bind(this, 'Character')) }
                    { Button('Activities', '', {}, this.selectContent.bind(this, 'Activities')) }
                    { Button('Settings', '', {}, this.selectContent.bind(this, 'Settings')) }
                </div>
        
                {this.createContent(this.selectedContent)}
                
                </div>

                <div className="panel col-3">
                  {this.messagePanel.createMessagesPanel()}              
                </div>
            </div>
            
            
          </div>
        );
    }
    
    private createContent(contentId = 'Character') {
        switch(contentId) {
            case 'Character':
                return this.characterPanel.createCharacterPanel(this.character);
            case 'Activities':
                return this.activitiesPanel.createActivitiesPanel();
            case 'Settings':
                return SettingsPanel(this.resetEverything.bind(this));
            default:
                return (
                    <div>
                        <p>Something went wrong. Please report this.</p>
                    </div>
                );
        }
    }

    private doCloseModal() {
        this.isModalVisible = false;
        this.modalType = '';
        this.modalController.modalType = '';
    }
    
    private doAfterDeathModalClick() {
        this.doReviveCharacter();
        this.doCloseModal();
    }
    
    private getModal() {
        if (!this.isModalVisible) {
            return '';
        } else {
            const modalFunction = this.getModalFunction();
            return this.modalController.createModal(this.modalType, modalFunction.bind(this));
        }
    }

    private getModalFunction() {
        switch (this.modalType) {
            case 'death':
            case 'death-first':
                return this.doAfterDeathModalClick;
            default:
                return this.doCloseModal;
        }
    }
      
}