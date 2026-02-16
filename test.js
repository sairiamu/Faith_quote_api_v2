 const text = document.getElementById("text");

        function fetchData(){
            fetch('http://localhost:8080/api/bible/quotes/')
            .then(Response =>Response.json())
            .then(data =>console.log(data))
            .catch(err => console.log(err))
        }