let selectedCategory = null;
let rating = null;
let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || { Wein: [], Met: [], Bier: [] };

// Funktion, um eine Kategorie auszuwählen
function setCategory(category) {
    selectedCategory = category;
    document.getElementById('category-buttons').classList.add('hidden');
    document.getElementById('feedback-form').classList.remove('hidden');
    document.getElementById('category-name').textContent = category + " bewerten - 1 (sehr gut) bis 6 (sehr schlecht)";
}

// Funktion, um die Bewertung zu setzen
function setRating(num) {
    rating = num;
    // Alle Bewertungen zurücksetzen
    for (let i = 1; i <= 6; i++) {
        const button = document.getElementById('btn-' + i);
        if (i === num) {
            button.classList.add('selected'); // Ausgewählte Schaltfläche hervorheben
        } else {
            button.classList.remove('selected'); // Andere Schaltflächen zurücksetzen
        }
    }
}

// Funktion, um das Feedback abzusenden
function submitFeedback() {
    if (rating === null) return;

    // Feedback hinzufügen
    feedbacks[selectedCategory].push({ rating, comment: document.getElementById('comment').value });
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

    //buttons reset
    for (let i = 1; i <= 6; i++) {
        const button = document.getElementById('btn-' + i);
        button.classList.remove('selected'); // Schaltflächen zurücksetzen
    }
    // Zurück zur Startseite
    document.getElementById('feedback-form').classList.add('hidden');
    document.getElementById('status').classList.remove('hidden');
    document.getElementById('status-category').textContent = selectedCategory;
    
    // Textfeld zurücksetzen
    document.getElementById('comment').value = '';
    rating = null; // Bewertung zurücksetzen

}

// Funktion, um zurück zur Startseite zu gehen
function backToHome() {
    document.getElementById('status').classList.add('hidden');
    document.getElementById('category-buttons').classList.remove('hidden');
    updateAverages(); // Durchschnitte neu berechnen
}

// Durchschnitt berechnen
function updateAverages() {
    const categories = ['Wein', 'Met', 'Bier'];
    categories.forEach(category => {
        const ratings = feedbacks[category].map(f => f.rating);
        const average = ratings.length === 0 ? '-' : (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1);
        document.getElementById(category.toLowerCase() + '-avg').textContent = `${category}: ${average}`;
    });
}

// Exportieren der Daten
// function exportData() {
//     const blob = new Blob([JSON.stringify(feedbacks, null, 2)], { type: 'application/json' });
//     const a = document.createElement('a');
//     a.href = URL.createObjectURL(blob);
//     a.download = 'feedbacks.json';
//     a.click();
// }

function exportData() {
    // JSON-Daten in einen String umwandeln
    const jsonString = JSON.stringify(feedbacks, null, 2);

    // JSON-Inhalt in das 'json-content'-Element setzen
    document.getElementById('json-content').textContent = jsonString;

    // Den JSON-Anzeige-Bereich sichtbar machen
    document.getElementById('json-display').classList.remove('hidden');
}


// Importieren der Daten
function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        feedbacks = JSON.parse(e.target.result);
        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
        updateAverages(); // Durchschnitte neu berechnen
    };
    reader.readAsText(file);
}

// Initiales Update der Durchschnittswerte
updateAverages();