import requests
from flask import *
from flask_bcrypt import Bcrypt
import os
from flask_cors import CORS, cross_origin
from flask_session import Session
from werkzeug.utils import secure_filename
from config import ApplicationConfig
from models import User, inscription, db, Candidat,Archive
from datetime import datetime
import pandas as pd
import datetime

today = datetime.datetime.now()

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

class StudentModel:

    def __init__(self, matricule, CIN, nom,prenom,email,password):
        self.matricule = matricule
        self.CIN = CIN
        self.nom = nom
        self.prenom = prenom
        self.email = email
        self.password=password



class ArchiveModel:

    def __init__(self, matricule, CIN, nom,prenom,email,password,annee):
        self.matricule = matricule
        self.CIN = CIN
        self.nom = nom
        self.prenom = prenom
        self.email = email
        self.password=password
        self.annee = annee



UPLOAD_FOLDER = 'static/files'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()


@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "email": user.email
    })


@app.route('/get_csv',methods=["GET"])
def get_students():
    students = db.session.query(Candidat).order_by(Candidat.nom)
    array =[]
    for student in students:
        array.append(StudentModel(student.matricule, student.CIN,student.nom,student.prenom,student.email,student.password))
    array = json.dumps([ob.__dict__ for ob in array])
    return array



@app.route('/get_archive',methods=["GET"])
def get_archive():
    archives = db.session.query(Archive).order_by(Archive.nom)
    array =[]
    for student in archives:
        array.append(ArchiveModel(student.matricule, student.CIN,student.nom,student.prenom,student.email,student.password,student.annee))
    array = json.dumps([ob.__dict__ for ob in array])
    return array



@app.route('/archive',methods=['POST'])
def archive():
    candidats = db.session.query(Candidat).order_by(Candidat.nom)
    for candidate in candidats:
        archive = Archive(matricule = candidate.matricule, CIN=candidate.CIN,nom= candidate.nom,prenom= candidate.prenom,email=candidate.email, password=candidate.password,annee = today.year-1)
        db.session.add(archive)
        db.session.delete(candidate)
        db.session.commit()

    db.session.commit()
    return "200"







@app.route('/upload', methods=['POST'])
def upload_file():
    """Handles the upload of a file."""
    d = {}
    print("Endpoint touched")
    try:
        uploaded_file = request.files['file']
        if uploaded_file.filename != '':
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], uploaded_file.filename)
            # set the file path
            uploaded_file.save(file_path)
            print(parseCSV(file_path))

        #print(parseCSV(file_path))
        d['status'] = 1
        return "hah"

    except Exception as e:
        print(f"Couldn't upload file {e}")
        d['status'] = 0
        print()
        return "300"



def parseCSV(filePath):

      col_names = ['matricule','CIN','nom', 'prenom','email','password']

      # Use Pandas to parse the CSV file
      csvData = pd.read_csv(filePath, delimiter=',', names=col_names, header=None )
      # Loop through the Rows
      for i,row in csvData.iterrows():
          if row['matricule'] != "matricule":
              student = Candidat(matricule=row['matricule'], CIN=row['CIN'], nom=row['nom'], prenom=row['prenom'], email=row['email'],password = row['password'])
              db.session.add(student)

              db.session.commit()


            #print(row['matricule'])
            #print(student.CIN,student.nom)




             #sql = "INSERT INTO etudiant (first_name, last_name, address, street, state, zip) VALUES (%s, %s, %s, %s, %s, %s)"

             #value = (row['first_name'],row['last_name'],row['address'],row['street'],row['state'],str(row['zip']))
            #  mycursor.execute(sql, value, if_exists='append')
             #mycursor.execute(sql, value)

             #mydb.commit()
             #print(i,row['matricule'],row['CIN'],row['nom'],row['prenom'])


@app.route("/register", methods=["POST"])
def register_user():
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    session["user_id"] = new_user.id

    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })


@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401

    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "email": user.email
    })


@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"


if __name__ == "__main__":
    app.run(debug=True)
