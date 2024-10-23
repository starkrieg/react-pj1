'use client'

import Link from "next/link";
import { appVersion } from '../../properties/properties'
import Button from "../Button";

export default function SettingsPanel(hardResetClick: () => void) {

    const button = Button(
      'Hard Reset',
      '',
      {
        backgroundColor: 'orangered',
        borderRadius: 5,
        padding: 4,
        fontWeight: 'bold',
        marginTop: 20
      },
      hardResetClick
    );

    return (
      <div>
          <Link href="/changelog" target="_blank">{ appVersion } - Change log</Link>
          <p/>
          { button }
      </div>
    );
    
}