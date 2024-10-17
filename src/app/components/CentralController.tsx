'use client'

import { createRoot } from "react-dom/client";
import ActivitiesPanel from "./ActivitiesPanel";
import CalendarPanel from "./CalendarPanel";
import MessagesPanel from "./MessagesPanel";
import ModalController from "./ModalController";

import { Calendar } from "./Calendar";
import { Character } from "./Character";
import CharacterPanel from "./CharacterPanel";
import SettingsPanel from "./SettingsPanel";

export default class CentralController {

    modalController: ModalController;
    characterPanel: CharacterPanel;
    activitiesPanel: ActivitiesPanel;
    settingsPanel: SettingsPanel;
    messagesPanel: MessagesPanel;
    calendarPanel: CalendarPanel;

    globalRoot: any;

    // mechanic 
    isGameWorking = false;
    isPaused = false;
    gameSpeed = 1;
    isDead = false;
    isModalVisible = false;
    modalType = '';

    selectedContent = 'Activities';

    calendar: Calendar;
    character: Character;

    constructor() {
        this.calendar = new Calendar();
        this.character = new Character();

        // components
        this.modalController = new ModalController();
        this.characterPanel = new CharacterPanel();
        this.activitiesPanel = new ActivitiesPanel(this);
        this.messagesPanel = new MessagesPanel();
        this.calendarPanel = new CalendarPanel();
        this.settingsPanel = new SettingsPanel(this);

        this.globalRoot = undefined;
    }

    public resetEverything() {
        const ans = confirm('Reset everything. Are you sure?');
        if (ans) {
            this.activitiesPanel.reset();
            this.messagesPanel.reset();
            this.doMakeCharacterAlive();
        }
    }

    private defaultCalendarSetup() {
        this.calendar.resetDefaultValues();
        this.character.resetDefaultValues();
    }

    private doMakeCharacterAlive() {
        //reset calendar
        //reset character
        this.defaultCalendarSetup();
        this.messagesPanel.pushToMessageBoard(this.character.year, this.character.day, 'You are alive!');
        this.isDead = false;
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
            this.isDead = true;
            this.messagesPanel.pushToMessageBoard(this.character.year, 
                this.character.day, 
                'You cannot sustain life anymore. You died!');
            this.isModalVisible = true;
            this.modalType = 'Death';
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
                if (!this.isPaused && !this.isDead) {
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
            this.doMakeCharacterAlive();
            console.log('Start!');
            this.doGameLoop();
        }
    }

    public getStatePage() {
        return (
          <div className="container">
            {this.getModal()}
            <div id="row-0" className="row">
              <div className="col-4">
              
                <div className="panel">
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button onClick={this.pauseGame.bind(this)}>Pause</button>
                    <button onClick={this.unpauseGame.bind(this)}>1x</button>
                    <button onClick={this.speedUp2Game.bind(this)}>2x</button>
                    <button onClick={this.speedUp5Game.bind(this)}>5x</button>
                    <button onClick={this.speedUp10Game.bind(this)}>10x</button>
                    <button onClick={this.speedUp100Game.bind(this)}>100x</button>
                  </div>
      
                  {this.calendarPanel.createCalendarPanel(this.calendar, this.character, 
                    this.activitiesPanel.getSelectedActivityTitle())}
                </div>
      
                <div className="panel">
                  {this.messagesPanel.createMessagesPanel()}              
                </div>
      
              </div>
              
              <div className="panel col-8">
                <div style={{ display: 'flex', gap: 10,
                  borderBottomColor: 'black',
                  borderBottomStyle: 'solid',
                  borderBottomWidth: 1,
                  marginBottom: 15
                 }}>
                  <button onClick={() => this.selectContent('Character')}>Character</button>
                  <button onClick={() => this.selectContent('Activities')}>Activities</button>
                  <button onClick={() => this.selectContent('Settings')}>Settings</button>
                </div>
      
                {this.createContent(this.selectedContent)}
                
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
                return this.settingsPanel.createSettingsPanel();
            default:
                return (
                    <div>
                        <p>Something went wrong. Please report this.</p>
                    </div>
                );
        }
    }
    
    private doAfterDeathModalClick() {
        //check game state
        if (this.isDead) {
            this.doMakeCharacterAlive();
            this.isModalVisible = false;
        }
    }
    
    private getModal() {
        if (!this.isModalVisible) {
            return '';
        } else {
            return this.modalController.createModal(this.modalType, this.doAfterDeathModalClick.bind(this));
        }
    }
      
}