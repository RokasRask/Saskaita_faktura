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

        let tarpineSuma = 0;

        data.items.forEach(item => {
            
            const liPrekes = document.createElement('li');
            liPrekes.innerText = item.description;
            ulPrekes.appendChild(liPrekes);

            const liKiekis = document.createElement('li');
            liKiekis.innerText = item.quantity;
            ulKiekis.appendChild(liKiekis);

            const liKaina = document.createElement('li');
            liKaina.innerText = item.price;
            ulKaina.appendChild(liKaina);

            const liNuolaida = document.createElement('li');
            if (item.discount.length === 0) {
                liNuolaida.innerText = '-';
            } else if (item.discount.type === 'fixed') {
                liNuolaida.innerText = `-${item.discount.value}€ (fiksuota)`;
            } else {
                const nuolaidaEurais = (item.price * item.quantity) * (item.discount.value / 100);
                liNuolaida.innerText = `-${item.discount.value}% (${nuolaidaEurais.toFixed(2)}€)`;
            }
            ulNuolaida.appendChild(liNuolaida);

            const liViso = document.createElement('li');
            if (item.discount.type === 'fixed') {
                liViso.innerText = (item.price * item.quantity - item.discount.value).toFixed(2);
            } else if (item.discount.type === 'percentage') {
                const suNuolaida = item.price * item.quantity - ((item.price * item.quantity) * item.discount.value / 100);
                liViso.innerText = suNuolaida.toFixed(2);
            } else {
                liViso.innerText = (item.price * item.quantity).toFixed(2);
            }

            tarpineSuma += parseInt(liViso.textContent);
            ulViso.appendChild(liViso);
        });
        
        document.getElementById('transportoIslaidos').innerText = `${data.shippingPrice.toFixed(2)}€`;
        document.getElementById('tarpineSuma').innerText = `${tarpineSuma.toFixed(2)}€`;
        const pvm = tarpineSuma * 0.21;
        document.getElementById('pvm').innerText = `${pvm.toFixed(2)}€`;
        const galutineSuma = tarpineSuma + pvm + data.shippingPrice;
        document.getElementById('pvm').innerText = `${galutineSuma.toFixed(2)}€`;
    })
    .catch(error => console.error("Klaida gaunant duomenis iš API:", error));