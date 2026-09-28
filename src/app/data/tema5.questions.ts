import { Question } from '../models/question';

export const TEMA5_QUESTIONS: Question[] = [
  // ---------- THEORY (8) ----------
  {
    type: 'theory',
    question: 'Câte tipuri de bucle (instrucțiuni repetitive) are PHP?',
    options: [
      'Patru: while, do...while, for și foreach',
      'Trei: while, for și foreach',
      'Cinci, incluzând și repeat',
      'Două: while și for',
    ],
    correct: 0,
    explanation: 'PHP are patru bucle: while, do...while, for și foreach. foreach nu există în toate limbajele, dar în PHP este cea mai folosită.',
  },
  {
    type: 'theory',
    question: 'Care este diferența esențială dintre while și do...while?',
    options: [
      'while rulează corpul cel puțin o dată; do...while verifică înainte',
      'do...while nu poate folosi un contor',
      'while verifică condiția înainte de corp; do...while o verifică după corp, deci corpul rulează cel puțin o dată',
      'Nu există nicio diferență, sunt sinonime',
    ],
    correct: 2,
    explanation: 'La while, dacă e falsă condiția de la început, corpul nu rulează deloc. La do...while, corpul rulează întâi și abia apoi se verifică condiția.',
  },
  {
    type: 'theory',
    question: 'Cele trei părți din antetul unei bucle for — inițializare, condiție, pas — sunt despărțite prin ce semn?',
    options: [':', ';', ',', '=>'],
    correct: 1,
    explanation: 'Antetul buclei for arată așa: for (inițializare; condiție; pas) { ... }, cele trei părți fiind despărțite prin punct și virgulă.',
  },
  {
    type: 'theory',
    question: 'Care este scopul sintaxei alternative a buclelor (de exemplu while (...): ... endwhile;)?',
    options: [
      'Face codul mai lizibil atunci când este intercalat cu HTML',
      'Face bucla să ruleze mai rapid',
      'Este obligatorie pentru foreach pe tablouri asociative',
      'Permite ieșirea din bucle imbricate cu un singur break',
    ],
    correct: 0,
    explanation: 'Sintaxa alternativă (while:...endwhile;, foreach:...endforeach;) a fost gândită special pentru a intercala HTML în interiorul buclei, ca la if:...endif;.',
  },
  {
    type: 'theory',
    question: 'Ce se întâmplă dacă aplici foreach pe o variabilă care nu este tablou sau obiect (de exemplu un număr)?',
    options: [
      'Bucla se execută o singură dată, cu variabila ca valoare',
      'Apare avertismentul: Warning: foreach() argument must be of type array|object',
      'PHP convertește automat variabila într-un tablou cu un singur element',
      'Scriptul se oprește cu o eroare fatală imediat, fără niciun mesaj',
    ],
    correct: 1,
    explanation: 'foreach merge numai pe tablouri și obiecte; pe orice altceva (număr, șir) PHP dă acest avertisment și bucla nu se execută.',
  },
  {
    type: 'theory',
    question: 'La foreach ($tablou as $valoare) { $valoare = $valoare + 1; }, ce se întâmplă cu $tablou după buclă?',
    options: [
      'Doar ultimul element este incrementat',
      'Se generează o eroare de tip type mismatch',
      'Tabloul original rămâne neschimbat, pentru că $valoare este o copie a elementului',
      'Toate elementele au fost incrementate cu 1',
    ],
    correct: 2,
    explanation: '$valoare este o copie a elementului curent. Modificarea ei în corpul buclei nu afectează tabloul original.',
  },
  {
    type: 'theory',
    question: 'Într-o buclă for imbricată în altă buclă for, ce face instrucțiunea break 2;?',
    options: [
      'Sare peste pasul curent din ambele bucle',
      'Iese doar din bucla interioară, ca un break simplu',
      'Este echivalent cu continue 2;',
      'Iese din ambele bucle (cea interioară și cea exterioară)',
    ],
    correct: 3,
    explanation: 'Cifra de după break spune din câte niveluri de bucle se iese deodată. break este același lucru cu break 1.',
  },
  {
    type: 'theory',
    question: 'Vrei să parcurgi un tablou asociativ (chei text, nu 0,1,2,...) și să afișezi fiecare cheie cu valoarea ei. Care buclă este cea mai potrivită?',
    options: [
      'while, cu un contor incrementat manual',
      'for, cu count($tablou) în condiție',
      'do...while, pentru că garantează cel puțin o execuție',
      'foreach ($tablou as $cheie => $valoare)',
    ],
    correct: 3,
    explanation: 'foreach parcurge automat toate elementele, indiferent de tipul cheilor; for cu count() se strică la tablourile asociative, care nu au indici 0,1,2,...',
  },

  // ---------- ANALYSIS (6) ----------
  {
    type: 'analysis',
    question: 'Ce valoare va avea $i imediat după ce bucla while de mai jos se termină?',
    code: `<?php
$i = 1;
while ($i <= 4) {
    echo "Pas $i\\n";
    $i++;
}
echo "Final: i = $i\\n";`,
    options: ['4', '5', '6', '3'],
    correct: 1,
    explanation: 'Condiția $i <= 4 devine falsă când $i ajunge la 5, dar $i++ deja s-a executat înainte de a se reverifica condiția, deci $i rămâne 5.',
  },
  {
    type: 'analysis',
    question: 'Ce afișează codul de mai jos?',
    code: `<?php
$i = 10;
do {
    echo "do...while: $i\\n";
    $i++;
} while ($i < 5);
echo "--- gata ---\\n";`,
    options: [
      '--- gata ---',
      'do...while: 10\n--- gata ---',
      'do...while: 10\ndo...while: 11\n--- gata ---',
      'Eroare de parsare: condiția while este falsă',
    ],
    correct: 1,
    explanation: 'Corpul lui do...while se execută cel puțin o dată chiar dacă condiția e falsă de la început; abia după corp se verifică 11 < 5, care e falsă, și bucla se oprește.',
  },
  {
    type: 'analysis',
    question: 'Ce valoare are $i imediat după ce bucla for de mai jos se termină?',
    code: `<?php
for ($i = 1; $i <= 5; $i++) {
    echo "i = $i\\n";
}
echo "Dupa bucla: i = $i\\n";`,
    options: ['6', '5', '4', 'Eroare: $i nu mai există în afara buclei'],
    correct: 0,
    explanation: 'Bucla se oprește când $i devine 6 (condiția $i <= 5 devine falsă). Variabila $i rămâne definită și după buclă, cu ultima valoare, 6.',
  },
  {
    type: 'analysis',
    question: 'Ce afișează (ca HTML) codul de mai jos?',
    code: `<?php
$produse = [
    ["nume" => "Tastatura", "pret" => 320],
    ["nume" => "Mouse", "pret" => 150],
];
echo "<table>";
foreach ($produse as $p) {
    echo "<tr><td>" . $p["nume"] . "</td><td>" . $p["pret"] . " lei</td></tr>";
}
echo "</table>";`,
    options: [
      '<table><td>Tastatura</td><td>320 lei</td><td>Mouse</td><td>150 lei</td></table>',
      'Warning: Undefined array key "nume"',
      '<table><tr><td>Tastatura</td><td>320 lei</td></tr><tr><td>Mouse</td><td>150 lei</td></tr></table>',
      '<table><tr><td>Tastatura</td><td>Mouse</td></tr><tr><td>320 lei</td><td>150 lei</td></tr></table>',
    ],
    correct: 2,
    explanation: 'foreach parcurge fiecare produs ($p) și generează câte un <tr> cu numele și prețul lui; rezultatul e text HTML, trimis apoi browserului.',
  },
  {
    type: 'analysis',
    question: 'Ce afișează codul de mai jos?',
    code: `<?php
for ($i = 1; $i <= 8; $i++) {
    if ($i == 5) {
        break;
    }
    echo $i . " ";
}`,
    options: ['1 2 3 4 5 6 7 8 ', '1 2 3 4 6 7 8 ', '1 2 3 4 ', '5 6 7 8 '],
    correct: 2,
    explanation: 'break oprește definitiv bucla la $i == 5; valorile 5, 6, 7, 8 nu mai sunt parcurse deloc.',
  },
  {
    type: 'analysis',
    question: 'Ce afișează codul de mai jos?',
    code: `<?php
for ($i = 1; $i <= 8; $i++) {
    if ($i == 5) {
        continue;
    }
    echo $i . " ";
}`,
    options: ['1 2 3 4 ', '6 7 8 ', '1 2 3 4 5 6 7 8 ', '1 2 3 4 6 7 8 '],
    correct: 3,
    explanation: 'continue sare doar peste restul corpului pentru $i == 5; bucla merge mai departe cu 6, 7, 8 — de aceea 5 lipsește din mijloc.',
  },

  // ---------- FILL (6) ----------
  {
    type: 'fill',
    question: 'Completează cuvântul cheie care închide bucla foreach scrisă în sintaxa alternativă (utilă când intercalezi HTML).',
    code: `<?php
$produse = ["Tastatura", "Mouse", "Monitor"];
foreach ($produse as $p):
    echo "<li>$p</li>";
____;`,
    answers: ['endforeach'],
    explanation: 'Sintaxa alternativă foreach (...): ... se închide cu endforeach;, la fel cum if: se închide cu endif;.',
  },
  {
    type: 'fill',
    question: 'Completează semnul de punctuație obligatoriu care lipsește după while (...) la finalul acestui do...while.',
    code: `<?php
$i = 10;
do {
    echo "do...while: $i\\n";
    $i++;
} while ($i < 5)____
echo "--- do...while s-a terminat ---\\n";`,
    answers: [';'],
    explanation: 'Spre deosebire de while, la do...while trebuie pus ; imediat după paranteza condiției finale — fără el apare o eroare de sintaxă.',
  },
  {
    type: 'fill',
    question: 'Completează pasul (a treia parte din antetul buclei for) care incrementează $i cu 1 la fiecare parcurgere.',
    code: `<?php
for ($i = 1; $i <= 5; ____) {
    echo "i = $i\\n";
}`,
    answers: ['$i++', '++$i', '$i += 1', '$i = $i + 1'],
    explanation: 'Al treilea segment din antetul for se execută după fiecare parcurgere a corpului; de obicei este $i++.',
  },
  {
    type: 'fill',
    question: 'Completează cuvântul obligatoriu care leagă tabloul de variabila folosită pentru fiecare element, în bucla foreach.',
    code: `<?php
$orase = ["Chisinau", "Balti", "Cahul"];
foreach ($orase ____ $oras) {
    echo "Orasul: $oras\\n";
}`,
    answers: ['as'],
    explanation: 'Sintaxa este foreach ($tablou as $valoare) { ... }; cuvântul as este obligatoriu.',
  },
  {
    type: 'fill',
    question: 'Completează semnul care leagă cheia ($produs) de valoarea ei ($pret), în forma foreach cu cheie.',
    code: `<?php
$preturi = ["paine" => 12, "lapte" => 18];
foreach ($preturi as $produs ____ $pret) {
    echo "$produs costa $pret lei\\n";
}`,
    answers: ['=>'],
    explanation: 'Semnul => (se citește „către”) leagă o cheie de valoarea ei, atât la scrierea unui tablou asociativ, cât și la forma a doua a lui foreach.',
  },
  {
    type: 'fill',
    question: 'Completează numărul de nivele de bucle din care trebuie să iasă break, ca să oprească deodată AMBELE bucle for de mai jos.',
    code: `<?php
for ($i = 1; $i <= 3; $i++) {
    for ($j = 1; $j <= 3; $j++) {
        if ($i * $j == 4) {
            break ____;
        }
        echo "$i*$j ";
    }
}`,
    answers: ['2'],
    explanation: 'Cifra de după break spune din câte niveluri de bucle se iese; break 2; iese și din bucla interioară, și din cea exterioară.',
  },
];
