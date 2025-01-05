'use client'

import { appVersion } from '../properties/properties';

export default function Changelog() {
  return (
    <div style={{margin: 10}}>
      Changelog - {appVersion}
      <ul style={{marginTop: 10}}>

      <p>Current end of content: interrupting the story event before year 645</p>
      <p>Current end game and challenge: interrupting the story event before year 615</p>

      <li style={{marginTop: 10}}>
        <p>v.0.4.3 - alpha / 2025-Jan-??</p>
        <p>Overview: Small fixes and adjustments</p>
        <div>
          Changes:
          <p>Fixed activities upgrades not being applied correctly, like for Meditate</p>
          <p>Greatly reduce drop rates on all zones to balance with 50x speed. This is so gameplay speed feels better.</p>
          <p>Changed so activities start at rank 0. Easier to track effects this way.</p>
          <p>Added missing activities from drop pool</p>
          <p>Adjusted some drop effects and upgrade requirements</p>
          <p>Modified realm up requirements for more sinergy with stats and drops</p>
        </div>
      </li>

      <li style={{marginTop: 10}}>
        <p>v.0.4.2 - alpha / 2025-Jan-03</p>
        <p>Overview: Small fixes and adjustments</p>
        <div>
          Changes:
          <p>Modified some item costs and gains for balance</p>
          <p>Changed starting level to 0, so it also matches the level up notification</p>
          <p>Added colors to coins for easier identification</p>
          <p>Moved XP messages back into Fight Log. They appear too often and clog the log compared with actual loot items.</p>
          <p>Fixed drops not working on zones. All zones have droppable items, and some items can only be found by fighting on zones.</p>
          <p>Fixed foraging effect on drop chance.</p>
          <p>Adjusted values of coins that are dropped on zones.</p>
        </div>
      </li>

      <li style={{marginTop: 10}}>
        <p>v.0.4.1 - alpha / 2025-Jan-03</p>
        <p>Overview: Bug fixes</p>
        <div>
          Changes:
          <p>Fixed typo on game start message</p>
          <p>Enabled faster game speed of 50x</p>
          <p>Added an item to reduce days required to make money with Perform Odd Jobs</p>
          <p>Lowered requirements for some upgrades</p>
          <p>Adjusted base gains for Body and Qi</p>
        </div>
      </li>

      <li style={{marginTop: 10}}>
        <p>v.0.4.0 - alpha / 2025-Jan-02</p>
        <p>Overview: New mechanics and changes to existing mechanics</p>
        Note: Game was completelly rebalanced. There are more mechanics and content, but progress is overall slower, and beating the game will take even more time.
        <div>
          Changes:
          <p>Right side message panel allows to toggle message type.</p>
          <p>Message panel now shows new messages at the bottom.</p>
          <p>New messages are dated with year, and some messages with life count</p>
          <p>Some messages have different background color for better visualization</p>
          <p>A small green dot is added to a Zone, on the upper right side, to identify that the zone has been cleared on the current life.</p>
          <p>Created a tab for Market, with items from different zones. Some items only appear after a certain zone is cleared, certain items are obtained, or certain requirements are met. Existing items include weapons or upgrades for the existing life, and even some items that will have lasting effects across deaths.</p>
          <p>Implemented effect for activity Meditate - will make it so all activities (including itself) will rank up faster</p>
          <p>Implemented effect for activity Practice Martial Arts - will increase the effects attribute Body has on Power and Health. This activity is unlocked after a certain zone is cleared.</p>
          <p>Implemented effect for activity Practice Qi Spells - will increase the effects attribute Qi has on Power and Health. This activity is unlocked after a certain zone is cleared.</p>
          <p>Implemented global event - a series of messages and effects on zones on specific game years. Events repeat on every life and can be interrupted if their end zone is cleared on time. Interrupting an event will prevent any next milestone from happening, which can be good or bad. No extra rewards are given as of now. For now only 1 event exists.</p>
          <p>Changed fight defeat message to type Fight on right panel.</p>
          <p>Changed experience gain message to type Loot on right panel.</p>
          <p>Fixed some text positining on exploration zones.</p>
          <p>Modified Cultivation tab layout for clearer info on cultivation requirements and realm up effects.</p>
          <p>Fixed situation that message &quot;You wake up!&quot; appeared twice after death. Also changed some related texts to make them more concise.</p>
          <p>Changed so Zone progress is not reset on retreat or defeat</p>
          <p>Changed so Zone power does not increase as a zone is progressed</p>
          <p>Changed fight damage range from 50-85% power to 15-65% power so fights can be longer and random</p>
          <p>Added new Zones</p>
          <p>Changed all Zone difficulties to balance all changed mechanics and new zones</p>
          <p>Changed display of Coins to show separation of Copper, Silver, Gold and Spiritual Stones</p>
          <p>Changed game speeds to reflect game rebalance - game speeds are now: 1x, 2x, 5x and 10x.</p>
          <p>Game rebalance include making progression a tad slower.</p>
        </div>
      </li>

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
