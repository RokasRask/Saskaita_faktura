fetch('https://in3.dev/inv/')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        
        document.getElementById('saskaitaNr').innerText = data.number;
        document.getElementById('saskaitaData').innerText = data.date;
        document.getElementById('apmoketiIki').innerText = data.due_date;

        
    })
    .catch(error => console.error("Klaida gaunant duomenis iš API:", error));