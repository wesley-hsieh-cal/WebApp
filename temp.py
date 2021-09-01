import discord
import random
from discord.ext import commands

client = commands.Bot(command_prefix='!')

@client.event
async def on_ready():
    print('Bot is ready!')

@client.command()
async def playWerewolf(ctx):
    await ctx.send('Are you guys ready to play Werewolf game?')
    guild = ctx.message.guild
    channel = discord.utils.get(guild.text_channels, name="werewolf")
    if not channel:
        await guild.create_text_channel("werewolf")
    else:
        await ctx.send('There\'s already a game!')
        
@client.command()
async def endGame(ctx):
    guild = ctx.message.guild
    channel = discord.utils.get(guild.text_channels, name="werewolf")
    if channel:
        await channel.delete()
    
    

# @client.command()
# @commands.has_permissions(manage_messages=True)
# async def clear(ctx, amount=5):
#     if amount == 0: return
#     await ctx.channel.purge(limit=amount+1)

# @clear.error
# async def clear_error(ctx, error):
#     if isinstance(error, commands.MissingRequiredArgument):
#         await ctx.send('Please specify an amount of message to delete.')
    
# Function for returning a random response to the user
# @client.command(aliases=['8ball', 'test']) # The passing array are the tags can be used to call this fn
# async def _8ball(ctx, *, question):
#     responses = ['Yes', 'No', 'Maybe']
#     await ctx.send(f'Question: {question}\nAnswer: {random.choice(responses)}')
        
