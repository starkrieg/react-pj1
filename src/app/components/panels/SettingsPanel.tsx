'use client'

import Link from "next/link";
import CentralController from "../CentralController";
import { appVersion } from '../../properties/properties'

export default class SettingsPanel {

    centralController: CentralController;

    constructor(centralController: CentralController) {
      this.centralController = centralController;
    }

    createSettingsPanel() {
      return (
        <div>
            <Link href="/changelog" target="_blank">{appVersion} - Change log</Link>
            <p/>
            <button style={{
                  backgroundColor: 'orangered',
                  borderRadius: 5,
                  padding: 4,
                  fontWeight: 'bold',
                  marginTop: 20
                }}
                onClick={this.centralController.resetEverything.bind(this.centralController)}
                >Hard Reset</button>
        </div>
      );
    }
}