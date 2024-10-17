'use client'

import Link from "next/link";
import { appVersion } from '../properties/properties';
import CentralController from "./CentralController";

export default class SettingsPanel {

    centralController: CentralController;

    constructor(centralController: CentralController) {
      this.centralController = centralController;
    }

    createSettingsPanel() {
      return (
        <div>
            <button style={{
                  backgroundColor: 'orangered',
                  borderRadius: 5,
                  padding: 4,
                  fontWeight: 'bold'
                }}
                onClick={this.centralController.resetEverything.bind(this.centralController)}
                >Reset everything</button>
            <p>{appVersion}</p>
            <Link href="/changelog" target="_blank">Change log</Link>
        </div>
      );
    }
}