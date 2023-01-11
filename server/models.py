from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4



db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    email = db.Column(db.String(345), unique=True)
    password = db.Column(db.Text, nullable=False)

class inscription(db.Model):
    __tablename__= "inscriptions"
    Id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    Description = db.Column(db.String(345), unique=True)
    Title = db.Column(db.String(345), nullable=False)




class Candidat(db.Model):
    __tablename__ = "candidat"
    matricule = db.Column(db.String(345), primary_key=True, unique=True)
    CIN = db.Column(db.String(345), unique=True)
    nom = db.Column(db.String(345))
    prenom = db.Column(db.String(345))
    email = db.Column(db.String(345), unique=True)
    password = db.Column(db.String(345))



class Archive(db.Model):
    __tablename__ = "archive"
    matricule = db.Column(db.String(345), primary_key=True, unique=True)
    CIN = db.Column(db.String(345), unique=True)
    nom = db.Column(db.String(345))
    prenom = db.Column(db.String(345))
    email = db.Column(db.String(345), unique=True)
    password = db.Column(db.String(345))
    annee = db.Column(db.Integer)
