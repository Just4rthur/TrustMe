async function getReviewForPlaceName(searchParam){
    var companyName = searchParam;

    // Kontrollera om det finns något i sökfältet
    if (!companyName) {
        alert("Sök på företag.");
        return;
    }

    showProgress();

    // Gör en HTTP-begäran till backend med företagsnamnet
    try {
        const response = await fetch('http://localhost:8080/places/' + companyName, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        });

        // Kontrollera om svaret är framgångsrikt
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        // Försök att parsa svaret som JSON
        const data = await response.json();

        // Kontrollera om det finns data att visa
        if (data) {
            console.log('Success', data);
            updatePage(data);
            hideProgress();
        } else {
            // Inga resultat hittades
            throw new Error('No results found');
        }
    } catch (error) {
        console.error('Error:', error.message);
        alert("The Company you searched for doesnt exist!")
        // Visa felmeddelande till användaren
        hideProgress();
    }
}


async function getReviewForPlace(searchParam) {
    var companyName = searchParam;

    // Kontrollerar att företaget finns
    if (!companyName) {
        alert("Sök på företag.");
        return;
    }

    const body = {
        name : companyName
    };
    showProgress();

    // Gör en HTTP-begäran till backend med företagsnamnet
    fetch('http://localhost:8080/places', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            updatePage(data);
            hideProgress()
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Funktion för söka med inmatat värde och omdirigerar till index.html
function searchAndRedirect(searchParam) {
    var companyName = document.getElementById("companyName").value;

    // Kontrollerar om det saknas både företagsnamn och sökparametrar *behövs???
    if (!companyName && !searchParam) {
        alert("Sök på företag.");
        return;
    }

    // Bygg URL med sökparametern och navigera till andra sidan med parametern
    var url = "index.html";
    if (searchParam) {
        url += "?search=" + encodeURIComponent(searchParam);
    } else {
        url += "?search=" + encodeURIComponent(companyName);
    }

    window.location.href = url; // Omdirigerar till den byggda URL:en
}

// Funktion för att uppdatera sida med aktuell data
function updatePage(data) {
    // Kontrollera om det finns Google-data att visa
    if (data && data.google) {
        // Uppdatera sidan med Google-information
        const googleData = data.google;
        document.getElementById("name").innerText = googleData.name;

        // Uppdaterar sidan med information från openAI
        const aiData = data.openAI;
        document.getElementById("strengths-data").innerText = aiData.strengths;
        document.getElementById("flaws-data").innerText = aiData.weaknesses;
        document.getElementById("strategy-data").innerText = aiData.action_points;

        // Hitta kartelementet
        const mapImage = document.getElementById("mapImage");

        // Kontrollera om det finns data för Google
        if (data.google.map) {
            mapImage.src = data.google.map;
        } else {
            mapImage.src = ""; // Rensa kartan
            document.getElementById("error-message").innerText = "Ingen kartinformation tillgänglig.";
            document.getElementById("error-message").style.display = "block";
        }
    } else {
        // Visa varning om det inte finns någon data att visa
        document.getElementById("error-message").innerText = "Inga uppgifter hittades för det angivna företaget. Var god försök med ett annat företagsnamn.";
        document.getElementById("error-message").style.display = "block";
    }
}

// Funktion för att visa laddningsindikator
function showProgress() {
    const progress = document.getElementById("progress");
    progress.style.display = "block";
}

// Funktion för att dölja laddningsindikator
function hideProgress() {
    const progress = document.getElementById("progress");
    progress.style.display = "none";
}

// Funktion för att ladda sökparameter från URL
function checkAndLoadSearchParam() {
    const searchParam = new URLSearchParams(window.location.search).get('search');
    console.log(searchParam)
    if (searchParam) {
        getReviewForPlaceName(searchParam);
    }
}

// Funktion för att leta efter klick på sökknapp
function checkSearchButton() {
    const searchButton = document.getElementById("searchButton");

    if (searchButton) {
        searchButton.addEventListener("click", function () {
            var companyName = document.getElementById("companyName").value;
            searchAndRedirect(companyName);
        });
    }
};

// Kör funktioner när DOM laddas
document.addEventListener("DOMContentLoaded", checkAndLoadSearchParam);
document.addEventListener("DOMContentLoaded", checkSearchButton); 