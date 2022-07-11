if (document.getElementById("app")) {
    const app = new Vue({
        el: "#app",
        data: {
            pacientes: [],
            errored: false,
            loading: true
        },
        created() {
            var url = 'postgresql://sbqpukpltgbsob:81a92444fd4a550fa8113b687e5fe6edcc4bb72cd8f86732ae7da9b3d90ae513@ec2-3-225-213-67.compute-1.amazonaws.com:5432/dpasaokdnj2qr'
            this.fetchData(url)
        },
        methods: {
            fetchData(url) {
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        this.pacientes = data;
                        this.loading = false;
                    })
                    .catch(err => {
                        this.errored = true
                    })
            },
            eliminar(paciente) {
                const url = 'ppostgres://sbqpukpltgbsob:81a92444fd4a550fa8113b687e5fe6edcc4bb72cd8f86732ae7da9b3d90ae513@ec2-3-225-213-67.compute-1.amazonaws.com:5432/dpasaokdnj2qr/' + paciente;
                var options = {
                    method: 'DELETE',
                }
                fetch(url, options)
                    .then(res => res.text()) // or res.json()
                    .then(res => {
                        location.reload();
                    })
            }
        }
    })
}
