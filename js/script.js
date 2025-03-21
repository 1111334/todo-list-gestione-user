const todoList = document.getElementById('todo-list');
const saveBtn = document.getElementById('save-btn');
const cancBtn = document.getElementById('canc-btn');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Recupero gli utenti dal localStorage, se esistono, altrimenti uso l'array di default
let utenti = JSON.parse(localStorage.getItem("utenti")) || [];

//CREO UNA FUNZIONE PULISCO LA LISTA E ITERO SULL'ARRAY UTENTI 
// E CREO UN LIST ITEM PER OGNI UTENTE INSERITO E LO SALVO
function aggiornaLista() {
    // PULISCO LA LISTA
    todoList.innerHTML = "";

    utenti.forEach((user, index) => {
        const item = document.createElement('li');
        item.textContent = `Nuovo utente ${index + 1}:  
        Email: ${user.email}, Password: ${user.password}`;

        const imgCancella = document.createElement('img');
        imgCancella.src = 'img/remove.png';
        imgCancella.alt = 'Cancella';
        imgCancella.style.width = '20px';
        imgCancella.style.height = '20px';
        imgCancella.style.cursor = 'pointer';
        imgCancella.style.marginLeft = '10px';
        imgCancella.style.backgroundColor = 'transparent';


        imgCancella.addEventListener('click', () => {
            // Rimuove gli utenti
            utenti.splice(index, 1);


            // Aggiorna il localStorage con l'array vuoto o modificato
            localStorage.setItem("utenti", JSON.stringify(utenti));

            // Aggiorna la lista visibile
            aggiornaLista();
        });
        
        todoList.appendChild(item);
        item.appendChild(imgCancella);

    });
}

saveBtn.addEventListener('click', () => {
    let email = emailInput.value;
    let password = passwordInput.value;

    if (email && password) {

        utenti.push({ email, password });
        // console.log(utenti);
        localStorage.setItem("utenti", JSON.stringify(utenti));

        aggiornaLista();

        emailInput.value = ""
        passwordInput.value = ""

    } else {
        alert("Inserisci email e password")
    };
});

aggiornaLista();

// console.log(Array.isArray(utenti)); // Dovrebbe restituire "true"
// console.log(utenti.length); // Dovrebbe restituire la lunghezza dell'array
// console.log(localStorage.getItem("utenti"));

// cancella tutto
cancBtn.addEventListener('click', () => {
    //   Rimuove gli utenti
    for (let i = 0; i < utenti.length; i++) {
        utenti.splice(i, 1);
        i--;
    }

    //   Aggiorna il localStorage con l'array vuoto o modificato
    localStorage.setItem("utenti", JSON.stringify(utenti));

    //   Aggiorna la lista visibile
    aggiornaLista();
});



