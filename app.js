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

        Object.values(data.company.buyer).forEach(element => {
            const p = document.createElement('p');
            p.innerText = element;
            pirkejas.appendChild(p);
        });

        const ulPrekes = document.getElementById('prekesList');
        const ulKiekis = document.getElementById('kiekisList');
        const ulKaina = document.getElementById('kainaVntList');
        const ulNuolaida = document.getElementById('nuolaidaList');
        const ulViso = document.getElementById('visoList');

        data.items.forEach(item => {
            const li = document.createElement('li');
            li.innerText = item.description;
            ulPrekes.appendChild(li);
            li.innerText = item.quantity;
            ulKiekis.appendChild(li);
            li.innerText = item.price;
            ulKaina.appendChild(li);
            if (item.discount = []) {
                li.innerText = '-';
            } else {
                li.innerText = item.discount.value;
            }
            ulNuolaida.appendChild(li);
            if (item.discount.type === 'fixed') {
                // const suNuolaida = item.price * item.quantity - item.discount.value;
                li.innerText = `-`
            } else {
                // const suNuolaida = item.price * item.quantity - (item.price * item.quantity) * item.discount.value / 100;
            }
        });
    })
    .catch(error => console.error("Klaida gaunant duomenis iš API:", error));