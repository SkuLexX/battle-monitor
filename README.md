# Battle Monitor Extension

## Features

### Enable Damage Update
When **Enable Damage Update** is checked, the extension intercepts game requests and updates monster information in real time.

- Shows **damage dealt to monsters instantly**
- No need to **refresh the page** to see updated damage
- Updates the monster card UI automatically

> **Note:** The features **Disable Attack Report** and **Auto Remove Dead Monsters** require **Enable Damage Update** to be active.

### Disable Attack Report
When **Disable Attack Report** is checked **and Enable Damage Update is active**:

- Prevents the **Attack Report popup** from appearing after an attack
- Makes attacks faster by skipping unnecessary UI dialogs

### Auto Remove Dead Monsters
When **Auto Remove Dead Monsters** is checked **and Enable Damage Update is active**:

- Automatically removes monsters from the list when:
  - Your attack **fails because the monster is already dead**
  - Your attack **succeeds and the monster has 0 HP remaining**

This keeps the monster list clean and avoids attacking dead targets.

## Usage

1. Install the extension in your browser.
2. Open the game page.
3. Open the extension popup.
4. Enable the features you want using the checkboxes:
   - **Enable Damage Update** (required for other features)
   - **Disable Attack Report**
   - **Auto Remove Dead Monsters**
5. **Refresh the page** for the changes to take effect.


The extension will start working immediately.

## Version

**1.0**
