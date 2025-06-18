import sqlite3

# Connect to your database
conn = sqlite3.connect('db.sqlite3')
cursor = conn.cursor()

# Drop the tables
cursor.execute('DROP TABLE IF EXISTS submissions_submission;')
cursor.execute('DROP TABLE IF EXISTS submissions_problem;')

# Commit and close
conn.commit()
conn.close()