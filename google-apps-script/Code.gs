/**
 * QuizLab PHP — salvarea rezultatelor în Google Sheets.
 *
 * Instalare (o singură dată, din contul Google al profesorului):
 *  1. Creează un Google Sheet nou (ex: „Rezultate quiz PHP”).
 *  2. Extensii → Apps Script. Șterge ce e acolo și lipește tot acest fișier. Salvează.
 *  3. Implementare (Deploy) → Implementare nouă → tip „Aplicație web”:
 *       - Execută ca: Eu (contul tău)
 *       - Cine are acces: Oricine
 *     Apasă Implementare, acordă permisiunile, copiază „URL-ul aplicației web”.
 *  4. Pune URL-ul în src/app/config.ts → SHEETS_WEBAPP_URL, apoi fă build din nou.
 *
 * La fiecare test terminat, aplicația trimite un rând nou în foaia „Rezultate”.
 */

const SHEET_NAME = 'Rezultate';

const COLUMNS = [
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
    const sheet = getSheet_();

    // nu scriem de două ori același test (de ex. la „Încearcă din nou”)
    const ids = sheet.getLastRow() > 1
      ? sheet.getRange(2, COLUMNS.length, sheet.getLastRow() - 1, 1).getValues().flat()
      : [];
    if (!ids.includes(data.id)) {
      sheet.appendRow(COLUMNS.map(([key]) => sanitize_(data[key])));
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
  return json_({ ok: true, message: 'QuizLab PHP: scriptul funcționează.' });
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS.map(([, title]) => title));
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold').setBackground('#eceefa');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/** Împiedică formulele „injectate” (un nume care începe cu = sau +). */
function sanitize_(value) {
  if (value === undefined || value === null) return '';
  if (typeof value === 'string' && /^[=+\-@]/.test(value)) return "'" + value;
  return value;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
