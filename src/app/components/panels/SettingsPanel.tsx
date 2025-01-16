'use client'

import Link from "next/link";
import { appVersion } from '../../properties/properties'
import Button from "../Button";
import { doDownloadSaveFile, doLoadGame, doSaveGame, lastSave, resetEverything } from "@/app/data/SaveDataController";

export default function SettingsPanel() {

    const hardResetButton = Button(
      'Hard Reset',
      resetEverything,
      'settings-button hard-reset-button'
    );

    const saveGame = Button(
      'Save',
      doSaveGame,
      'settings-button'
    );

    const downloadSaveFile = Button(
      'Export Save',
      doDownloadSaveFile,
      'settings-button'
    );

    const loadGame = Button(
      'Load game',
      doLoadGame,
      'settings-button'
    );

    return (
      <div className="settings-div">
          { saveGame }
          { downloadSaveFile }
          { loadGame }
          <div className="settings-save-time">
            Last save: { lastSave }
          </div>
          <div className="settings-version">
            <Link className="settings-changelog" href="/changelog" target="_blank">
              { appVersion } / Change log
          </Link>
          </div>
          { hardResetButton }
      </div>
    );
    
}