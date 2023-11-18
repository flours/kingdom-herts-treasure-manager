from flask import Flask,request
import sqlite3
app = Flask(__name__)

def get_db():
    dbname = 'treasure.db'
    conn = sqlite3.connect(dbname)
    conn.execute("PRAGMA foreign_keys = 1")
    cur = conn.cursor()
    cur.execute(
            """CREATE TABLE IF NOT EXISTS maptable(
                map STRING PRIMARY KEY,
                num_treasures INT
                )"""
            )
    cur.execute(
            """CREATE TABLE IF NOT EXISTS areatable(
                map STRING, 
                area STRING,
                PRIMARY KEY (map,area),
                foreign key(map) REFERENCES maptable(map)
                )"""
            )
    cur.execute(
            """CREATE TABLE IF NOT EXISTS treasuretable( 
                num int,
                area string,
                map string,
                item string,
                foreign key(map) references maptable(map)
                )
                """
            )
    conn.commit()
    return conn


@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/api/v1/treasures',methods=["GET"])
def handle_treasures():
    map = request.args.get("map",None)
    if map==None:
        return "map param required",400
    conn = get_db()
    cur = conn.cursor()
    cur.execute(f'SELECT num,item,map,area FROM treasuretable where map="{map}" ORDER BY num')
    res=[]
    for row in cur.fetchall():
        res.append({"num":row[0],"item":row[1],"map":row[2],"area":row[3]})
    return {"values": res}

@app.route('/api/v1/treasures',methods=["POST"])
def handle_post_treasures():
    print(request)
    map = request.json.get("map",None)
    area = request.json.get("area",None)
    item = request.json.get("item",None)
    num = request.json.get("num",None)
    if map==None:
        return "map param required",400
    if area==None:
        return "area param required",400
    if item==None:
        return "item param required",400
    if num==None:
        return "num param required",400
    conn = get_db()
    cur = conn.cursor()
    cur.execute(f'UPDATE treasuretable SET area="{area}",item="{item}" WHERE map="{map}" and num={num}')
    conn.commit()
    return "OK"


@app.route('/api/v1/maps')
def handle_maps():
    conn = get_db()
    cur = conn.cursor()
    cur.execute('SELECT map,num_treasures FROM maptable')
    res=[]
    for row in cur.fetchall():
        res.append({"map":row[0],"num_treasures":row[1]})
    return {"values":res}

@app.route('/api/v1/maps',methods=["POST"])
def handle_post_maps():
    conn = get_db()
    cur = conn.cursor()
    map = request.json.get("map",None)
    num_treasures = request.json.get("num_treasures",None)
    if map==None:
        return "map param required",400
    if num_treasures==None:
        return "num_treasures param required",400
    cur.execute(f'INSERT INTO maptable VALUES("{map}",{num_treasures})')
    conn.commit()

    # 宝箱埋めとく
    conn = get_db()
    cur = conn.cursor()
    for i in range(num_treasures):
        cur.execute(f'INSERT INTO treasuretable VALUES({i+1},"????","{map}","????")')
    conn.commit()
    return "OK"

@app.route('/api/v1/areas')
def handle_areas():
    map = request.args.get("map",None)
    if map==None:
        return "map param required",400
    conn = get_db()
    cur = conn.cursor()
    cur.execute(f'SELECT area FROM areatable WHERE map="{map}"')
    res=[]
    for row in cur.fetchall():
        res.append({"map":map,"area":row[0]})
    return {"values":res}

@app.route('/api/v1/areas',methods=["POST"])
def handle_post_areas():
    conn = get_db()
    cur = conn.cursor()
    map = request.json.get("map",None)
    area = request.json.get("area",None)
    if map==None:
        return "map param required",400
    if area==None:
        return "area param required",400
    print(f'INSERT INTO areatable VALUES("{map}","{area}")',flush=True)
    cur.execute(f'INSERT INTO areatable VALUES("{map}","{area}")')
    conn.commit()
    return "OK"

if __name__ == '__main__':
    app.run(debug=False, host="0.0.0.0", port=5000)
