
import { ActivitiesController } from "@/app/data/activities/ActivitiesController";
import { ExplorationController } from "@/app/data/exploration/ExplorationController";
import { MessageController } from "@/app/data/messages/MessageController";
import { ModalController } from "@/app/data/modal/ModalController";
import { MarketController } from "@/app/data/market/MarketController";
import { EventController } from "@/app/data/events/EventController";
import { CharacterController } from "@/app/data/character/CharacterController";
import { Calendar } from "@/app/data/Calendar";
import { appVersion, saveFileVersion, storage_save_key } from "../properties/properties";

export let lastSave: string = 'Never';

let jsonGameData: string = '';

const AUTO_SAVE_TIMER_IN_SEC = 30;
let time_until_auto_save_in_sec = 0;

export function getTimeUntilAutoSaveInSec() : Readonly<number> {
  return time_until_auto_save_in_sec;
}

export function startAutoSaveTimer() {
  //this check is required so typescript wont run the promise on the wrong place
  if (!isOnBrowser()) {
    return;
  }

  function sleep(ms: any) {
    return new Promise(resolve => setTimeout(resolve, ms));  // Define sleep
  }

  new Promise(async () => {
    time_until_auto_save_in_sec = AUTO_SAVE_TIMER_IN_SEC;
    while(time_until_auto_save_in_sec > -1) {
      await sleep(1000); // wait 1 second to run
      time_until_auto_save_in_sec += -1;
      if (time_until_auto_save_in_sec < 1) {
        // timer is reset after save
        doSaveGame();
      }
    }
    console.error('Something went wrong when auto saving')
  });   
}

type loadedDataType = {
  metadata: Record<string, any>,
  data: {
    activities: Record<string, any>,
    exploration: Record<string, any>,
    messages: Record<string, any>,
    modals: Record<string, any>,
    markets: Record<string, any>,
    events: Record<string, any>,
    calendar: Record<string, any>,
    character: Record<string, any>  
  }
}

/**
 * Single method to load save data from a JSON string
 * @param save_data JSON string with the save data
 * @returns 
 */
function load(save_data: string) {
  //single loading method
  if (save_data == '') {
    return;
  }

  const loadedData: loadedDataType = JSON.parse(save_data);

  //character runs first, to add all itens to inventory
  CharacterController.importSaveData(loadedData.data.character)
  ActivitiesController.importSaveData(loadedData.data.activities);
  ExplorationController.importSaveData(loadedData.data.exploration);
  MessageController.importSaveData(loadedData.data.messages);
  ModalController.importSaveData(loadedData.data.modals)
  // market import will import item upgrades bought too
  MarketController.importSaveData(loadedData.data.markets)
  EventController.importSaveData(loadedData.data.events)
  Calendar.importSaveData(loadedData.data.calendar)
  
  //after everything is setup, recalculate all character data
  CharacterController.getCharacter().performDataUpdate();

  //update last save
  lastSave = loadedData.metadata.date;

  // go through the loaded data

} //core function for loading

function isOnBrowser() {
  return (typeof window !== "undefined");
}

/**
 * loads the game from localStorage
 * it's called when page is refreshed, so there's no need for it to reset anything
 */
export function load_from_localstorage() {
  //this check is required so typescript compiler wont complain and choke
  if (!isOnBrowser()) {
    return;
  }

  try{
      load(localStorage.getItem(storage_save_key) || '');
  } catch(error) {
      //alert('Something went wrong on loading from localStorage!');
      console.error('Something went wrong on loading from localStorage!');
      console.error(error);
  }
}

/**
 * called from index.html
 * loads game from file by resetting everything that needs to be reset and then calling main loading method with same parameter
 * @param {String} save_string 
 */
function load_from_file(save_string: string) {
  //this check is required so typescript compiler wont complain and choke
  if (!isOnBrowser()) {
    return;
  }

  try{
    // atob() decodes from base64
    const jsonGameData = atob(save_string);
    // parse the JSON to check the metadata
    const loadedGameData = JSON.parse(jsonGameData);
    // check if file save metadata matches current version
    if (loadedGameData['metadata']
        && loadedGameData['metadata']['fileVersion'] == saveFileVersion) {
      //save format matches, then store the data as JSON
      localStorage.setItem(storage_save_key, jsonGameData);
      //reload page to apply content
      window.location.reload();
    } else {
      alert('Save file does not match current game version and cannot be loaded!')
    }
  } catch (error) {
      alert('Something went wrong when trying to load the file!')
      console.error('Something went wrong when trying to load the file!');
      console.error(error);
  }
} //called on loading from file, clears everything

export const doSaveGame = () => {
  //this check is required so typescript compiler wont complain and choke
  if (!isOnBrowser()) {
    return;
  }

  //compile relevant data
  const gameData = {
    metadata: {
      gameVersion: appVersion,
      fileVersion: saveFileVersion,
      date: new Date().toLocaleString()
    },
    data: {
      activities: ActivitiesController.exportSaveData(),
      exploration: ExplorationController.exportSaveData(),
      messages: MessageController.exportSaveData(),
      modals: ModalController.exportSaveData(),
      markets: MarketController.exportSaveData(),
      events: EventController.exportSaveData(),
      calendar: Calendar.exportSaveData(),
      character: CharacterController.exportSaveData()
    }
  }
  // turn data into json
  jsonGameData = JSON.stringify(gameData);
  // store data on browser cache
  localStorage.setItem(storage_save_key, jsonGameData);

  // update label
  lastSave = new Date().toLocaleString();
  // update auto save timer
  time_until_auto_save_in_sec = AUTO_SAVE_TIMER_IN_SEC;
}

export const doDownloadSaveFile = () => {
  //this check is required so typescript compiler wont complain and choke
  if (!isOnBrowser()) {
    return;
  }

  doSaveGame();
  
  // btoa() encodes into base64
  const blobData = new Blob([btoa(jsonGameData)], { type: "text/plain;charset=utf-8" });

  const url = window.URL || window.webkitURL;
  const link = url.createObjectURL(blobData);
  const aTag = document.createElement("a");
  aTag.download = `journey-beyond_${new Date().toLocaleString()}.txt`;
  aTag.href = link;
  aTag.click();
}

export const doLoadGame = () => {
  const inputTag = document.createElement('input')
  inputTag.type = 'file';
  inputTag.accept = '.txt';
  inputTag.multiple = false;
  inputTag.onchange = processInputFile;
  inputTag.click();
}

const processInputFile = (event: Event) => {
  //get file and perform operations here
  const target = event.target as HTMLInputElement;

  if (target && target.files && target.files.length > 0) {
    const file = target.files[0];
    const isTxtFile = file.name.endsWith('.txt') && file.type == 'text/plain';
    if (!isTxtFile) {
      alert('Invalid file!');
    } else {
      const reader = new FileReader();

      reader.onload = function() {
        load_from_file(reader.result as string);
      };

      reader.readAsText(file);

      target.value = ""; //necessary to allow loading same file more than once in a row without refreshing

      console.log(file);
      console.log(event);
    }
  }

}

export const resetEverything = () => {
  //this check is required so typescript compiler wont complain and choke
  if (!isOnBrowser()) {
    return;
  }

  const ans = confirm('Your progress will be erased and you will start from scratch. Are you sure?');
  if (ans) {
      localStorage.removeItem(storage_save_key);
      window.location.reload();
  }
}
