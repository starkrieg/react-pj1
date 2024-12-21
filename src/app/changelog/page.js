'use client'

import { appVersion } from '../properties/properties';

export default function Changelog() {
  return (
    <div style={{margin: 10}}>
      Changelog - {appVersion}
      <ul style={{marginTop: 10}}>

      <li style={{marginTop: 10}}>
        <p>v.0.3.3 - alpha / 2024-Dec-21</p>
        <p>Overview: Bug fixes</p>
        <div>
          Changes:
          <p>Fixed bug that hard reset would not reset levels</p>
          <p>Fixed bug that hard reset would break activities and zones</p>
        </div>
      </li>

      <li style={{marginTop: 10}}>
        <p>v.0.3.2 - alpha / 2024-Dec-20</p>
        <p>Overview: Bug fixes</p>
        <div>
          Changes:
          <p>Fixed bug that activities and zones were not ordered correctly</p>
          <p>Fixed bug that coins and injuries were not being reset after death</p>
          <p>Fixed bug that lifespan was not being increased after breakthroughs</p>
        </div>
      </li>

      <li style={{marginTop: 10}}>
        <p>v.0.3.1 - alpha / 2024-Dec-20</p>
        <p>Overview: Bug fixes</p>
        <div>
          Changes:
          <p>Fixed bug that Body and Qi would double when reaching their cap</p>
          <p>Fixed bug that after death, zones that were cleared before would not clear correctly</p>
          <p>Fixed bug that breaking through would stop working after Qi Condensation 1</p>
        </div>
      </li>

      <li style={{marginTop: 10}}>
        <p>v.0.3.0 - alpha / 2024-Dec-20</p>
        <p>Overview: Content rework, UI rework and combat rework</p>
        <div>
          Changes:
          <p>Improved UI (color, sizes, positions)</p>
          <p>Reworked content from scratch - more activities, zones and attributes</p>
          <p>- Fully exploring a zone now unlock more content (other zones and actions)</p>
          <p>Exploration changes (icons, health and power, enemy names, loot resources) </p>
          <p>- Loot ranges from coins to small direct attribute increases (no consumables, equipments or trinkets yet)</p>
          <p>Added a leveling system and experience bar, to go along with exploration fights</p>
          <p>- Level affects power and health only, and does not reset on death</p>
          <p>Added an &quot;Internal damage&quot; mechanic to go along with combat</p>
          <p>- Internal damage reduces maximum health and power</p>
          <p>- Increases with how much damage you take on fights</p>
          <p>- Reduces by passing time outside a combat zone</p>
          <p>Game speed is a bit faster, and calendar shows a tracker of day time</p>
          <p>Game speed buttons changed to include a 0.5x speed</p>
          <p>NOTE: coins still have no actual use other than feeling rich</p>
        </div>
      </li>

      <li style={{marginTop: 10}}>
          <p>v.0.2.2 - alpha / 2024-Nov-28</p>
          <p>Overview: Small expansion to exploration</p>
          <div>
            Changes:
            <p>- Changed some colors</p>
            <p>- Fully exploring an area gives a reward, that unlocks something</p>
            <p>- Rewards unlock new activies, places to explore, etc</p>
            <p>- Game content now has some visible progress, between training, exploring and breaking through</p>
          </div>
        </li>

        <li style={{marginTop: 10}}>
          <p>v.0.2.1 - alpha / 2024-Oct-17</p>
          <p>Overview: Some basic plotline and other small features</p>
          <div>
            Changes:
            <p>- Added Journal, to log the main story</p>
            <p>- Qi Cultivation now must be unlocked somehow</p>
            <p>- Added Explore, with list of places to explore</p>
            <p>- You can fight strong enemies and find useful things when exploring</p>
            <p>- Be aware of the minimum recommended power for a place, otherwise you will only get injured and fall back on progress</p>
          </div>
        </li>

        <li style={{marginTop: 10}}>
          <p>v.0.2.0 - alpha / 2024-Oct-17</p>
          <p>Overview: Basic realms and some mechanic changes</p>
          <div>
            Changes:
            <p/>- Added realms Mortal {'>'} Qi Condensation {'>'} Foundation Establishment
            <p/>- Max realm right now is Late Foundation Establishment
            <p/>- Removed Exploration from activities
            <p/>- Changed calendar mechanic to 365 days in a year
            <p/>- Added more game speed options. 1x, 2x, 5x, 10x and 100x. Might remove later.
          </div>
        </li>

        <li style={{marginTop: 10}}>
          <p>v.0.1.1 - alpha / 2024-Oct-07</p>
          <p>Overview: Changes to existing features</p>
          <div>
            Changes:
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
