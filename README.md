# McNiibot: Clicker Heroes Discord Bot

A Discord.js bot designed for the Clicker Heroes Discord server. It provides a wide array of game-specific information, moderation assistance, and automated role assignments based on player progress. The core functionality and event handling are managed in `index.js`.

## 👾 Features

-   **Extensive Game Information:** Over 80 slash commands providing detailed information about Clicker Heroes 1 mechanics, ancients, outsiders, strategies, and more (e.g., `/active`, `/ancients`, `/as`, `/firsttrans`, `/hybrid`, `/idle`, `/merc`, `/outsiders`, `/rubies`, `/skills`, `/timelapse`, `/trans`).
-   **Utility Commands:** Includes `/calclist` for links to useful calculators, `/faq`, `/glossary`, and an `/image` command with autocomplete for posting catered images. All commands can be found in the `/commands` folder.
-   **Moderation & Auto-Moderation:** Features basic moderation tools and robust auto-moderation capabilities, including anti-spam, detection of scam links (e.g., fake Nitro), filtering of racist comments, and restrictions on posting external Discord links by new members.
-   **Automated Role Assignment:** Assigns Discord roles to users based on their in-game progress. Players can DM the bot their `.txt` save file, which the bot processes to determine the highest hero unlocked and assign a corresponding role.
-   **Automated Responses:** Provides quick answers to common questions and phrases within the community.

## ⚙️ Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure the Bot

You will need to create a `botconfig.json` file in the root directory of the project. This file should contain your bot's credentials. You can model it after this structure:

```json
{
    "token": "YOUR_DISCORD_BOT_TOKEN",
    "clientId": "YOUR_BOTS_CLIENT_ID",
    "guildId": "YOUR_DISCORD_SERVER_ID"
}
```

Replace the placeholder values with your actual:
*   `token`: Your Discord bot token.
*   `clientId`: Your bot's client ID.
*   `guildId`: The ID of the Discord server (guild) where the bot will operate.

> If you are developing locally, you may want to use a dedicated test server and its ID for `guildId`.

### 3. Start the Bot

```bash
node index.js
```

If the configuration is correct, the bot should appear online in Discord, and its slash commands will be registered/updated for the specified guild.

## 🚢 Deployment

We use the "Release to deploy" methodology:

1.  Create a new GitHub release.
2.  A GitHub Action will automatically merge the `main` branch into the `production` branch, and then later it will SSH into the server and run the deployment script (`deploy.sh`).

> [!NOTE]
> Always create releases from the `main` branch to ensure all tested changes are included in the deployment.

## 📂 Uploads folder

The `uploads` folder is used to store the attachments sent by users, such as `.txt` save files. Make sure this folder is writable by the bot process.

## 📜 License

This project is licensed under the ISC License (as specified in `package.json`).
