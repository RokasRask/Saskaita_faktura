fetch('https://in3.dev/inv/')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        
        
    })
    .catch(error => console.error("Klaida gaunant duomenis iš API:", error));