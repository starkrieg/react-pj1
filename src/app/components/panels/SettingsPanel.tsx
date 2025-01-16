'use client'

import Link from "next/link";
import { appVersion, saveFileVersion, storage_save_key } from '../../properties/properties'
import Button from "../Button";
import { ActivitiesController } from "@/app/data/activities/ActivitiesController";
import { ExplorationController } from "@/app/data/exploration/ExplorationController";
import { MessageController } from "@/app/data/messages/MessageController";
import { ModalController } from "@/app/data/modal/ModalController";
import { MarketController } from "@/app/data/market/MarketController";
import { EventController } from "@/app/data/events/EventController";
import { CharacterController } from "@/app/data/character/CharacterController";
import { Calendar } from "@/app/data/Calendar";

let lastSave: string = 'Never';

let jsonGameData: string = '';

type loadedDataType = {
  metadata: {},
  data: {
    activities: {},
    exploration: {},
    messages: {},
    modals: {},
    markets: {},
    events: {},
    calendar: {},
    character: {}  
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

  ActivitiesController.importSaveData(loadedData.data.activities);
  ExplorationController.importSaveData(loadedData.data.exploration);
  MessageController.importSaveData(loadedData.data.messages);
  ModalController.importSaveData(loadedData.data.modals)
  // market import will import item upgrades bought too
  MarketController.importSaveData(loadedData.data.markets)
  EventController.importSaveData(loadedData.data.events)
  Calendar.importSaveData(loadedData.data.calendar)
  //CharacterController.importSaveData(loadedData.data.character)
  
  // go through the loaded data

} //core function for loading

/**
 * loads the game from localStorage
 * it's called when page is refreshed, so there's no need for it to reset anything
 */
export function load_from_localstorage() {
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

const processInputFile = (event: Event) => {
  //get file and perform operations here
  const target = event.target as HTMLInputElement;

  if (target && target.files && target.files.length > 0) {
    const file = target.files[0];
    const isTxtFile = file.name.endsWith('.txt') && file.type == 'text/plain';
    if (!isTxtFile) {
      alert('Invalid file!');
    } else {
      var reader = new FileReader();

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

const doSaveGame = () => {
  //compile relevant data
  const gameData = {
    metadata: {
      gameVersion: appVersion,
      fileVersion: saveFileVersion
    },
    data: {
      activities: ActivitiesController.exportSaveData(),
      exploration: ExplorationController.exportSaveData(),
      messages: MessageController.exportSaveData(),
      modals: ModalController.exportSaveData(),
      markets: MarketController.exportSaveData(),
      events: EventController.exportSaveData(),
      calendar: Calendar.exportSaveData(),
      //character: CharacterController.exportSaveData()
    }
  }
  // turn data into json
  jsonGameData = JSON.stringify(gameData);
  // store data on browser cache
  localStorage.setItem(storage_save_key, jsonGameData);

  // update label
  lastSave = new Date().toLocaleString();
}

const doDownloadSaveFile = () => {
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

const doLoadGame = () => {
  const inputTag = document.createElement('input')
  inputTag.type = 'file';
  inputTag.accept = '.txt';
  inputTag.multiple = false;
  inputTag.onchange = processInputFile;
  inputTag.click();
}

export default function SettingsPanel(hardResetClick: () => void) {

    const button = Button(
      'Hard Reset',
      hardResetClick,
      '',
      {
        color: 'var(--ivory_white)',
        backgroundColor: 'red',
        borderRadius: 5,
        padding: 5,
        fontWeight: 'bold',
        marginTop: 20
      }
    );

    const saveGame = Button(
      'Save game',
      doSaveGame,
      '',
      {
        color: 'var(--ivory_white)',
        backgroundColor: 'black',
        borderRadius: 5,
        padding: 5,
        fontWeight: 'bold',
        marginTop: 20
      }
    );

    const downloadSaveFile = Button(
      'Download Save File',
      doDownloadSaveFile,
      '',
      {
        color: 'var(--ivory_white)',
        backgroundColor: 'black',
        borderRadius: 5,
        padding: 5,
        fontWeight: 'bold',
        marginTop: 20
      }
    );

    const loadGame = Button(
      'Load game',
      doLoadGame,
      '',
      {
        color: 'var(--ivory_white)',
        backgroundColor: 'black',
        borderRadius: 5,
        padding: 5,
        fontWeight: 'bold',
        marginTop: 20
      }
    );

    return (
      <div>
          <Link href="/changelog" target="_blank">{ appVersion } - Change log</Link>
          <p/>
          <div>
            Last save: { lastSave }
          </div>
          { button }
          { saveGame }
          { downloadSaveFile }
          { loadGame }
      </div>
    );
    
}