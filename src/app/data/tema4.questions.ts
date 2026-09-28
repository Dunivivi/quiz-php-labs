import { Question } from '../models/question';

export const TEMA4_QUESTIONS: Question[] = [
  // ───────── theory (8) ─────────
  {
    type: 'theory',
    question:
      'Care este forma corectă a cuvântului cheie ce leagă ramura else de un nou if, valabilă atât în sintaxa clasică, cât și în sintaxa alternativă (if: … endif;)?',
    options: ['else if', 'elseif', 'elsif', 'else-if'],
    correct: 1,
    explanation:
      'PHP acceptă și else if (două cuvinte), dar numai elseif (un singur cuvânt) funcționează și în sintaxa alternativă.',
  },
  {
    type: 'theory',
    question:
      'De ce se recomandă să pui întotdeauna acolade { } după if, chiar dacă blocul are o singură instrucțiune?',
    options: [
      'Pentru că indentarea nu înseamnă nimic pentru PHP, iar fără acolade doar prima instrucțiune aparține lui if',
      'Pentru că PHP oprește scriptul cu eroare dacă lipsesc acoladele',
      'Pentru că acoladele transformă blocul într-o funcție',
      'Pentru că fără acolade condiția nu mai este evaluată deloc',
    ],
    correct: 0,
    explanation:
      'Fără acolade, doar instrucțiunea imediat următoare aparține lui if; restul se execută necondiționat, indiferent de indentare.',
  },
  {
    type: 'theory',
    question: 'Ce verifică exact funcția isset($x)?',
    options: [
      'Dacă $x conține una dintre cele 7 valori considerate „false”',
      'Dacă $x este exact null',
      'Dacă $x există (a fost definită) și valoarea ei nu este null',
      'Dacă $x este un șir de caractere gol',
    ],
    correct: 2,
    explanation:
      'isset() întoarce true doar dacă variabila există și nu este null; nu se uită deloc la conținut.',
  },
  {
    type: 'theory',
    question: 'Ce înseamnă că empty($x) întoarce true?',
    options: [
      '$x este exact null',
      '$x are tipul boolean',
      '$x nu a fost niciodată declarată în script',
      '$x lipsește (nu există) sau conține una dintre valorile „goale”: 0, "", "0", null, false, []',
    ],
    correct: 3,
    explanation:
      'empty($x) este echivalent cu !isset($x) || !$x: este true și când variabila lipsește, și când conține o valoare considerată „goală”.',
  },
  {
    type: 'theory',
    question:
      'Ce se întâmplă dacă în match(), valoarea comparată nu se potrivește cu nicio ramură, iar match nu are default?',
    options: [
      'match întoarce null în tăcere',
      'Se execută ultima ramură scrisă',
      'PHP oprește scriptul cu eroarea fatală UnhandledMatchError',
      'match întoarce false',
    ],
    correct: 2,
    explanation:
      'Spre deosebire de switch, match cere acoperirea tuturor cazurilor; dacă niciuna nu se potrivește și lipsește default, PHP aruncă UnhandledMatchError.',
  },
  {
    type: 'theory',
    question: 'În ce situație este de preferat switch în locul lui match?',
    options: [
      'Când vrei comparație strictă (===) automat',
      'Când vrei să eviți cuvântul break',
      'Când rezultatul este o singură valoare pe care o atribui direct unei variabile',
      'Când fiecare caz trebuie să execute mai multe instrucțiuni, nu doar să producă o valoare',
    ],
    correct: 3,
    explanation:
      'match este o expresie potrivită când rezultatul e o singură valoare; când fiecare ramură are mai multe instrucțiuni, switch rămâne alegerea potrivită.',
  },
  {
    type: 'theory',
    question:
      'Conform regulii de alegere din curs, când este potrivit să folosești operatorul ternar (?:) sau ??, în loc de if?',
    options: [
      'Când rezultatul este o singură valoare pe care o atribui unei variabile',
      'Când pe fiecare ramură ai mai multe instrucțiuni de executat',
      'Niciodată; sunt interziși în cod modern',
      'Doar în interiorul buclelor',
    ],
    correct: 0,
    explanation:
      'Ternarul și ?? sunt scurtături pentru un if simplu care alege o singură valoare; pentru ramuri cu mai multe instrucțiuni se folosește if obișnuit.',
  },
  {
    type: 'theory',
    question: 'Când este recomandată sintaxa alternativă if (conditie): … endif;?',
    options: [
      'Este o sintaxă învechită (deprecated) și trebuie evitată',
      'Când codul PHP este intercalat cu bucăți mari de HTML',
      'Doar la switch, niciodată la if',
      'Când vrei cod PHP mai scurt în funcții matematice',
    ],
    correct: 1,
    explanation:
      'Sintaxa alternativă face codul lizibil când HTML-ul rămâne HTML curat între <?php if(...): ?> și <?php endif; ?>.',
  },

  // ───────── analysis (6) ─────────
  {
    type: 'analysis',
    question: 'Ce se afișează la rularea codului de mai jos?',
    code: `<?php
$nota = 6;
if ($nota >= 9) {
    echo "Excelent";
} elseif ($nota >= 7) {
    echo "Bine";
} elseif ($nota >= 5) {
    echo "Satisfacator";
} else {
    echo "Nesatisfacator";
}`,
    options: ['Excelent', 'Bine', 'Satisfacator', 'Nesatisfacator'],
    correct: 2,
    explanation:
      'Se execută prima condiție adevărată, de sus în jos: 6 >= 9 e fals, 6 >= 7 e fals, 6 >= 5 e adevărat, deci se afișează "Satisfacator".',
  },
  {
    type: 'analysis',
    question: 'Ce se afișează la rularea codului de mai jos?',
    code: `<?php
$stoc = 0;
if ($stoc > 0)
    echo "In stoc\\n";
    echo "Adauga in cos\\n";
echo "---\\n";`,
    options: [
      'In stoc, apoi Adauga in cos, apoi ---',
      'Adauga in cos, apoi ---',
      '---',
      'Eroare de parsare (Parse error)',
    ],
    correct: 1,
    explanation:
      'Fără acolade, doar echo "In stoc" aparține lui if. Al doilea echo și cel cu "---" se execută necondiționat, indiferent de valoarea $stoc.',
  },
  {
    type: 'analysis',
    question: 'Ce se afișează la rularea codului de mai jos?',
    code: `<?php
$rol = "editor";
switch ($rol) {
    case "admin":
        echo "Acces total\\n";
    case "editor":
        echo "Poate publica articole\\n";
    case "vizitator":
        echo "Doar citire\\n";
        break;
    default:
        echo "Rol necunoscut\\n";
}`,
    options: [
      'Doar "Poate publica articole"',
      'Acces total, apoi Poate publica articole, apoi Doar citire',
      'Poate publica articole, apoi Doar citire',
      'Rol necunoscut',
    ],
    correct: 2,
    explanation:
      'case "editor" se potrivește, dar nu are break; execuția „cade” în case "vizitator" și se oprește abia la break-ul de acolo.',
  },
  {
    type: 'analysis',
    question: 'Care ramură se execută în switch-ul de mai jos?',
    code: `<?php
$cod = "0";
switch ($cod) {
    case 0:
        echo "Numar\\n";
        break;
    case "0":
        echo "Text\\n";
        break;
}`,
    options: [
      'Numar',
      'Text',
      'Ambele ramuri (Numar și Text)',
      'Nicio ramură; apare o eroare',
    ],
    correct: 0,
    explanation:
      'switch compară cu ==, comparație slabă: "0" == 0 este true, deci se execută primul case potrivit, case 0, iar break oprește căutarea mai departe.',
  },
  {
    type: 'analysis',
    question: 'Ce se întâmplă la rularea codului de mai jos?',
    code: `<?php
$rol = "moderator";
$mesaj = match ($rol) {
    "admin" => "Acces total",
    "editor" => "Poate publica",
};
echo $mesaj;`,
    options: [
      'Se afișează "Acces total"',
      'Se afișează un șir gol',
      'Se afișează "moderator"',
      'Apare eroarea fatală Uncaught UnhandledMatchError',
    ],
    correct: 3,
    explanation:
      'Niciuna dintre ramuri nu se potrivește cu "moderator" și nu există default, deci match aruncă UnhandledMatchError și scriptul se oprește.',
  },
  {
    type: 'analysis',
    question: 'Ce valoare are $calificativ după ce rulează codul de mai jos?',
    code: `<?php
$nota = 7;
$calificativ = match (true) {
    $nota >= 9 => "Excelent",
    $nota >= 7 => "Bine",
    $nota >= 5 => "Satisfacator",
    default => "Nesatisfacator",
};`,
    options: ['Nesatisfacator', 'Satisfacator', 'Excelent', 'Bine'],
    correct: 3,
    explanation:
      'match (true) alege prima ramură a cărei condiție este adevărată: 7 >= 9 e fals, 7 >= 7 e adevărat, deci $calificativ devine "Bine".',
  },

  // ───────── fill (6) ─────────
  {
    type: 'fill',
    question:
      'Completează cuvântul cheie (un singur cuvânt, valabil și în sintaxa alternativă) care leagă cele două ramuri de mai jos.',
    code: `<?php
$nota = 8;
if ($nota >= 9) {
    echo "Excelent";
} ____ ($nota >= 7) {
    echo "Bine";
} else {
    echo "Nesatisfacator";
}`,
    answers: ['elseif'],
    explanation:
      'elseif, scris într-un singur cuvânt, este forma care merge și în sintaxa alternativă (if: … elseif: … endif;).',
  },
  {
    type: 'fill',
    question:
      'Completează instrucțiunea care oprește execuția switch-ului, astfel încât la $rol = "editor" să se afișeze DOAR "Poate publica articole".',
    code: `<?php
$rol = "editor";
switch ($rol) {
    case "admin":
        echo "Acces total";
        break;
    case "editor":
        echo "Poate publica articole";
        ____;
    case "vizitator":
        echo "Doar citire";
        break;
}`,
    answers: ['break'],
    explanation:
      'break; oprește switch-ul imediat; fără el, execuția ar continua în cascadă până la următorul break, afișând și "Doar citire".',
  },
  {
    type: 'fill',
    question:
      'Completează numele funcției care întoarce true doar dacă variabila există ȘI nu este null (fără să se uite la conținut).',
    code: `<?php
$nume = null;
if (____($nume)) {
    echo "Definit";
} else {
    echo "Nedefinit sau null";
}`,
    answers: ['isset'],
    explanation:
      'isset($nume) este false aici pentru că $nume este exact null; isset nu verifică deloc conținutul, doar existența și faptul că nu e null.',
  },
  {
    type: 'fill',
    question:
      'Completează cuvântul cheie (PHP 8) care introduce o expresie ce compară strict $rol cu fiecare valoare din stânga lui => și întoarce rezultatul ramurii potrivite.',
    code: `<?php
$rol = "editor";
$mesaj = ____ ($rol) {
    "admin" => "Acces total",
    "editor" => "Poate publica articole",
    default => "Doar citire",
};
echo $mesaj;`,
    answers: ['match'],
    explanation:
      'match ($rol) { ... } compară strict (===) valoarea cu fiecare cheie și întoarce valoarea ramurii potrivite, ca expresie.',
  },
  {
    type: 'fill',
    question:
      'Completează semnul care desparte condiția de valoarea „adevărat” în operatorul ternar de mai jos.',
    code: `<?php
$stoc = 5;
$mesaj = ($stoc > 0) ____ "Disponibil" : "Stoc epuizat";
echo $mesaj;`,
    answers: ['?'],
    explanation:
      'Sintaxa ternarului este conditie ? valoare_daca_adevarat : valoare_daca_fals.',
  },
  {
    type: 'fill',
    question:
      'Completează cuvântul cheie ce închide sintaxa alternativă a lui if, deschisă mai sus cu if (...):.',
    code: `<?php $stoc = 3; ?>
<?php if ($stoc > 0): ?>
<p>In stoc</p>
<?php else: ?>
<p>Stoc epuizat</p>
<?php ____; ?>`,
    answers: ['endif'],
    explanation:
      'În sintaxa alternativă, acolada de deschidere devine :, iar acolada de închidere devine endif;.',
  },
];
