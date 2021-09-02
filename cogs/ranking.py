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


# client_id | win_count | total_count | mvp_count | username | score

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
        # if the pass-in member is a bot
        if self.check_member_is_bot(member):
            await ctx.send('Bot cannot join the ranking!')
            return
        # If the pass-in member is in the database
        if check_user_in_db(id):
            await ctx.send(f'{member} is already in the system!')
        # Add the user to the DB
        else:
            query = "INSERT INTO users VALUES (%s, 0, 0, 0, %s, 0)"
            cursor.execute(query, (id, username))
            db.commit()
            print('Add user successfully!')
            await ctx.send(f'{member} is added to the system!')
        
    @commands.command()
    async def remove_user(self, ctx, member:discord.Member):
        """
            Remove a user from the ranking system!
        """
        id = str(member.id)
        # If the pass-in member is a bot
        if self.check_member_is_bot(member):
            await ctx.send('Bot cannot be in the system!')
            return 
        # If the pass-in user is not in the DB
        if not check_user_in_db(id):
            await ctx.send(f'{member} is not in the system!')
        # Delete the user from DB
        else:
            query = "DELETE FROM users WHERE client_id = %s"
            id = int(id)
            cursor.execute(query, (id,))
            db.commit()
            print('success!')
            await ctx.send(f'{member} is removed from the system!')
    
    @commands.command()
    async def win(self, ctx):
        """
            Add a win record to the user!
        """
        id = int(ctx.author.id)
        # If the user is not in the DB
        if not check_user_in_db(str(id)):
            await ctx.send('You are not in the ranking system!')
            return
        # Update win_count, total_count, and score 
        else:
            query = "SELECT win_count, total_count, score FROM users WHERE client_id = %s"
            cursor.execute(query, (id,))
            result = cursor.fetchall()
            win, total, sc = result[0][0] + 1, result[0][1] + 1, result[0][2] + 1
            new_query = """UPDATE users SET win_count = %s, total_count = %s, score = %s WHERE client_id = %s"""
            data = (win, total, sc, id)
            cursor.execute(new_query, data)
            db.commit()
            await ctx.send('Your data has been updated!')
            print('Update win_count successfully')
            
    @commands.command()
    async def mvp(self, ctx, member:discord.Member):
        """
            Add a MVP record to the user!
        """
        id = int(member.id)
        # If the user is not in the DB
        if not check_user_in_db(str(id)):
            await ctx.send('You are not in the ranking system!')
            return
        # Update mvp, and score 
        else:
            query = "SELECT mvp_count, score FROM users WHERE client_id = %s"
            cursor.execute(query, (id,))
            result = cursor.fetchall()
            mvp, sc = result[0][0] + 1, result[0][1] + 3
            new_query = """UPDATE users SET mvp_count = %s, score = %s WHERE client_id = %s"""
            data = (mvp, sc, id)
            cursor.execute(new_query, data)
            db.commit()
            await ctx.send('Your data has been updated! You da real MVP!')
            print('Update mvp_count successfully')
    
    @commands.command()
    async def lose(self, ctx):
        """
            Add a lose record to the user!
        """
        id = int(ctx.author.id)
        # If the user is not in the DB
        if not check_user_in_db(str(id)):
            await ctx.send('You are not in the ranking system!')
            return
        # Update win_count, total_count, and score 
        else:
            query = "SELECT total_count FROM users WHERE client_id = %s"
            cursor.execute(query, (id,))
            result = cursor.fetchall()
            total = result[0][0] + 1
            new_query = """UPDATE users SET total_count = %s WHERE client_id = %s"""
            data = (total, id)
            cursor.execute(new_query, data)
            db.commit()
            await ctx.send('Your data has been updated!')
            print('Update lose_count successfully')
    
    @commands.command()
    async def record(self, ctx, member:discord.Member):
        """
            Show your current record!
        """
        id = int(member.id)
        # If the user is not in the db
        if not check_user_in_db(str(id)):
            await ctx.send('You are not in the ranking system!')
            return
        else:
            query = "SELECT * FROM users WHERE client_id = %s"
            cursor.execute(query, (id,))
            result = cursor.fetchall()
            win, total, mvp, sc = result[0][1], result[0][2], result[0][3], result[0][5]
            win_rate = win / float(total) * 100
            await ctx.send(f'{member.name} has win {win} games, with win rate of {win_rate}%. '
                           f'{member.name} has won {mvp} time(s) with a score of {sc} points!')
    
    @commands.command()
    async def rank(self, ctx):
        """
            Show the overall ranking!
        """
        query = "SELECT username, score FROM users ORDER BY score DESC"
        cursor.execute(query)
        result = cursor.fetchall()
        i = 1
        while result:
            record = result.pop(0)
            print(record)
            await ctx.send(f'#{i} {record[0]:20} {record[1]:4}')
            i += 1
    
def setup(client):
    client.add_cog(Ranking(client))