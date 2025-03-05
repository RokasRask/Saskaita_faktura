document.addEventListener('DOMContentLoaded', function() {
    // Fetch invoice data
    fetch('https://in3.dev/inv/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            renderInvoice(data);
            setupPrintButton();
        })
        .catch(error => {
            console.error('Failed to fetch invoice data:', error);
            document.querySelector('.saskaitaContainer').innerHTML = 
                '<div style="color: red; text-align: center; padding: 20px;">' +
                '<h2>Nepavyko gauti sąskaitos duomenų</h2>' +
                '<p>Bandykite atnaujinti puslapį arba susisiekite su administratoriumi.</p>' +
                '</div>';
        });
});

function renderInvoice(data) {
    // Set invoice header info
    document.getElementById('saskaitaNr').innerText = data.number;
    document.getElementById('saskaitaData').innerText = formatDate(data.date);
    document.getElementById('apmoketiIki').innerText = formatDate(data.due_date);

    // Set seller and buyer info
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

    // Set items info
    const ulPrekes = document.getElementById('prekesList');
    const ulKiekis = document.getElementById('kiekisList');
    const ulKaina = document.getElementById('kainaVntList');
    const ulNuolaida = document.getElementById('nuolaidaList');
    const ulViso = document.getElementById('visoList');

    let tarpineSuma = 0;

    // Sukuriame masyvą, kad galėtume nustatyti maksimalų aukštį
    const rows = [];
    
    data.items.forEach((item, index) => {
        // Item description
        const liPrekes = document.createElement('li');
        liPrekes.innerText = item.description;
        ulPrekes.appendChild(liPrekes);
        
        // Item quantity
        const liKiekis = document.createElement('li');
        liKiekis.innerText = item.quantity;
        ulKiekis.appendChild(liKiekis);
        
        // Item price
        const liKaina = document.createElement('li');
        liKaina.innerText = formatCurrency(item.price);
        ulKaina.appendChild(liKaina);
        
        // Item discount
        const liNuolaida = document.createElement('li');
        let itemTotal = 0;
        
        if (!item.discount || Object.keys(item.discount).length === 0) {
            liNuolaida.innerText = '-';
            itemTotal = item.price * item.quantity;
        } else if (item.discount.type === 'fixed') {
            liNuolaida.innerText = `-${formatCurrency(item.discount.value)} (fiksuota)`;
            itemTotal = item.price * item.quantity - item.discount.value;
        } else if (item.discount.type === 'percentage') {
            const nuolaidaEurais = (item.price * item.quantity) * (item.discount.value / 100);
            liNuolaida.innerText = `-${item.discount.value}% (${formatCurrency(nuolaidaEurais)})`;
            itemTotal = item.price * item.quantity - nuolaidaEurais;
        } else {
            liNuolaida.innerText = '-';
            itemTotal = item.price * item.quantity;
        }
        ulNuolaida.appendChild(liNuolaida);
        
        // Item total
        const liViso = document.createElement('li');
        liViso.innerText = formatCurrency(itemTotal);
        ulViso.appendChild(liViso);
        
        // Išsaugome kiekvieną eilutę, kad vėliau galėtume suderinti aukščius
        rows.push({
            index: index,
            elements: [liPrekes, liKiekis, liKaina, liNuolaida, liViso]
        });

        tarpineSuma += itemTotal;
    });
    
    // Sinchronizuojame stulpelių aukščius
    setTimeout(syncRowHeights, 0);
    
    // Set summary totals
    tarpineSuma += data.shippingPrice;
    document.getElementById('transportoIslaidos').innerText = formatCurrency(data.shippingPrice) + '€';
    document.getElementById('tarpineSuma').innerText = formatCurrency(tarpineSuma) + '€';
    
    const pvm = tarpineSuma * 0.21;
    document.getElementById('pvm').innerText = formatCurrency(pvm) + '€';
    
    const galutineSuma = tarpineSuma + pvm;
    document.getElementById('galutineSuma').innerText = formatCurrency(galutineSuma) + '€';
}

// Print functionality
function setupPrintButton() {
    const printBtn = document.getElementById('printBtn');
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            window.print();
        });
    }
}

// Helper function to format currency
function formatCurrency(value) {
    return value.toFixed(2);
}

// Helper function to format date (assuming date is in YYYY-MM-DD format)
function formatDate(dateString) {
    if (!dateString) return '';
    
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('lt-LT', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    } catch (e) {
        console.error('Date formatting error:', e);
        return dateString;
    }
}

// Function to synchronize row heights across all columns
function syncRowHeights() {
    const ulPrekes = document.getElementById('prekesList');
    const ulKiekis = document.getElementById('kiekisList');
    const ulKaina = document.getElementById('kainaVntList');
    const ulNuolaida = document.getElementById('nuolaidaList');
    const ulViso = document.getElementById('visoList');
    
    const prekesList = ulPrekes.querySelectorAll('li');
    const kiekisList = ulKiekis.querySelectorAll('li');
    const kainaList = ulKaina.querySelectorAll('li');
    const nuolaidaList = ulNuolaida.querySelectorAll('li');
    const visoList = ulViso.querySelectorAll('li');
    
    // Reset heights to auto first
    const allLists = [prekesList, kiekisList, kainaList, nuolaidaList, visoList];
    allLists.forEach(list => {
        Array.from(list).forEach(li => {
            li.style.height = 'auto';
        });
    });
    
    // Now find max height for each row and apply it
    for (let i = 0; i < prekesList.length; i++) {
        const rowElements = [
            prekesList[i],
            kiekisList[i],
            kainaList[i],
            nuolaidaList[i],
            visoList[i]
        ];
        
        // Get the maximum height from this row
        let maxHeight = Math.max(...rowElements.map(el => el.offsetHeight));
        
        // Add a little extra padding
        maxHeight += 10;
        
        // Apply the same height to all elements in this row
        rowElements.forEach(el => {
            el.style.height = `${maxHeight}px`;
        });
    }
}