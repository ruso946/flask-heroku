if (document.getElementById("app")) {
    const app = new Vue({
        el: "#app",
        data: {
            pacientes: [],
            errored: false,
            loading: true
        },
        created() {
            var url = 'postgresql://ycjxruewvzsvcx:c11aa5259114b649dac47d926d7c428d1ec561d071ed95fa8f207a8e480644f3@ec2-44-198-82-71.compute-1.amazonaws.com:5432/ddg3ll5sag9984'
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
                const url = 'postgresql://ycjxruewvzsvcx:c11aa5259114b649dac47d926d7c428d1ec561d071ed95fa8f207a8e480644f3@ec2-44-198-82-71.compute-1.amazonaws.com:5432/ddg3ll5sag9984/' + paciente;
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
