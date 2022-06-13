from flask import session, request, jsonify

from app import *
from app import app
from app import db
from packages.models import Genre


def get_current_user():
    user_query = None
    if 'user' in session:
        user = session['user']
        user = Users.query.filter_by(username=user).first()
        user_query = user
    return user_query


@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        name = request.form.get('username')
        password = request.form.get('password')
        get_user = Users.query.filter_by(username=name).first()
        if get_user:
            if check_password_hash(get_user.password, password):
                session['user'] = get_user.username
                return redirect(url_for('index'))
            return redirect(url_for('login'))


@app.route('/register', methods=['POST', 'GET'])
def register():
    body = {}
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


# @app.route('/register', methods=['POST', 'GET'])
# def register():
#     if request.method == 'POST':
#         email = request.form.get('email')
#         username = request.form.get('username')
#         password = request.form.get('password')
#         password2 = request.form.get('re-password')
#
#         if len(email) <= 4:
#             flash('Email must be greater than 4 characters', category='error')
#         elif len(username) <= 2:
#             flash(
#                 'Username must be greater than 2 characters', category='error')
#         elif len(password) <= 4:
#             flash('Password must be greater than 4 characters', category='error')
#         elif password != password2:
#             flash('Password do not match', category='error')
#         else:
#             new_user = Users(email=email, username=username,
#                              password=generate_password_hash(password, method='sha256'), admin=True)
#             db.session.add(new_user)
#             db.session.commit()
#
#             flash('Account created', category='success')
#
#             get_user = Users.query.filter_by(username=username).first()
#             session['user'] = get_user.username
#             return redirect(url_for('login'))


@app.route('/')
def index():
    current_user = get_current_user()
    return render_template('index.html', current_user=current_user)


@app.route('/add-singer')
def add_singer():
    object = {}
    object['singers'] = Singer.query.all()
    return render_template('singer_info.html')


@app.route('/singer-list')
def singer_list():
    object = {}
    object['singers'] = Singer.query.all()
    return render_template('singer_info.html')


@app.route('/singer_info')
def singer():
    return render_template('singer_info.html')


@app.route('/cabinet')
def cabinet():
    return render_template('cabinet.html')


@app.route('/create_category', methods=['POST', 'GET'])
def create_category():
    category_list = []
    object = {}
    name = request.get_json()['name']
    ctgr = Category(category_type=name)
    db.session.add(ctgr)
    db.session.commit()
    categories = Category.query.all()
    for category in categories:
        category_dict = {'category_name': category.category_type}
        category_list.append(category_dict)
    object['category_list'] = category_list
    return jsonify(object)


@app.route('/create_genre', methods=['POST', 'GET'])
def create_genre():
    genre_list = []
    object = {}
    name = request.get_json()['name']
    genre = Genre(genre_type=name)
    db.session.add(genre)
    db.session.commit()
    genres = Genre.query.all()
    for genre1 in genres:
        genre_dict = {'genre_name': genre1.genre_type}
        genre_list.append(genre_dict)
    object['genre_list'] = genre_list
    return jsonify(object)


@app.route('/create_artist', methods=['POST', 'GET'])
def create_artist():
    artist_list = []
    object = {}

    name = request.get_json()['name']
    img = request.get_json()['img']
    # img = request.files['img-artist']
    # photo = request.get_json()['img']
    # filename = secure_filename(img.filename)
    # img.save(os.path.join("static/img/person", filename))
    # file_url = "static/img/person"
    #
    # result = file_url + '/' + filename
    artist = Singer(singer_name=name, singer_img=img)
    db.session.add(artist)
    db.session.commit()
    artists = Singer.query.all()
    for artist1 in artists:
        artist_dict = {'artist_name': artist1.singer_name}
        artist_list.append(artist_dict)
    object['artist_list'] = artist_list
    return jsonify(object)


@app.route('/create_album/<int:artist_id>', methods=['POST', 'GET'])
def create_album(artist_id):
    name = request.get_json()['name']
    album = Album(album_name=name, album_owner=artist_id)
    db.session.add(album)
    db.session.commit()
    return redirect(url_for('home'))


@app.route('/create_track/<int:album_id>/<int:genre_id>')
def create_track(album_id, genre_id):
    name = request.form.get('name')
    photo = request.files['image_user']
    filename = secure_filename(photo.filename)
    photo.save(os.path.join("static/img/person", filename))
    file_url = "static/img/person"

    result = file_url + '/' + filename
    track = Musics(music_name=name, music_album=album_id, music_genre=genre_id, music_img=result)
    db.session.add(track)
    db.session.commit()
    return redirect(url_for('home'))
