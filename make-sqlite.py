##
# Execute this script once to create the database & table
# as well as populating it with initial data
#

import sqlite3
db = sqlite3.connect('bus.sqlite')

db.execute('DROP TABLE IF EXISTS bus')

db.execute('''CREATE TABLE bus(
    id integer PRIMARY KEY,
    price integer NOT NULL,
    departure text NOT NULL,
    arrival text NOT NULL,
    departureTime text NOT NULL,
    arrivalTime text NOT NULL,
    day text NOT NULL,
    date text NOT NULL
)''')

cursor = db.cursor()

cursor.execute('''
    INSERT INTO bus(price,departure,arrival,departureTime,arrivalTime,day,date)
    VALUES('2.00','Kuala Lumpur','Selangor','09:30','10:00','Monday','30-08-2021')
''')

cursor.execute('''
    INSERT INTO bus(price,departure,arrival,departureTime,arrivalTime,day,date)
    VALUES('3.00','Johor','Selangor','09:30','10:30','Monday','30-08-2021')
''')

cursor.execute('''
    INSERT INTO bus(price,departure,arrival,departureTime,arrivalTime,day,date)
    VALUES('2.00','Penang','Perlis','10:00','10:30','Monday','30-08-2021')
''')

db.commit()
db.close()