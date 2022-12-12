from flask import Flask

app = Flask(__name__)

# Members API Route


@app.route("/members")
def members():
    return {"members": ["Danial", "Rather", "YJ"]}

@app.route("/listings")
def listing():
    return {"listings": [
            {"name": "The Witcher 3: Wild Hunt", "img": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.png"}, 
            {"name": "Assassin's Creed: Valhalla", "img": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2ed3.png"},
            {"name": "Mario Kart 8 Deluxe", "img": "https://images.igdb.com/igdb/image/upload/t_cover_big/co213p.png"}, 
            {"name": "Call of Duty: Black Ops II", "img": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wkv.png"}, 
            {"name": "Halo: Reach", "img": "https://images.igdb.com/igdb/image/upload/t_cover_big/co1xha.png"}
        ]}


if __name__ == "__main__":
    app.run(debug=True)