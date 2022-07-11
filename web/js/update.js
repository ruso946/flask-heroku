var args = location.search.substr(1).split('&');
// lee los argumentos pasados a este formulario
var parts = []
for (let i = 0; i < args.length; ++i) {
    parts[i] = args[i].split('=');
}
console.log(args)
document.getElementById("txtId").value = parts[0][1]
document.getElementById("txtNombre").value = parts[1][1]
document.getElementById("txtApellido").value = parts[2][1]
document.getElementById("txtDni").value = parts[3][1]

function modificar() {
    let confirma = confirm("Se modificará el registro con los datos en pantalla ¿Está seguro?");
    if (confirma==true) {
        let id = document.getElementById("txtId").value
        let n = document.getElementById("txtNombre").value
        let a = document.getElementById("txtApellido").value
        let d = parseInt(document.getElementById("txtDni").value)
        let paciente = {
            nombre: n,
            apellido: a,
            dni: d
        }
        let url = "postgres://sbqpukpltgbsob:81a92444fd4a550fa8113b687e5fe6edcc4bb72cd8f86732ae7da9b3d90ae513@ec2-3-225-213-67.compute-1.amazonaws.com:5432/dpasaokdnj2qr/"+id
        var options = {
            body: JSON.stringify(paciente),
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            redirect: 'follow'
        }
        fetch(url, options)
            .then(function () {window.location.href = "index.html";
        })
            /*.then(function () {
                console.log("modificado")
                alert("Registro modificado")
                // Handle response we get from the API
            })*/
            .catch(err => {
                //this.errored = true
                console.error(err);
                alert("Error al Modificar")
            })      
        }
        else {
            window.location.href = "index.html";
        }
    }