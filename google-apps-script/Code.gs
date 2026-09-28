/**
 * QuizLab — salvarea rezultatelor în Google Sheets (pentru toate aplicațiile QuizLab).
 *
 * Instalare (o singură dată, din contul Google al profesorului):
 *  1. Creează un Google Sheet nou (ex: „Rezultate quiz”).
 *  2. Extensii → Apps Script. Șterge ce e acolo și lipește tot acest fișier. Salvează.
 *  3. Implementare → Implementare nouă → tip „Aplicație web”:
 *       - Execută ca: Eu (contul tău)
 *       - Cine are acces: Oricine
 *     Apasă Implementare, acordă permisiunile, copiază „URL-ul aplicației web”.
 *  4. Pune URL-ul în src/app/config.ts → SHEETS_WEBAPP_URL, apoi fă build din nou.
 *
 * La actualizarea codului: Implementare → Gestionați implementările → ✏️ → Versiune nouă
 * (URL-ul rămâne același).
 *
 * Aplicația trimite { sheet: "Nume tab", id: "...", row: { "Coloană": valoare, ... } }.
 * Tab-ul se creează automat, iar coloanele noi se adaugă singure la dreapta.
 */

const DEFAULT_SHEET = 'Rezultate';
const ID_HEADER = 'ID';

/** Formatul vechi (prima versiune a quiz-ului PHP): cheie → titlul coloanei. */
const LEGACY_COLUMNS = [
  ['data', 'Data'],
  ['laborator', 'Laborator'],
  ['nume', 'Nume'],
  ['prenume', 'Prenume'],
  ['incercarea', 'Încercarea'],
  ['corecte', 'Corecte'],
  ['nota', 'Nota'],
  ['durata_sec', 'Durata (sec)'],
  ['detalii', 'Răspunsuri'],
  ['id', 'ID'],
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000); // mai mulți elevi pot trimite în aceeași secundă

  try {
    const data = JSON.parse(e.postData.contents);
    const row = data.row || legacyRow_(data);
    const id = String(data.id || row[ID_HEADER] || '');
    row[ID_HEADER] = id;

    const sheet = getSheet_(data.sheet || DEFAULT_SHEET);
    const headers = ensureHeaders_(sheet, Object.keys(row));

    // nu scriem de două ori același test (de ex. la „Încearcă din nou”)
    if (!id || !idExists_(sheet, headers, id)) {
      sheet.appendRow(headers.map((h) => sanitize_(row[h])));
    }

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/** Deschiderea URL-ului în browser arată doar că scriptul funcționează. */
function doGet() {
  return json_({ ok: true, message: 'QuizLab: scriptul funcționează.', version: 2 });
}

function getSheet_(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

/** Pune capul de tabel; adaugă la dreapta coloanele care lipsesc. Întoarce lista coloanelor. */
function ensureHeaders_(sheet, keys) {
  const lastCol = sheet.getLastColumn();
  const headers = lastCol ? sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(String) : [];
  const missing = keys.filter((k) => !headers.includes(k));

  if (missing.length) {
    sheet.getRange(1, headers.length + 1, 1, missing.length).setValues([missing]);
    headers.push(...missing);
    sheet
      .getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#eceefa');
    sheet.setFrozenRows(1);
  }
  return headers;
}

function idExists_(sheet, headers, id) {
  const col = headers.indexOf(ID_HEADER) + 1;
  if (!col || sheet.getLastRow() < 2) return false;
  return sheet
    .getRange(2, col, sheet.getLastRow() - 1, 1)
    .getValues()
    .some((r) => String(r[0]) === id);
}

function legacyRow_(data) {
  const row = {};
  LEGACY_COLUMNS.forEach(([key, title]) => (row[title] = data[key]));
  return row;
}

/** Împiedică formulele „injectate” (un nume care începe cu = sau +). */
function sanitize_(value) {
  if (value === undefined || value === null) return '';
  if (typeof value === 'string' && /^[=+\-@]/.test(value)) return "'" + value;
  return value;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
