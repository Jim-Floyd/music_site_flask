from app import *
from app import app
from app import db
from packages.models import *


@app.route('/post', methods=['POST', 'GET'])
def post():
    body1 = {}
    name = request.get_json()['name']
    password = request.get_json()['password']
    email = request.get_json()['email']
    confirm_password = request.get_json()['reg_confirm_password']
    if password != confirm_password:
        return "password does not match"
    else:
        password_hash = generate_password_hash(password)
        add = Users(username=name, email=email, password=password_hash, admin=1)
        db.session.add(add)
        db.session.commit()
        body['name'] = name
        body['password'] = password_hash
        body['email'] = email
        return jsonify(body)