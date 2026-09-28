import { Question } from '../models/question';

export const TEMA2_QUESTIONS: Question[] = [
  // ===== THEORY (8) =====
  {
    type: 'theory',
    question: 'Care este principala diferență între codul client-side și codul server-side?',
    options: [
      'Client-side rulează mai rapid, iar server-side rulează mai încet',
      'Client-side poate accesa baza de date, iar server-side nu',
      'Client-side este scris în PHP, iar server-side în HTML',
      'Client-side rulează în browserul vizitatorului, iar server-side rulează pe serverul Web',
    ],
    correct: 3,
    explanation: 'Codul client-side (HTML, CSS, JavaScript) se execută în browser; codul server-side (de exemplu PHP) rulează pe server, iar browserul primește doar rezultatul.',
  },
  {
    type: 'theory',
    question: 'Ce este o pagină dinamică?',
    options: [
      'Un script care se execută la fiecare cerere și poate produce conținut diferit',
      'Un fișier .html scris o singură dată, identic pentru toți vizitatorii',
      'O pagină care conține doar imagini animate',
      'O pagină care se încarcă mai greu decât una statică',
    ],
    correct: 0,
    explanation: 'Pagina dinamică este un script executat la fiecare cerere; el construiește pagina în acel moment, putând produce rezultate diferite (de ex. în funcție de utilizator sau de baza de date).',
  },
  {
    type: 'theory',
    question: 'De ce nu poți deschide un fișier .php cu dublu clic, ca pe un document Word?',
    options: [
      'Pentru că fișierele .php sunt întotdeauna corupte',
      'Pentru că browserul primește adresa file:/// și nu există niciun server care să execute codul',
      'Pentru că fișierele .php se pot deschide doar cu Notepad',
      'Pentru că extensia .php este rezervată sistemului de operare',
    ],
    correct: 1,
    explanation: 'Un fișier .php nu este un document, ci un program. La dublu clic browserul primește adresa file:///..., nu există server la mijloc, deci fișierul se descarcă sau se vede codul sursă, nu se execută.',
  },
  {
    type: 'theory',
    question: 'Ce reprezintă literele X, A, M, P din numele XAMPP?',
    options: [
      'Xerox, Adobe, Microsoft, Python',
      'eXtra, Automat, Modern, Portabil',
      'Cross-platform, Apache, MariaDB/MySQL, PHP',
      'Cross-platform, Apache, Microsoft, Perl',
    ],
    correct: 2,
    explanation: 'XAMPP = Cross-platform, Apache (serverul Web), MariaDB/MySQL (baza de date) și PHP (interpretorul); pachetul include și Perl, dar acesta nu se folosește la acest modul.',
  },
  {
    type: 'theory',
    question: 'Care este „regula de aur” legată de dosarul htdocs?',
    options: [
      'Fișierele din htdocs se accesează doar cu dublu clic',
      'htdocs conține doar fișiere PHP, niciodată CSS sau imagini',
      'htdocs trebuie mutat pe alt disc pentru a funcționa',
      'htdocs este rădăcina site-ului (http://localhost/); ce e în afara lui nu se vede în browser',
    ],
    correct: 3,
    explanation: 'htdocs = rădăcina site-ului, echivalentă cu http://localhost/. Orice fișier aflat în afara lui nu poate fi accesat prin browser, oricât de corect ar fi codul.',
  },
  {
    type: 'theory',
    question: 'Ce se întâmplă dacă portul 80 este deja ocupat de alt program (de exemplu Skype sau IIS)?',
    options: [
      'Apache pornește automat pe alt port, fără nicio configurare',
      'XAMPP se dezinstalează automat',
      'Apache nu mai pornește; trebuie eliberat portul 80 sau mutat Apache pe alt port (de ex. 8080)',
      'Browserul afișează automat pagina de pe portul 8080',
    ],
    correct: 2,
    explanation: 'La conflict de port, Apache se oprește cu eroare. Soluția este să închizi programul care ocupă portul 80 sau să schimbi în httpd.conf linia Listen 80 cu Listen 8080, apoi accesezi http://localhost:8080/.',
  },
  {
    type: 'theory',
    question: 'Care sunt regulile obligatorii pentru numele unei variabile PHP?',
    options: [
      'Poate conține spații, dacă e scris între ghilimele',
      'Începe cu $, urmat de o literă sau underscore; apoi doar litere, cifre și underscore',
      'Începe cu o literă mare și se termină cu $',
      'Trebuie să fie exact un cuvânt din limba engleză',
    ],
    correct: 1,
    explanation: 'Numele unei variabile PHP începe întotdeauna cu $, urmat de o literă sau underscore; în rest sunt permise doar litere, cifre și underscore, fără spații, cratime sau diacritice.',
  },
  {
    type: 'theory',
    question: 'Care este diferența dintre echo și print în PHP?',
    options: [
      'echo funcționează doar cu numere, print doar cu texte',
      'print este mai rapid și de aceea nu se mai folosește echo',
      'Nu există nicio diferență, sunt exact același lucru',
      'echo poate afișa mai multe valori separate prin virgulă și nu întoarce nimic; print afișează un singur text și întoarce mereu 1',
    ],
    correct: 3,
    explanation: 'echo acceptă mai multe valori separate prin virgulă și nu întoarce nimic; print afișează un singur text și întoarce mereu valoarea 1.',
  },

  // ===== ANALYSIS (6) =====
  {
    type: 'analysis',
    question: 'Ce afișează codul de mai jos?',
    code: `<?php
$nume = "Ana";
echo "Salut, $nume!";`,
    options: ['Salut, $nume!', 'Salut, !', 'Eroare de sintaxă', 'Salut, Ana!'],
    correct: 3,
    explanation: 'În ghilimele duble, PHP înlocuiește variabila $nume cu valoarea ei, deci se afișează "Salut, Ana!".',
  },
  {
    type: 'analysis',
    question: 'Ce afișează codul de mai jos?',
    code: `<?php
$a = "12";
$b = "5";
echo $a . $b;`,
    options: ['17', '125', '12+5', 'Eroare'],
    correct: 1,
    explanation: 'Operatorul . lipește (concatenează) cele două texte ca șiruri de caractere, rezultând "125", nu o sumă.',
  },
  {
    type: 'analysis',
    question: 'Ce afișează codul de mai jos?',
    code: `<?php
$a = "12";
$b = "5";
echo $a + $b;`,
    options: ['17', '125', '12+5', 'Eroare'],
    correct: 0,
    explanation: 'Operatorul + face întotdeauna o adunare: PHP transformă cele două texte numerice în numere și le adună, rezultatul fiind 17.',
  },
  {
    type: 'analysis',
    question: 'Ce afișează var_dump($x) în codul de mai jos?',
    code: `<?php
$x = "7";
var_dump($x);`,
    options: ['int(7)', '7', 'NULL', 'string(1) "7"'],
    correct: 3,
    explanation: '$x a fost atribuit cu un text ("7"), deci tipul este string; var_dump arată atât tipul, cât și lungimea: string(1) "7".',
  },
  {
    type: 'analysis',
    question: 'Ce afișează codul de mai jos (atenție la tipul de ghilimele)?',
    code: `<?php
$nume = "Ana";
echo 'Salut, $nume!\\n';`,
    options: ['Salut, Ana!\\n', 'Salut, $nume!\\n', 'Salut, Ana!', 'Eroare de sintaxă'],
    correct: 1,
    explanation: 'Ghilimelele simple nu interpretează variabilele și nici secvențele de evadare: textul se afișează exact așa cum a fost scris, cu $nume și \\n literal.',
  },
  {
    type: 'analysis',
    question: 'Ce afișează codul de mai jos?',
    code: `<?php
$note = [9, 8, 10];
print_r($note);`,
    options: [
      'array(3) { [0]=> int(9) [1]=> int(8) [2]=> int(10) }',
      '9, 8, 10',
      'Array ( [0] => 9 [1] => 8 [2] => 10 )',
      'Eroare: print_r nu acceptă tablouri',
    ],
    correct: 2,
    explanation: 'print_r afișează conținutul tabloului pe înțelesul omului, sub forma Array ( [0] => 9 [1] => 8 [2] => 10 ), fără informații despre tip (spre deosebire de var_dump).',
  },

  // ===== FILL (6) =====
  {
    type: 'fill',
    question: 'Completează semnul cu care trebuie să înceapă neapărat numele oricărei variabile PHP.',
    code: `<?php
____nume = "Ana";
echo $nume;`,
    answers: ['$'],
    explanation: 'Orice variabilă PHP începe obligatoriu cu semnul $, urmat de o literă sau de underscore.',
  },
  {
    type: 'fill',
    question: 'Completează semnul de punctuație care lipsește de pe primul rând (fără el, PHP dă Parse error).',
    code: `<?php
$pret = 250____
echo $pret;`,
    answers: [';'],
    explanation: 'Fiecare instrucțiune PHP se termină obligatoriu cu punct și virgulă (;); lipsa lui produce un Parse error.',
  },
  {
    type: 'fill',
    question: 'Completează eticheta care marchează începutul zonei de cod PHP.',
    code: `____
echo "Salut!";
?>`,
    answers: ['<?php'],
    explanation: '<?php este eticheta de deschidere; tot ce urmează după ea este executat de interpretorul PHP.',
  },
  {
    type: 'fill',
    question: 'Completează numele funcției care, spre deosebire de print_r, arată în plus tipul și lungimea fiecărei valori (instrumentul de depanare al programatorului).',
    code: `<?php
$note = [9, 8, 10];
____($note);`,
    answers: ['var_dump'],
    explanation: 'var_dump() afișează tipul și lungimea fiecărei valori, fiind principalul instrument de depanare al programatorului PHP.',
  },
  {
    type: 'fill',
    question: 'Completează operatorul care adaugă textul din dreapta la finalul variabilei din stânga (prescurtare pentru $mesaj = $mesaj . "...";).',
    code: `<?php
$mesaj = "Pret: 250 lei";
$mesaj ____ " (TVA inclus)";
echo $mesaj;`,
    answers: ['.='],
    explanation: 'Operatorul .= este prescurtarea pentru concatenare cu atribuire: adaugă textul din dreapta la sfârșitul șirului deja existent în variabilă.',
  },
  {
    type: 'fill',
    question: 'Completează operatorul care păstrează valoarea din $_GET["nume"] dacă aceasta există, sau folosește "vizitator" dacă lipsește ori este null.',
    code: `<?php
$nume = $_GET["nume"] ____ "vizitator";
echo $nume;`,
    answers: ['??'],
    explanation: 'Operatorul de coalescență nulă ?? întoarce operandul din stânga dacă acesta există și nu este null; altfel întoarce operandul din dreapta.',
  },
];
