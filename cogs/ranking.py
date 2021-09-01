import discord
from discord.ext import commands
import mysql.connector

db = mysql.connector.connect(
    host="localhost", 
    user="root", 
    password="somepwd", 
    database="ranking",
    auth_plugin='mysql_native_password'
)
cursor = db.cursor()

def check_user_in_db(id):
    cursor.execute("SELECT client_id FROM users WHERE client_id = " + id)
    result = cursor.fetchall()
    if len(result) == 0:
        return False
    return True


# client_id | win_count | total_count | mvp_count | username   

class Ranking(commands.Cog):
    def __init__(self, client):
        self.client = client
    
    def check_member_is_bot(self, user):
            return user.bot
        
    @commands.command()
    async def add_user(self, ctx, member:discord.Member):
        """
            Add a user to the ranking system!
        """
        id, username = str(member.id), str(member.name)
        # check if the pass in member is bot
        if self.check_member_is_bot(member):
            await ctx.send('Bot cannot join the ranking!')
            return
        # check if the pass in member is in the database
        if check_user_in_db(id):
            await ctx.send(f'{member} is already in the system!')
        else:
            query = "INSERT INTO users VALUES (%s, 0, 0, 0, %s)"
            cursor.execute(query, (id, username))
            db.commit()
            print('success!')
            await ctx.send(f'{member} is added to the system!')
        
    @commands.command()
    async def remove_user(self, ctx, member:discord.Member):
        """
            Remove a user from the ranking system!
        """
        id = str(member.id)
        if self.check_member_is_bot(member):
            await ctx.send('Bot cannot be in the system!')
            return 
        if not check_user_in_db(id):
            await ctx.send(f'{member} is not in the system!')
        else:
            query = "DELETE FROM users WHERE client_id = %s"
            id = int(id)
            cursor.execute(query, (id,))
            db.commit()
            print('success!')
            await ctx.send(f'{member} is removed from the system!')
    
    # @commands.command()
    # async def win(self, ctx):
    #     """
    #         Add a win record to the user!
    #     """
    #     user_id = str(ctx.author.id)
    #     if check_user_in_db(user_id):
    #         print('in system')
    #     else:
    #         print('not in system')
    
def setup(client):
    client.add_cog(Ranking(client))