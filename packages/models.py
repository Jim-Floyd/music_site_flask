from app import *

db = SQLAlchemy()


def setup(app):
    app.config.from_object('packages.config')
    db.app = app
    db.init_app(app)
    migrate = Migrate(app, db)
    return db


class Users(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(), unique=True, nullable=False)
    email = db.Column(db.String())
    password = db.Column(db.String())
    admin = db.Column(db.Boolean(), default=False)


class Singer(db.Model):
    __tablename__ = "singer"
    id = db.Column(db.Integer, primary_key=True)
    singer_name = db.Column(db.String())
    singer_img = db.Column(db.String(), nullable=True)
    singer_musics = db.relationship("Musics", backref="owner")
    singer_album = db.relationship("Album", backref="singers_album")


class Musics(db.Model):
    __tablename__ = "music"
    id = db.Column(db.Integer, primary_key=True)
    music_name = db.Column(db.String())
    music_img = db.Column(db.String())
    music_owner = db.Column(db.Integer, db.ForeignKey('singer.id'))
    # db.relationship("Genere", backref="musics")
    music_genre = db.Column(db.Integer, db.ForeignKey('genre.id'))
    music_category = db.Column(db.Integer, db.ForeignKey('category.id'))
    # db.relationship("Category", backref="musics_catygory")
    music_album = db.Column(db.Integer, db.ForeignKey('album.id'))
    # db.relationship("Album", backref="musics_albums")


class Genre(db.Model):
    __tablename__ = "genre"
    id = db.Column(db.Integer, primary_key=True)
    genre_music = db.relationship("Musics", backref="genre")
    # db.Column(db.Integer, db.ForeignKey('music.id'))
    genre_type = db.Column(db.String())


class Album(db.Model):
    __tablename__ = 'album'
    id = db.Column(db.Integer, primary_key=True)
    album_name = db.Column(db.String())
    album_owner = db.Column(db.Integer, db.ForeignKey("singer.id"))
    album_music = db.relationship("Musics", backref="album_music")
    # db.Column(db.Integer, db.ForeignKey('music.id'))


class Category(db.Model):
    __tablename__ = 'category'
    id = db.Column(db.Integer, primary_key=True)
    category_type = db.Column(db.String())
    category_music = db.relationship("Musics", backref="category")
    # db.Column(db.Integer, db.ForeignKey("music.id"))
