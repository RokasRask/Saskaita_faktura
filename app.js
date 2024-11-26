fetch('https://in3.dev/inv/')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        
        document.getElementById('saskaitaNr').innerText = data.number;
    })
    .catch(error => console.error("Klaida gaunant duomenis iš API:", error));