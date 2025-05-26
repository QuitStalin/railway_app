document.addEventListener("DOMContentLoaded", function () {
  const forma = document.getElementById("kontaktForma");

  forma.addEventListener("submit", function (e) {
    const ime = document.getElementById("ime").value.trim();
    const telefon = document.getElementById("telefon").value.trim();
    const email = document.getElementById("email").value.trim();
    const poruka = document.getElementById("poruka").value.trim();

    const porukeGresaka = [];

    // Ime: min 2 slova, samo slova i razmaci
    if (!/^[a-zA-ZšđčćžŠĐČĆŽ\s]{2,}$/.test(ime)) {
      porukeGresaka.push("Unesite ispravno ime (min. 2 slova, bez brojeva).");
    }

    // Telefon: dozvoljen +, min 6 cifara
    if (!/^\+?[0-9]{6,}$/.test(telefon)) {
      porukeGresaka.push("Unesite ispravan broj telefona (min. 6 cifara).");
    }

    // Email: osnovna regex provjera
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      porukeGresaka.push("Unesite ispravan e-mail.");
    }

    // Poruka: bar 10 karaktera
    if (poruka.length < 10) {
      porukeGresaka.push("Poruka mora imati najmanje 10 karaktera.");
    }

    if (porukeGresaka.length > 0) {
      e.preventDefault(); // Spriječi slanje forme
      alert(porukeGresaka.join("\n")); // Prikazuje greške u alert prozoru
    }
  });
});
