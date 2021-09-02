import discord
import json
import os
from discord.ext import commands

def get_prefix(client, message):
    with open('prefixes.json', 'r') as f:
        prefixes = json.load(f)
    return prefixes[str(message.guild.id)]

# class CustomHelpCommand(commands.HelpCommand):
#     def __init__(self):
#         super().__init__()      
#     # This method is the general '!help' command.
#     async def send_bot_help(self, mapping):
#         for cog in mapping:
#             await self.get_destination().send(f'{cog.qualified_name}: {[command.name for command in mapping[cog]]}') 
#     async def send_cog_help(self, cog):
#         await self.get_destination().send(f'{cog.qualified_name}: {[command.name for command in cog.get_commands()]}')
#     async def send_command_help(self, command):
#         return await super().send_command_help(command)
# client = commands.Bot(command_prefix=get_prefix, help_command=CustomHelpCommand())

client = commands.Bot(command_prefix=get_prefix)

@client.event
async def on_ready():
    print('Bot is ready!')
    
@client.command()
async def load(ctx, extension):
    """
        Load my commands
    """
    client.load_extension(f'cogs.{extension}')
    
@client.command()
async def unload(ctx, extension):
    """
        Unload my commands
    """
    client.unload_extension(f'cogs.{extension}')
    
@client.command()
async def reload(ctx, extension):
    """
        Reload my commands
    """
    client.unload_extension(f'cogs.{extension}')
    client.load_extension(f'cogs.{extension}')
    
@client.event
async def on_command_error(ctx, error):
    if isinstance(error, commands.CommandNotFound):
        await ctx.send('Command is invalid. Please use !help to find command.')
    if isinstance(error, commands.MissingRequiredArgument):
        await ctx.send('Please pass in all required arguments!')
        
# When this bot joins a server, it will register '!' as command's prefix as default.
# The prefix will be store in json.
@client.event
async def on_guild_join(guild):
    # Open the prefix.json file
    with open('prefixes.json', 'r') as f:
        prefixes = json.load(f)
    # Store the prefix in the file as key=guild.id and value='!'
    prefixes[str(guild.id)] = '!'
    # Store the data by writing back.
    with open('prefixes.json', 'w') as f:
        json.dump(prefixes, f, indent=4)

# When this bot be kicked out of a server, remove the command prefix from the json file.
@client.event
async def on_guild_remove(guild):
    with open('prefixes.json', 'r') as f:
        prefixes = json.load(f)
    prefixes.pop(str(guild.id))
    with open('prefixes.json', 'w') as f:
        json.dump(prefixes, f, indent=4)

# Letting the server to modify their own commands prefix, but only limit to administration
@client.command
@commands.has_permissions(administrator=True)
async def change_prefix(ctx, prefix):
    # Open the prefix.json file
    with open('prefixes.json', 'r') as f:
        prefixes = json.load(f)
        
    # Store the prefix in the file as key=guild.id and value=the passing value
    prefixes[str(ctx.guild.id)] = prefix
    
    # Store the data by writing back.
    with open('prefixes.json', 'w') as f:
        json.dump(prefixes, f, indent=4)
        
    await ctx.send(f'Prefix changes to \'{prefix}\'')
        
# Loading the file from the cogs' folder      
for filename in os.listdir('./cogs'):
    if filename.endswith('.py'):
        client.load_extension(f'cogs.{filename[:-3]}')
        