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


@app.route('/')
def index():
    current_user = get_current_user()
    return render_template('index.html', current_user=current_user)


@app.route('/add-singer')
def add_singer():
    object = {}
    object['singers'] = Singer.query.all()
    return render_template('singer_info.html')


@app.route('/add-music', methods=['POST', 'GET'])
def add_music():
    music_title = request.form.get('name')
    music_img = request.files['img']
    filename = secure_filename(music_img.filename)
    print(filename)
    music_img.save(os.path.join("./static/img", filename))
    file_url = "static/img"
    result = file_url + '/' + filename
    music_owner = request.form.get('owner')
    music_album = request.form.get('album')
    music_category = request.form.get('category')
    music_genre = request.form.get('genre')
    music = Musics(music_name=music_title, music_img=result, music_owner=music_owner, music_genre=music_genre,
                   music_category=music_category, music_album=music_album)
    db.session.add(music)
    db.session.commit()
    return redirect(url_for('cabinet'))


@app.route('/artist-list')
def artist_list():
    object1 = {}
    singers_list = []
    singers = Singer.query.all()
    for singer1 in singers:
        singer_dict = {'singer_name': singer1.singer_name, 'singer_img': singer1.singer_img, 'singer_id': singer1.id}
        singers_list.append(singer_dict)
    object1['singers'] = singers_list
    return jsonify(object1)


@app.route('/category-list')
def category_list():
    object2 = {}
    categories_list = []
    categories = Category.query.all()
    for category in categories:
        category_dict = {'category_name': category.category_type}
        categories_list.append(category_dict)
    object2['category_list'] = categories_list
    return jsonify(object2)


@app.route('/album-list/<int:singer_id>')
def album_list(singer_id):
    object2 = {}
    albums_list = []
    albums = Album.query.filter_by(album_owner=singer_id).all()
    for album in albums:
        album_dict = {'album_name': album.album_name, 'singer_id': singer_id}
        albums_list.append(album_dict)
    object2['album_list'] = albums_list
    return jsonify(object2)


@app.route('/genre-list')
def genre_list():
    object3 = {}
    genres_list = []
    genres = Genre.query.all()
    for genre1 in genres:
        genre_dict = {'genre_name': genre1.genre_type}
        genres_list.append(genre_dict)
    object3['genre_list'] = genres_list
    return jsonify(object3)


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
    object['category_name'] = name
    return jsonify(object)


@app.route('/create_album', methods=['POST', 'GET'])
def create_album():
    # album_list = []
    singer_id = request.get_json()['singer_id']
    print(singer_id)
    album_name = request.get_json()['name']
    exist_album = Album.query.filter(Album.album_name == album_name).first()
    if not exist_album:
        album = Album(album_owner=singer_id, album_name=album_name)
        db.session.add(album)
        db.session.commit()
    # albums = Album.query.filter_by(album_owner=singer_id).all()
    # for album1 in albums:
    #     album1_dict = {'album_name': album1.album_name}
    #     album_list.append(album1_dict)
    return 'true'


@app.route('/create_type', methods=['POST', 'GET'])
def create_type():
    types = request.get_json()['type']
    body = {}
    print(types)
    if types == "artist":
        singer_name = request.get_json()['name']
        img = request.get_json()['img']
        artist = Singer(singer_name=singer_name, singer_img=img)
        db.session.add(artist)
        db.session.commit()
        body['artist_name'] = singer_name
    elif types == 'category':
        category_name = request.get_json()['name']
        ctgr = Category(category_type=category_name)
        db.session.add(ctgr)
        db.session.commit()
        body['category_name'] = category_name
    else:
        genre_type = request.get_json()['name']
        genre = Genre(genre_type=genre_type)
        db.session.add(genre)
        db.session.commit()
        body['genre_name'] = genre_type
    return jsonify(body)


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
    object['genre_name'] = name
    return jsonify(object)


@app.route('/create_artist', methods=['POST', 'GET'])
def create_artist():
    artist_list = []
    object = {}

    name = request.get_json()['name']
    img = request.get_json()['img']
    artist = Singer(singer_name=name, singer_img=img)
    db.session.add(artist)
    db.session.commit()

    artists = Singer.query.all()
    for artist1 in artists:
        artist_dict = {'artist_name': artist1.singer_name}
        artist_list.append(artist_dict)
    object['artist_list'] = artist_list
    object['artist_name'] = name
    return jsonify(object)


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
