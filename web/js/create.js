function guardar() {

    let n = document.getElementById("txtNombre").value
    let a = document.getElementById("txtApellido").value
    let d = parseInt(document.getElementById("txtDni").value)

    let paciente = {
        nombre: n,
        apellido: a,
        dni: d
    }
    let url = "postgresql://ycjxruewvzsvcx:c11aa5259114b649dac47d926d7c428d1ec561d071ed95fa8f207a8e480644f3@ec2-44-198-82-71.compute-1.amazonaws.com:5432/ddg3ll5sag9984"
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