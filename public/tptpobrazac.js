document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("kontaktForma").addEventListener("submit", function (e) {
        const ime = document.getElementById("ime").value.trim();
        const telefon = document.getElementById("telefon").value.trim();
        const email = document.getElementById("email").value.trim();
        const poruka = document.getElementById("poruka").value.trim();
        const greska = document.getElementById("greska");

        if (!ime || !telefon || !email || !poruka) {
            e.preventDefault();
            greska.textContent = "Niste ispravno popunili sva polja.";
        } else {
            greska.textContent = "";
        }
    });
});
