fetch('https://in3.dev/inv/')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        
        document.getElementById('saskaitaNr').innerText = data.number;
        document.getElementById('saskaitaData').innerText = data.date;
        document.getElementById('apmoketiIki').innerText = data.due_date;

        const pardavejas = document.querySelector('.pardavejas');
        const pirkejas = document.querySelector('.pirkejas');

        Object.values(data.company.seller).forEach(element => {
            const p = document.createElement('p');
            p.innerText = element;
            pardavejas.appendChild(p);
        });
    })
    .catch(error => console.error("Klaida gaunant duomenis iš API:", error));