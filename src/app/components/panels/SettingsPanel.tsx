'use client'

import Link from "next/link";
import { appVersion } from '../../properties/properties'
import Button from "../Button";

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

    return (
      <div>
          <Link href="/changelog" target="_blank">{ appVersion } - Change log</Link>
          <p/>
          { button }
      </div>
    );
    
}