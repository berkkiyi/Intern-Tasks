from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# SQLite Veritabanı Bağlantısı ve Tablo Oluşturma
def init_db():
    with sqlite3.connect("movies.db") as conn:
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS movies (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                year INTEGER NOT NULL,
                title TEXT NOT NULL
            )
        """)
        conn.commit()

init_db()

# GET /movies - Tüm filmleri getir (year ve title, year'e göre sıralı) 
@app.route("/movies", methods=["GET"])
def get_movies():
    year = request.args.get("year")
    query = "SELECT year, title FROM movies"
    params = []
    
    if year:
        query += " WHERE year = ?"
        params.append(year)
    
    query += " ORDER BY year ASC"
    
    with sqlite3.connect("movies.db") as conn:
        cursor = conn.cursor()
        cursor.execute(query, params)
        movies = cursor.fetchall()
    
    return jsonify([{"year": row[0], "title": row[1]} for row in movies])

# POST /movies - Yeni film ekle
@app.route("/movies", methods=["POST"])
def add_movie():
    data = request.get_json()
    year = data.get("year")
    title = data.get("title")
    
    if not year or not title:
        return jsonify({"error": "year ve title gereklidir."}), 400
    
    with sqlite3.connect("movies.db") as conn:
        cursor = conn.cursor()
        cursor.execute("INSERT INTO movies (year, title) VALUES (?, ?)", (year, title))
        conn.commit()
    
    return jsonify({"message": "Film başarıyla eklendi."}), 201

# DELETE /movies - Belirtilen yıldaki tüm filmleri sil
@app.route("/movies", methods=["DELETE"])
def delete_movies_by_year():
    year = request.args.get("year")
    
    if not year:
        return jsonify({"error": "Silmek için year parametresi gereklidir."}), 400
    
    with sqlite3.connect("movies.db") as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM movies WHERE year = ?", (year,))
        conn.commit()
    
    return jsonify({"message": f"{year} yılındaki filmler silindi."})

# DELETE /movies/<year> - Yıl parametresi ile film silme
@app.route("/movies/<int:year>", methods=["DELETE"])
def delete_movies_by_path(year):
    with sqlite3.connect("movies.db") as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM movies WHERE year = ?", (year,))
        conn.commit()
    
    return jsonify({"message": f"{year} yılındaki filmler silindi."})

# GET /search - Film başlığına göre arama
@app.route("/search", methods=["GET"])
def search_movies():
    title = request.args.get("title")
    
    if not title:
        return jsonify({"error": "Arama yapmak için title parametresi gereklidir."}), 400
    
    with sqlite3.connect("movies.db") as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT year, title FROM movies WHERE title LIKE ?", (f"%{title}%",))
        movies = cursor.fetchall()
    
    return jsonify([{"year": row[0], "title": row[1]} for row in movies])

if __name__ == "__main__":
    app.run(debug=True)