import sqlite3
from flask import Flask, jsonify, request, abort
from argparse import ArgumentParser


DB = 'bus.sqlite'


def get_row_as_dict(row):
    row_dict = {
        'id': row[0],
        'price': row[1],
        'departure': row[2],
        'arrival': row[3],
        'departureTime': row[4],
        'arrivalTime': row[5],
        'day': row[6],
        'date': row[7],
    }

    return row_dict


app = Flask(__name__)


@app.route('/api/bus', methods=['GET'])
def index():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM bus ORDER BY date')
    rows = cursor.fetchall()

    print(rows)

    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = get_row_as_dict(row)
        rows_as_dict.append(row_as_dict)

    return jsonify(rows_as_dict), 200


@app.route('/api/bus/<int:bus>', methods=['GET'])
def show(member):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM bus WHERE id=?', (str(bus),))
    row = cursor.fetchone()
    db.close()

    if row:
        row_as_dict = get_row_as_dict(row)
        return jsonify(row_as_dict), 200
    else:
        return jsonify(None), 200


@app.route('/api/bus', methods=['POST'])
def store():
    if not request.json:
        abort(404)

    new_member = (
        request.json['price'],
        request.json['departure'],
        request.json['arrival'],
        request.json['departureTime'],
        request.json['arrivalTime'],
        request.json['day'],
        request.json['date'],
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('''
        INSERT INTO bus(price,departure,arrival,departureTime,arrivalTime,day,date)
        VALUES(?,?,?,?,?,?,?)
    ''', new_bus)

    bus_id = cursor.lastrowid

    db.commit()

    response = {
        'id': bus_id,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201


if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5000, type=int, help='port to listen on')
    args = parser.parse_args()
    port = args.port

    app.run(host='0.0.0.0', port=port)