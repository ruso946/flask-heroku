from flask import Flask ,jsonify,request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
app=Flask(__name__)
CORS(app)
# configuro la base de datos, con el nombre el usuario y la clave
app.config['SQLALCHEMY_DATABASE_URI']='postgresql://ycjxruewvzsvcx:c11aa5259114b649dac47d926d7c428d1ec561d071ed95fa8f207a8e480644f3@ec2-44-198-82-71.compute-1.amazonaws.com:5432/ddg3ll5sag9984'
#app.config['SQLALCHEMY_DATABASE_URI']='postgresql://jrjbxumefrnvba:45f8243c7d8e5aa1acea415e0caa9d7691ddf010e4cda206f0acbc4b85fc0e55@ec2-3-223-169-166.compute-1.amazonaws.com:5432/decsgecjdv1sfs'
#                                                   user:clave@localhost/nombreBaseDatos
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
db= SQLAlchemy(app)
ma=Marshmallow(app)
# defino la tabla
class Paciente(db.Model): # la clase Paciente hereda de db.Model
    id=db.Column(db.Integer, primary_key=True) #define los campos de la tabla
    nombre=db.Column(db.String(100))
    apellido=db.Column(db.String(100))
    dni=db.Column(db.Integer)
    def __init__(self,nombre,apellido,dni): #crea el constructor de la clase
        self.nombre=nombre # no hace falta el id porque lo crea sola mysql por ser auto_incremento
        self.apellido=apellido
        self.dni=dni
db.create_all() # crea las tablas


# ************************************************************
class PacienteSchema(ma.Schema):
    class Meta:
        fields=('id','nombre','apellido','dni')
paciente_schema=PacienteSchema() # para crear un paciente
pacientes_schema=PacienteSchema(many=True) # multiples registros


# crea los endpoint o rutas (json)
@app.route('/pacientes',methods=['GET'])
def get_Pacientes():
    all_pacientes=Paciente.query.all() # query.all() lo hereda de db.Model
    result=pacientes_schema.dump(all_pacientes) # .dump() lo hereda de ma.schema
    return jsonify(result)

@app.route('/pacientes/<id>',methods=['GET'])
def get_paciente(id):
    paciente=Paciente.query.get(id)
    return paciente_schema.jsonify(paciente)

@app.route('/pacientes/<id>',methods=['DELETE'])
def delete_paciente(id):
    paciente=Paciente.query.get(id)
    db.session.delete(paciente)
    db.session.commit()
    return paciente_schema.jsonify(paciente)

@app.route('/pacientes', methods=['POST']) # crea ruta o endpoint
def create_paciente():
    print(request.json)  # request.json contiene el json que envio el cliente
    nombre=request.json['nombre']
    apellido=request.json['apellido']
    dni=request.json['dni']
    new_paciente=Paciente(nombre,apellido,dni)
    db.session.add(new_paciente)
    db.session.commit()
    return paciente_schema.jsonify(new_paciente)

@app.route('/pacientes/<id>' ,methods=['PUT'])
def update_paciente(id):
    paciente=Paciente.query.get(id)
   
    nombre=request.json['nombre']
    apellido=request.json['apellido']
    dni=request.json['dni']

    paciente.nombre=nombre
    paciente.apellido=apellido
    paciente.dni=dni
    db.session.commit()
    return paciente_schema.jsonify(paciente)

# programa principal *******************************

if __name__=='__main__':
    app.run(debug=True, port=5432)