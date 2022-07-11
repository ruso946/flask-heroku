function guardar() {

    let n = document.getElementById("txtNombre").value
    let a = document.getElementById("txtApellido").value
    let d = parseInt(document.getElementById("txtDni").value)

    let paciente = {
        nombre: n,
        apellido: a,
        dni: d
    }
    let url = "postgresql://sbqpukpltgbsob:81a92444fd4a550fa8113b687e5fe6edcc4bb72cd8f86732ae7da9b3d90ae513@ec2-3-225-213-67.compute-1.amazonaws.com:5432/dpasaokdnj2qr"
    var options = {
        body: JSON.stringify(paciente),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
       // redirect: 'follow'
    }
    fetch(url, options)
        .then(function () {
            window.location.href = "index.html";

            // Handle response we get from the API
        })
        .catch(err => {
            //this.errored = true
            alert("Error al grabar" )
            console.error(err);
        })
}