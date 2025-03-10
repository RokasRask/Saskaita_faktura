# Invoice Generator / Sąskaitų generatorius

## English

### Description
This is a web-based invoice generator that fetches data from an external API and displays it in a professional-looking invoice format. The application is designed to look like a real invoice, with support for printing to PDF.

### Features
- Clean, professional invoice design
- Automatic loading of invoice data from API
- Support for discounts (fixed amount or percentage)
- Proper calculation of subtotals, VAT, and final amounts
- Print to PDF functionality with one click
- Responsive design
- Automatic row height adjustment for long product names

### Availability
This project is hosted on GitHub Pages. You can access the live version at the corresponding GitHub Pages URL.

### Usage
1. The invoice will automatically load data from the API
2. To print the invoice or save as PDF, click the "Print PDF" button in the top right corner
3. In the print dialog, you can choose to print or save as PDF

### Files
- `index.html` - The HTML structure of the invoice
- `style.css` - The styling for the invoice
- `app.js` - The JavaScript logic for fetching data and handling interactions

### Technical Details
- The application fetches invoice data from `https://in3.dev/inv/`
- The invoice includes seller and buyer information, item details, shipping costs, and tax calculations
- The code automatically handles different types of discounts and calculates totals accordingly

## Lietuvių kalba

### Aprašymas
Tai internetinis sąskaitų generatorius, kuris gauna duomenis iš išorinės API ir atvaizduoja juos profesionaliai atrodančioje sąskaitos faktūros formoje. Programa sukurta taip, kad atrodytų kaip tikra sąskaita faktūra, su galimybe spausdinti į PDF formatą.

### Funkcijos
- Švarus, profesionalus sąskaitos dizainas
- Automatinis sąskaitos duomenų užkrovimas iš API
- Palaikomos nuolaidos (fiksuota suma arba procentinė)
- Teisingas tarpinių sumų, PVM ir galutinių sumų skaičiavimas
- Spausdinimo į PDF funkcija vienu paspaudimu
- Adaptyvus dizainas
- Automatinis eilučių aukščio pritaikymas ilgiems produktų pavadinimams

### Prieinamumas
Šis projektas yra patalpintas GitHub Pages platformoje. Galite pasiekti veikiančią versiją atitinkamu GitHub Pages URL adresu.

### Naudojimas
1. Sąskaita automatiškai užkraus duomenis iš API
2. Norėdami spausdinti sąskaitą arba išsaugoti kaip PDF, spauskite mygtuką "Spausdinti PDF" viršutiniame dešiniajame kampe
3. Spausdinimo dialogo lange galite pasirinkti spausdinti arba išsaugoti kaip PDF

### Failai
- `index.html` - HTML sąskaitos struktūra
- `style.css` - Sąskaitos stilius
- `app.js` - JavaScript logika duomenų gavimui ir interakcijų valdymui

### Techninės detalės
- Programa gauna sąskaitos duomenis iš `https://in3.dev/inv/`
- Sąskaitoje pateikiama pardavėjo ir pirkėjo informacija, prekių detalės, transportavimo išlaidos ir mokesčių skaičiavimai
- Kodas automatiškai apdoroja skirtingų tipų nuolaidas ir atitinkamai skaičiuoja sumas