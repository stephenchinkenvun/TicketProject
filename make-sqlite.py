##
# Execute this script once to create the database & table
# as well as populating it with initial data
#

import sqlite3
db = sqlite3.connect('bus.sqlite')

db.execute('DROP TABLE IF EXISTS bus')

db.execute('''CREATE TABLE bus(
    id integer PRIMARY KEY,
    price text NOT NULL,
    departure text NOT NULL,
    arrival text NOT NULL,
    departureTime text NOT NULL,
    date text NOT NULL
)''')

cursor = db.cursor()



db.commit()
db.close()