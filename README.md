# Werewolf-bot

This bot is designed based on the famous board game "The Werewolves of Miller's Hollow". \
The bot will be used as a assistant for the game's process. Also, the bot has a ranking system to record people's score \
The following commands explain what you can do with this bot. 

## Commands
### General Commands
* `!help`: Show all commands this bot has.
* `!load`: Load the commands this bot has.
* `!unload`: Unload the commands this bot has.
* `!reload`: Reload the commands this bot has.
### Game Commands
* `!play_game`: Start the game by creating **'werewolf'** and **'dead'** channels.
* `!kill`: Exile/Kill a person by moving the player from **'werewolf** to **'dead'** channel.
* `!end_game`: End the game by destroying **'werewolf'** and **'dead'** channels.

### Rank Commands
* `!add_user @username`: Add certain user to the rank system.
* `!remove_user @username`: Remove user from the rank system.
* `!win`: Add a winning record of the caller to the system.
* `!lose`: Add a losing record of the caller to the system.
* `!mvp @username`: Add a mvp title to certain user.
* `!record`: Show the record of the caller.
* `!rank`: Show the top 5 places of the current ranking.

## Process
1. Call the `!play_game` command to start the game. It will automatically create **werewolf** and **dead** channels
2. All users who want to play/spectate the game should join the **werewolf** channel
3. Rest of the game's process can be finished by players. Notice that players who are killed/exiled should use `!kill @username` to do so.
4. After finishing the game, players can call `!end_game` to destroy **werewolf** and **dead** channels automatically.
5. Players should call `!win` or `!lose` to record the result correspondingly.
6. Players can decide who is the MVP and call `!mvp @username` to honor them

## Score
The score system is count as (win counts * 1) + (mvp counts * 3) = total (score)

