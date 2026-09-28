# QuizLab PHP

Teste pe laboratoare pentru cursul **Programarea server-side a site-urilor Web** (PHP) — Angular 22, fără backend propriu.

- Fiecare laborator are un set de întrebări (Lab 2: 100 de întrebări).
- Un test = **10 întrebări** alese aleatoriu: **4 teorie**, **3 analiză de cod**, **3 completare de cod** (elevul scrie ce lipsește în cod).
- Elevul își scrie **Nume** și **Prenume** înainte de test. Răspunsurile corecte apar abia la final.
- **Nota** (1–10) = numărul de răspunsuri corecte.
- La final: rezultatul se **trimite automat în Google Sheets**, iar elevul poate **descărca Excel** (.xlsx) cu nota și răspunsurile.
- Pagina **Rezultate**: toate testele date pe dispozitiv + export Excel.

## Pornire

```bash
npm install
npm start          # http://localhost:4200
```

## Salvarea rezultatelor în Google Sheets

Un site nu poate scrie direct într-un Google Sheet doar pe baza linkului (ar trebui să fie logat în contul tău).
De aceea folosim un mic script **Google Apps Script**, atașat tabelului: rulează gratuit în contul tău Google
și adaugă un rând nou pentru fiecare test terminat.

1. Creează un **Google Sheet** nou (ex: „Rezultate quiz PHP”).
2. În tabel: **Extensii → Apps Script**. Șterge codul existent, lipește tot conținutul fișierului
   [`google-apps-script/Code.gs`](google-apps-script/Code.gs) și apasă **Salvează**.
3. **Implementare → Implementare nouă** → rotița ⚙ → **Aplicație web**:
   - *Execută ca*: **Eu**
   - *Cine are acces*: **Oricine**
4. Apasă **Implementare**, acceptă permisiunile (Google arată „aplicație neverificată” → *Avansat* → *Accesează*),
   apoi copiază **URL-ul aplicației web** (se termină cu `/exec`).
5. Pune URL-ul în `src/app/config.ts`:
   ```ts
   export const SHEETS_WEBAPP_URL = 'https://script.google.com/macros/s/.../exec';
   export const SHEET_VIEW_URL = ''; // opțional: linkul tabelului, pentru butonul „Deschide tabelul”
   ```
6. Build din nou (`npm run build`).

În tabel apare foaia **Rezultate**, cu coloanele: Data, Laborator, Nume, Prenume, Încercarea, Corecte, Nota,
Durata, Răspunsuri, ID. Dacă elevul nu are internet în momentul trimiterii, rezultatul rămâne marcat și poate fi
retrimis din pagina Rezultate.

> Fără backend, întrebările și răspunsurile sunt în codul aplicației, iar oricine are URL-ul scriptului poate
> trimite un rând. Pentru un test de laborator e suficient; pentru o evaluare cu miză mare ar fi nevoie de server.

## Structura

```
src/app/
├── config.ts              URL Google Sheets + structura testului (4 / 3 / 3)
├── data/labs.ts           lista laboratoarelor
├── data/*.questions.ts    întrebările (lab2, tema2…tema5)
├── models/                Question (theory / analysis / fill), Lab, QuizSession, QuizResult
├── services/              QuizService, SheetsService, ExcelService, StorageService
└── pages/                 home, start (nume/prenume), quiz, result, results
google-apps-script/Code.gs scriptul pentru Google Sheets
```

## Adaugi un laborator nou

1. Creezi fișierele de întrebări în `src/app/data/` (câte întrebări vrei, dar minim 4 `theory`, 3 `analysis`, 3 `fill`).
2. Adaugi un obiect nou în `LABS` din `src/app/data/labs.ts`.

Tipurile de întrebări:

```ts
{ type: 'theory',   question: '...', options: ['a', 'b', 'c', 'd'], correct: 1, explanation: '...' }
{ type: 'analysis', question: 'Ce afișează?', code: `<?php ...`, options: [...], correct: 0, explanation: '...' }
{ type: 'fill',     question: 'Completează...', code: `echo "a" ____ "b";`, answers: ['.'], explanation: '...' }
```
La `fill`, `____` marchează locul gol, iar `answers` conține toate variantele acceptate
(nu contează spațiile, `;` de la final și literele mari/mici, cu excepția variabilelor `$...`).
