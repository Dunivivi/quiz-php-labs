import { Question } from '../models/question';

export const LAB2_QUESTIONS: Question[] = [
  // ───────────── THEORY (8) ─────────────
  {
    type: 'theory',
    question:
      'Care este diferența principală dintre include și require în PHP, atunci când fișierul indicat lipsește de pe disc?',
    options: [
      'require afișează doar un avertisment, iar include oprește scriptul',
      'include afișează doar un avertisment (Warning) și scriptul continuă, iar require oprește scriptul cu o eroare fatală',
      'Ambele opresc întotdeauna scriptul, indiferent de fișier',
      'Ambele ignoră eroarea și continuă fără niciun mesaj',
    ],
    correct: 1,
    explanation:
      'include doar avertizează (Warning) dacă fișierul lipsește, iar scriptul continuă; require oprește scriptul cu o eroare fatală (Fatal error).',
  },
  {
    type: 'theory',
    question:
      'La ce ajută varianta _once (include_once / require_once) față de include / require simplu?',
    options: [
      'Face fișierul să se descarce mai repede de pe server',
      'Verifică automat parola utilizatorului',
      'Se asigură că același fișier nu este inclus de mai multe ori în același script, evitând erori precum redeclararea unei funcții',
      'Permite includerea fișierelor de pe alt site',
    ],
    correct: 2,
    explanation:
      '_once ține minte fișierele deja incluse și le sare la o nouă cerere de includere, evitând, de exemplu, eroarea "Cannot redeclare function".',
  },
  {
    type: 'theory',
    question:
      'De ce se recomandă ca header.php și footer.php să fie incluse (cu include/require) în fiecare pagină a site-ului, în loc să fie copiate manual pe fiecare pagină?',
    options: [
      'Pentru că PHP nu permite copierea codului HTML',
      'Pentru că fișierele incluse rulează mai rapid decât codul copiat',
      'Pentru că altfel site-ul nu poate fi accesat prin localhost',
      'Pentru că, astfel, o modificare făcută o singură dată în header.php sau footer.php apare automat pe toate paginile care le includ',
    ],
    correct: 3,
    explanation:
      'Reutilizarea componentelor înseamnă că orice modificare (de exemplu, în meniu) se face o singură dată și se reflectă imediat pe întregul site.',
  },
  {
    type: 'theory',
    question:
      'Conform structurii recomandate pentru Laboratorul 2 (index.php, pagini/, header.php, footer.php, style.css, script.js), ce ar trebui să conțină folderul pagini/?',
    options: [
      'Fișierele PHP proprii fiecărei pagini (de exemplu despre.php, contact.php), cu conținutul specific fiecăreia',
      'Stilurile CSS ale site-ului',
      'Codul JavaScript pentru meniu și carusel',
      'O copie a fișierelor header.php și footer.php',
    ],
    correct: 0,
    explanation:
      'header.php și footer.php stau la rădăcina proiectului, fiind comune; pagini/ conține doar fișierele specifice fiecărei pagini din meniu.',
  },
  {
    type: 'theory',
    question:
      'Conform cerinței privind Footer-ul din Laboratorul 2, ce trebuie să afișeze acesta pe fiecare pagină?',
    options: [
      'Doar formularul de autentificare',
      'Numele proiectului și versiunea curentă (de exemplu, versiunea 2.0)',
      'Lista tuturor imaginilor din carusel',
      'Meniul hamburger',
    ],
    correct: 1,
    explanation:
      'Cerința 7 (Footer) spune clar: se afișează numele proiectului și versiunea curentă; fiind Laboratorul 2, versiunea este 2.0.',
  },
  {
    type: 'theory',
    question:
      'Ce se cere, în mod concret, pentru pagina de autentificare (login) în Laboratorul 2?',
    options: [
      'Conectarea completă la o bază de date de utilizatori',
      'Criptarea parolei cu un algoritm hash',
      'Doar interfața paginii, fără verificarea reală a utilizatorului și a parolei',
      'Trimiterea unui email de confirmare la conectare',
    ],
    correct: 2,
    explanation:
      'Cerința 4 precizează explicit: în acest laborator se cere doar interfața paginii de autentificare, fără verificarea utilizatorului și a parolei.',
  },
  {
    type: 'theory',
    question:
      'La apăsarea butonului hamburger din Header, panoul lateral cu meniul trebuie să se deschidă și să se poată închide. Cine se ocupă, în mod normal, de această reacție la click?',
    options: [
      'PHP, care rulează din nou pe server la fiecare click',
      'MySQL, prin interogarea bazei de date',
      'Fișierul footer.php',
      'JavaScript, care rulează în browser și modifică afișarea panoului (de exemplu adăugând/eliminând o clasă CSS)',
    ],
    correct: 3,
    explanation:
      'PHP generează pagina o singură dată, pe server, înainte să ajungă la utilizator; reacția la click este gestionată de JavaScript, în browser, de obicei prin comutarea unei clase CSS, cu efectul vizual dat de CSS.',
  },
  {
    type: 'theory',
    question:
      'Cerința 8 spune că pagina, meniul și caruselul trebuie să rămână utilizabile pe un ecran mai îngust (design responsive). Ce tehnologie se ocupă în principal de această adaptare?',
    options: [
      'CSS (de exemplu media queries), care rulează în browser',
      'PHP, prin instrucțiuni include diferite pentru fiecare ecran',
      'Fișierul index.php, care detectează automat limba utilizatorului',
      'Baza de date',
    ],
    correct: 0,
    explanation:
      'Adaptarea la lățimea ecranului (responsive) este o problemă de afișare, rezolvată în CSS (media queries), pe partea de client, nu pe server (PHP).',
  },

  // ───────────── ANALYSIS (6) ─────────────
  {
    type: 'analysis',
    question:
      'Ce se afișează (pe lângă avertisment) după rularea codului de mai jos, dacă fișierul lipsa_inc.php NU există pe disc?',
    code: `<?php
include "lipsa_inc.php";
echo "Pagina continua";`,
    options: [
      '"Pagina continua" (scriptul continuă după avertisment)',
      'Doar avertismentul (Warning), fără niciun alt text',
      'Eroare fatală, scriptul se oprește complet',
      'Pagina HTML este complet goală',
    ],
    correct: 0,
    explanation:
      'include afișează un Warning când fișierul lipsește, dar nu oprește scriptul, așa că linia echo se execută normal.',
  },
  {
    type: 'analysis',
    question:
      'Ce se întâmplă la rularea codului de mai jos, dacă fișierul lipsa_req.php NU există?',
    code: `<?php
require "lipsa_req.php";
echo "Nu ar trebui sa se afiseze";`,
    options: [
      'Se afișează un avertisment, apoi textul "Nu ar trebui sa se afiseze"',
      'Scriptul se oprește cu o eroare fatală (Fatal error), iar textul de după require NU se mai afișează',
      'PHP ignoră linia require și continuă normal',
      'Fișierul lipsa_req.php este creat automat',
    ],
    correct: 1,
    explanation:
      'require generează o eroare fatală ("Failed opening required...") când fișierul lipsește, iar execuția scriptului se oprește complet.',
  },
  {
    type: 'analysis',
    question:
      'Fișierul pagini/despre.php conține codul de mai jos, dar header.php se află de fapt cu un nivel mai sus (în directorul rădăcină al proiectului, nu în pagini/). Ce se întâmplă la accesarea paginii?',
    code: `<?php
// continutul fisierului pagini/despre.php
require "header.php";
echo " - Continut despre";`,
    options: [
      'header.php este găsit automat, oriunde s-ar afla pe disc',
      'Se afișează doar un avertisment, iar restul paginii se încarcă normal',
      'Eroare fatală: PHP nu găsește header.php, pentru că îl caută în pagini/, nu în directorul de deasupra',
      'PHP schimbă automat calea în "../header.php"',
    ],
    correct: 2,
    explanation:
      'Calea relativă dintr-un include/require se raportează la directorul fișierului care rulează; din pagini/, e nevoie de "../header.php" pentru a ajunge la fișierul din directorul de deasupra.',
  },
  {
    type: 'analysis',
    question:
      'Fișierul functii.php conține definiția funcției saluta(). Care rând din codul de mai jos provoacă o eroare fatală ("Cannot redeclare function")?',
    code: `<?php
require "functii.php";     // randul 1
require "functii.php";     // randul 2
saluta();`,
    options: [
      'Rândul 1 (primul require)',
      'Linia cu saluta();',
      'Niciun rând, codul rulează fără erori',
      'Rândul 2 (al doilea require, pentru că funcția saluta() a fost deja declarată)',
    ],
    correct: 3,
    explanation:
      'require (fără _once) include din nou funcții.php la al doilea apel, iar PHP nu permite declararea de două ori a aceleiași funcții.',
  },
  {
    type: 'analysis',
    question:
      'Ce cod HTML primește browserul (de exemplu în "View Page Source"), după ce PHP execută scriptul de mai jos?',
    code: `<?php
$nume_proiect = "Cofetaria Dulce";
?>
<h1><?php echo $nume_proiect; ?></h1>
<p>Bine ai venit!</p>`,
    options: [
      '<h1>Cofetaria Dulce</h1><p>Bine ai venit!</p> — fără nicio urmă de cod PHP',
      'Exact codul de mai sus, inclusiv etichetele <?php ?>',
      'O eroare de sintaxă, pentru că HTML și PHP nu pot fi amestecate',
      'O pagină complet goală',
    ],
    correct: 0,
    explanation:
      'PHP rulează exclusiv pe server; browserul primește doar rezultatul, adică HTML pur, cu variabilele deja înlocuite cu valorile lor.',
  },
  {
    type: 'analysis',
    question:
      'În codul de mai jos, care legătură din meniu primește class=\'active\'?',
    code: `<?php
$pagini = ["index.php" => "Acasa", "despre.php" => "Despre", "contact.php" => "Contact"];
$pagina_curenta = "contact.php";
foreach ($pagini as $url => $nume) {
    $clasa = ($url == $pagina_curenta) ? "active" : "";
    echo "<a class='$clasa' href='$url'>$nume</a>";
}`,
    options: ['Acasa', 'Despre', 'Contact', 'Toate trei, în același timp'],
    correct: 2,
    explanation:
      'La fiecare pas din foreach se compară $url cu $pagina_curenta ("contact.php"); doar linkul spre contact.php primește clasa "active".',
  },

  // ───────────── FILL (6) ─────────────
  {
    type: 'fill',
    question:
      'Completează instrucțiunea care, dacă fișierul config.php NU există, oprește scriptul cu o eroare fatală (Fatal error), spre deosebire de include, care doar afișează un avertisment.',
    code: `<?php
____ "config.php";
echo "Continuare";`,
    answers: ['require', 'require_once'],
    explanation:
      'Atât require, cât și require_once opresc scriptul cu o eroare fatală dacă fișierul lipsește; include și include_once doar afișează un avertisment.',
  },
  {
    type: 'fill',
    question:
      'Fișierul functii.php conține definiția funcției saluta(). Completează instrucțiunea de pe rândul 2, astfel încât fișierul să nu mai fie inclus a doua oară, iar codul să ruleze fără eroarea "Cannot redeclare function saluta()".',
    code: `<?php
require "functii.php";
____ "functii.php";
echo "Gata";`,
    answers: ['require_once', 'include_once'],
    explanation:
      'require_once și include_once verifică dacă fișierul a fost deja inclus (indiferent cu ce instrucțiune) și nu îl mai includ a doua oară, evitând redeclararea funcției.',
  },
  {
    type: 'fill',
    question:
      'index.php definește variabila $titlu_pagina înainte de a include header.php. Completează ce lipsește în header.php, pentru ca titlul afișat în browser să fie "Despre noi".',
    code: `<?php
// index.php
$titlu_pagina = "Despre noi";
require "header.php";

// header.php
echo "<title>" . ____ . "</title>";`,
    answers: ['$titlu_pagina'],
    explanation:
      'Variabila $titlu_pagina este definită în index.php ÎNAINTE de require, deci rămâne disponibilă și în header.php, după ce acesta este inclus.',
  },
  {
    type: 'fill',
    question:
      'Completează ce lipsește, pentru ca footer-ul să afișeze exact "MagazinOnline - Versiunea 2.0".',
    code: `<?php
$nume_proiect = "MagazinOnline";
$versiune = "2.0";
echo "$nume_proiect - Versiunea " . ____;`,
    answers: ['$versiune'],
    explanation:
      'Footer-ul trebuie să afișeze numele proiectului și versiunea curentă; valoarea "2.0" este păstrată în variabila $versiune.',
  },
  {
    type: 'fill',
    question:
      'Completează cuvântul cheie care lipsește, pentru ca fiecare pagină din tabloul $pagini să fie transformată într-un link <a> din meniu.',
    code: `<?php
$pagini = ["index.php" => "Acasa", "despre.php" => "Despre"];
____ ($pagini as $url => $nume) {
    echo "<a href='$url'>$nume</a>";
}`,
    answers: ['foreach'],
    explanation:
      'foreach parcurge tabloul asociativ $pagini element cu element, oferind la fiecare pas cheia ($url) și valoarea ($nume), potrivit pentru generarea meniului.',
  },
  {
    type: 'fill',
    question:
      'Completează valoarea care lipsește, pentru ca link-ul către pagina curentă să primească class=\'active\'.',
    code: `<?php
$pagina_curenta = "despre.php";
$url = "despre.php";
$clasa = ($url == $pagina_curenta) ? ____ : "";
echo "<a class='$clasa' href='$url'>Despre</a>";`,
    answers: ['"active"'],
    explanation:
      'Când $url este egal cu $pagina_curenta, operatorul ternar întoarce șirul "active", folosit apoi ca valoare pentru class, pentru a marca vizual pagina curentă.',
  },
];
