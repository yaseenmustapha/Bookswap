# Bookswap

Full-stack web application for students to trade and sell their used books and textbooks. Built using React.js for front-end and Python, Flask, and MongoDB for back-end RESTful API. Uses JSON Web Token for user authentication and Open Library API for retrieving book information.

Production version live at [bookswap.herokuapp.com](https://bookswap.herokuapp.com).

## Start Flask backend:
### 1. Create venv:
```
cd flask-server
python3 -m venv venv
```
### 2. Activate venv:
Mac:
```
source venv/bin/activate
```
Windows:
```
venv\Scripts\activate
```

### 3. Install Python modules:
```
pip3 install Flask pymongo flask_jwt_extended flask_cors
```
### 4. Start server:
Mac:
```
python3 server.py
```
Windows:
```
python server.py
```

Try http://localhost:5000/members or http://127.0.0.1:5000/members in your browser to test API call.

## Start React frontend (do in a new terminal):
```
cd client
npm install
npm run dev
```
Try http://localhost:3000 or http://127.0.0.1:3000 to test frontend.

## Connect to database with GUI
[Download MongoDB Compass](https://www.mongodb.com/try/download/compass)

Use `mongodb+srv://gameswap:SO3v6uVCwfQqpzPS@cluster0.tupmdgp.mongodb.net/test` to connect (your external IP must be approved for Network Access before you can connect).

## FAQ
### Proxy error: Could not proxy request [API endpoint] from localhost:3000 to http://localhost:5000/ (ECONNREFUSED).
Change `"proxy"` in `package.json` from `"http://localhost:5000"` to `"http://127.0.0.1:5000"`.
