import { Question } from '../models/question';

export const TEMA3_QUESTIONS: Question[] = [
  // ---------- THEORY (8) ----------
  {
    type: 'theory',
    question: 'Care este diferența principală dintre o expresie și o instrucțiune în PHP?',
    options: [
      'O instrucțiune produce întotdeauna un număr, iar o expresie produce întotdeauna un text.',
      'O expresie produce o valoare; o instrucțiune este o comandă completă, încheiată cu ;, care spune programului să facă ceva.',
      'Nu există nicio diferență, cei doi termeni înseamnă exact același lucru în PHP.',
      'O expresie trebuie să înceapă cu echo, iar o instrucțiune nu poate conține operatori.',
    ],
    correct: 1,
    explanation:
      'Expresia (ex: $a + $b) este orice construcție care, evaluată, produce o valoare; instrucțiunea este expresia folosită efectiv, încheiată cu punct și virgulă.',
  },
  {
    type: 'theory',
    question: 'De ce poate operatorul / (împărțire) să producă un rezultat de tip float în PHP?',
    options: [
      'Pentru că operatorul / rotunjește întotdeauna la cel mai apropiat întreg.',
      'Pentru că împărțirea este permisă doar între variabile de tip float.',
      'Pentru că PHP transformă automat toate numerele întregi în text înainte de a le împărți.',
      'Pentru că PHP nu are împărțire întreagă; dacă rezultatul nu este exact, / întoarce automat un float.',
    ],
    correct: 3,
    explanation: 'În PHP, 10 / 4 dă float(2.5); pentru câtul întreg se folosește intdiv(10, 4), care dă int(2).',
  },
  {
    type: 'theory',
    question:
      'Ce semn are rezultatul operatorului % (modulo) în PHP, atunci când deîmpărțitul și împărțitorul au semne diferite?',
    options: [
      'Semnul rezultatului este întotdeauna pozitiv.',
      'Semnul rezultatului este dat de deîmpărțit (primul operand).',
      'Semnul rezultatului este dat de împărțitor (al doilea operand).',
      'PHP generează o eroare când semnele diferă.',
    ],
    correct: 1,
    explanation:
      'Regula din PHP: restul are semnul deîmpărțitului, nu al împărțitorului. De exemplu, -10 % 3 dă -1, iar 10 % -3 dă 1.',
  },
  {
    type: 'theory',
    question: 'De ce se recomandă folosirea operatorului === în locul lui == pentru comparații în PHP?',
    options: [
      'Pentru că === este mai rapid la executare decât ==.',
      'Pentru că == funcționează doar cu numere, iar === funcționează și cu texte.',
      'Pentru că === compară atât valoarea, cât și tipul, evitând conversiile automate surprinzătoare.',
      'Pentru că === este singurul operator care poate compara două variabile de tipuri diferite.',
    ],
    correct: 2,
    explanation:
      '== face conversii automate înainte de a compara (ex: "10" == "1e1" e true), în timp ce === cere valoare și tip identice.',
  },
  {
    type: 'theory',
    question: 'Care afirmație despre operatorii logici && și || este corectă în PHP?',
    options: [
      '&& este adevărat doar când ambii operanzi sunt adevărați; || este fals doar când ambii operanzi sunt falși.',
      '&& este adevărat dacă cel puțin un operand este adevărat, la fel ca ||.',
      '|| este adevărat doar când ambii operanzi sunt adevărați.',
      '&& și || produc întotdeauna un rezultat de tip int, nu bool.',
    ],
    correct: 0,
    explanation: 'Din tabelul de adevăr: && cere ca ambii operanzi să fie true, iar || este false doar când ambii sunt false.',
  },
  {
    type: 'theory',
    question: 'Ce înseamnă „evaluare scurtcircuitată” pentru operatorii && și ||?',
    options: [
      'PHP evaluează întotdeauna ambele părți ale expresiei, indiferent de rezultat.',
      'PHP alege aleatoriu care parte a expresiei o evaluează prima.',
      'PHP generează o eroare dacă partea dreaptă a expresiei nu este evaluată.',
      'PHP oprește evaluarea imediat ce rezultatul final este sigur, fără să mai evalueze partea dreaptă.',
    ],
    correct: 3,
    explanation:
      'La && dacă stânga e false, sau la || dacă stânga e true, rezultatul e deja sigur, iar partea dreaptă nici nu se mai execută.',
  },
  {
    type: 'theory',
    question: 'Care este sintaxa generală a operatorului ternar în PHP?',
    options: [
      'condiție : valoare_daca_adevarat ? valoare_daca_fals',
      'condiție ? valoare_daca_adevarat : valoare_daca_fals',
      'if (condiție) valoare_daca_adevarat else valoare_daca_fals;',
      'condiție && valoare_daca_adevarat || valoare_daca_fals',
    ],
    correct: 1,
    explanation: 'Operatorul ternar este o expresie de forma condiție ? valoare_daca_adevarat : valoare_daca_fals.',
  },
  {
    type: 'theory',
    question: 'Ce face operatorul de coalescență nulă ?? în expresia $x = $a ?? $b;?',
    options: [
      'Atribuie lui $x întotdeauna valoarea lui $b, indiferent de $a.',
      'Verifică dacă $a este identic (===) cu $b și atribuie lui $x rezultatul bool.',
      'Atribuie lui $x valoarea lui $a dacă aceasta există și nu este null; altfel atribuie valoarea lui $b.',
      'Este echivalent cu operatorul de concatenare, lipind $a și $b.',
    ],
    correct: 2,
    explanation: '?? întoarce primul operand dacă acesta este definit și diferit de null, altfel întoarce al doilea operand.',
  },

  // ---------- ANALYSIS (6) ----------
  {
    type: 'analysis',
    question: 'Ce afișează codul de mai jos?',
    code: `<?php
$a = 5;
$b = $a++ * 2;
echo $a . " " . $b;`,
    options: ['6 10', '5 10', '6 12', '5 12'],
    correct: 0,
    explanation:
      '$a++ este post-incrementare: în expresie se folosește valoarea veche (5), abia apoi $a devine 6. Deci $b = 5*2 = 10, iar $a = 6.',
  },
  {
    type: 'analysis',
    question: 'Ce valoare are $p la final?',
    code: `<?php
$p = 10;
$p += 5;
$p *= 2;
echo $p;`,
    options: ['20', '30', '25', '15'],
    correct: 1,
    explanation: '$p += 5 face $p = 15; apoi $p *= 2 face $p = 15 * 2 = 30.',
  },
  {
    type: 'analysis',
    question: 'Ce afișează codul de mai jos?',
    code: `<?php
var_dump("10" == "1e1");`,
    options: ['bool(true)', 'bool(false)', 'int(1)', 'Eroare'],
    correct: 0,
    explanation:
      '"10" și "1e1" sunt ambele șiruri numerice; == le compară ca numere (10 == 10), deci rezultatul este true.',
  },
  {
    type: 'analysis',
    question: 'Ce afișează codul de mai jos?',
    code: `<?php
function verifica($n) {
    echo "apel ";
    return $n > 0;
}
if (true || verifica(5)) {
    echo "gata";
}`,
    options: ['gata', 'apel gata', 'apel', 'Eroare'],
    correct: 0,
    explanation:
      'La ||, dacă partea stângă este deja true, rezultatul e sigur adevărat și partea dreaptă (verifica(5)) nu se mai evaluează deloc.',
  },
  {
    type: 'analysis',
    question: 'Ce afișează codul de mai jos?',
    code: `<?php
echo 2 ** 3 ** 2;`,
    options: ['512', '64', '18', '8'],
    correct: 0,
    explanation:
      '** se asociază de la dreapta la stânga: 2 ** 3 ** 2 înseamnă 2 ** (3 ** 2) = 2 ** 9 = 512, nu (2 ** 3) ** 2.',
  },
  {
    type: 'analysis',
    question: 'Ce afișează codul de mai jos?',
    code: `<?php
$nota = 4;
$rezultat = $nota >= 5 ? "promovat" : "picat";
echo $rezultat;`,
    options: ['promovat', 'picat', 'true', 'Eroare'],
    correct: 1,
    explanation: 'Condiția $nota >= 5 este false (4 < 5), deci operatorul ternar produce valoarea de după : , adică "picat".',
  },

  // ---------- FILL (6) ----------
  {
    type: 'fill',
    question: 'Completează operatorul care adaugă textul din dreapta la sfârșitul variabilei $mesaj.',
    code: `<?php
$mesaj = "Salut";
$mesaj ____ ", lume!";
echo $mesaj;`,
    answers: ['.='],
    explanation: '.= este forma compusă de concatenare: $mesaj .= "..."; este echivalent cu $mesaj = $mesaj . "...";',
  },
  {
    type: 'fill',
    question:
      'Completează numele funcției care întoarce câtul întreg al împărțirii lui 17 la 5, fără zecimale.',
    code: `<?php
$catul = ____(17, 5);
echo $catul;`,
    answers: ['intdiv'],
    explanation: 'intdiv(17, 5) întoarce câtul întreg, 3, spre deosebire de 17 / 5, care ar da float(3.4).',
  },
  {
    type: 'fill',
    question: 'Completează operatorul care calculează restul împărțirii lui 17 la 5.',
    code: `<?php
echo 17 ____ 5;`,
    answers: ['%'],
    explanation: '17 % 5 dă restul împărțirii, adică 2 (17 = 5 * 3 + 2).',
  },
  {
    type: 'fill',
    question: 'Completează semnul care lipsește din operatorul ternar de mai jos.',
    code: `<?php
$varsta = 20;
$tip = ($varsta >= 18) ____ "adult" : "minor";
echo $tip;`,
    answers: ['?'],
    explanation: 'Operatorul ternar are forma condiție ? valoare_daca_adevarat : valoare_daca_fals; aici lipsea semnul ?.',
  },
  {
    type: 'fill',
    question:
      'Completează operatorul care întoarce a doua valoare atunci când prima este null (aici $nume).',
    code: `<?php
$nume = null;
$afisat = $nume ____ "Anonim";
echo $afisat;`,
    answers: ['??'],
    explanation: '?? este operatorul de coalescență nulă: întoarce operandul din stânga dacă nu este null, altfel îl întoarce pe cel din dreapta.',
  },
  {
    type: 'fill',
    question:
      'Completează operatorul care scade 12 din $stoc și salvează rezultatul înapoi în $stoc (echivalent cu $stoc = $stoc - 12;).',
    code: `<?php
$stoc = 50;
$stoc ____ 12;
echo $stoc;`,
    answers: ['-='],
    explanation: '-= este forma compusă de scădere: $stoc -= 12; înseamnă $stoc = $stoc - 12;, deci rezultatul este 38.',
  },
];
