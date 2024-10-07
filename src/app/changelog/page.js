'use client'

import { appVersion } from '../properties/properties';

export default function Changelog() {
  return (
    <div style={{margin: 10}}>
      Changelog - {appVersion}
      <ul style={{marginTop: 10}}>

        <li style={{marginTop: 10}}>
          <p>v.0.1.1 - alpha / 2024-Oct-07</p>
          <p>Overview: Changes to existing features</p>
          <div>
            Additions:
            <p/>- Changed Money to Coins.
            <p/>- Added a label for current activity on the left panel.
            <p/>- Added Qi and Body to left panel.
            <p/>- Qi now shows a percentage of how much of your capacity is filled up.
            <p/>- Added ranks to Activities. An activity increase in rank after being done for a period of time. 
            Higher rank means increased gains.
            <p/>- Added progress bar to Activities to track the rank up.
            <p/>- Added button inside settings to reset everything.
          </div>
        </li>

        <li style={{marginTop: 10}}>
          <p>v.0.1.0 - alpha / 2024-Oct-03</p>
          <p>Definition: Game is an Idle related to Wuxia/Xianxia/Cultivation</p>
          <p>Focus: core features and code structure</p>
          <p>Ignored: UI positions and colors</p>

          <div>
            Created game with:
            <p/>- pause and speed control, up to 2x speed. Game time is 1 month per 2 seconds.
            <p/>- panel with event messages, with messages that show. Limit of 10 last messages.
            <p/>- section for character info, with info. Character max age is considered and game ends when max age is reached.
            <p/>- section for activities, with a few options. Options are working, and character info is updated.
            <p/>- section for settings. Missing info
            <p/>- modal is shown when character dies, and with option to start over
          </div>
        </li>

      </ul>
    </div>
  );
}
