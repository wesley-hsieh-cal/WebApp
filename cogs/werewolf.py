import discord
from discord.ext import commands
import mysql.connector

# db = mysql.connector.connect(host="127.0.0.1", user="root", password="19960630", database="Discord")
# cursor = db.cursor()

class Werewolf(commands.Cog):
    def __init__(self, client):
        self.client = client
        
    @commands.command()
    async def play_game(self, ctx):
        """
            Start the game! If there's one, then either wait or call !end_game
            Let the user to initiate a game by creating voice channels 'werewolf' and 'dead'.
            Report to the user if a game is exist.
        """
        await ctx.send(f'Every player please join the created "werewolf" channel to start the game!')
        guild = ctx.message.guild
        channel = discord.utils.get(guild.voice_channels, name="werewolf")
        if not channel:
            await guild.create_voice_channel("werewolf")
        else:
            await ctx.send('There\'s already a game!')
        channel = discord.utils.get(guild.voice_channels, name="dead")
        if not channel:
            await guild.create_voice_channel("dead")
    
    @commands.command()
    async def end_game(self, ctx):
        """
            End the game!
            Let the user to end the game by destroying "werewolf" and "dead" voice channels
            If the channel does not exist, it will output the message to inform users.
        """
        guild = ctx.message.guild
        channel = discord.utils.get(guild.voice_channels, name="werewolf")
        if channel:
            await channel.delete()
        else:
            await ctx.send('There is no game :(')
        channel = discord.utils.get(guild.voice_channels, name="dead")
        if channel:
            await channel.delete()
    
    @commands.command()
    async def kill(self, ctx, member : discord.Member):
        """
            Exile a player from 'werewolf' channel to 'dead' channel.
            As the process in a werewolf game, users kill/exile a player from the game. For this bot,
            it will move the user who got killed to other channel to isolate from the main game channel.
            Here, we check if the "dead" channel exists, then let the bot move players to it.
        """
        guild = ctx.message.guild
        channel = discord.utils.get(guild.voice_channels, name="dead")
        if not channel:
            await guild.create_voice_channel("dead")
        await member.move_to(channel)
        await ctx.send(f'{member.mention} has been moved to channel {channel}')

def setup(client):
    client.add_cog(Werewolf(client))