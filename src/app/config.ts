/**
 * CONFIGURARE
 *
 * 1. SHEETS_WEBAPP_URL — adresa aplicației Google Apps Script care scrie rezultatele
 *    în Google Sheets (vezi README.md → „Salvarea rezultatelor în Google Sheets”).
 *    Lasă gol ('') ca să dezactivezi trimiterea: rezultatele rămân doar local + Excel.
 *
 * 2. SHEET_VIEW_URL — linkul spre tabelul Google Sheets (pentru butonul „Deschide tabelul”).
 *    Opțional; lasă gol dacă nu vrei ca elevii să vadă linkul.
 */
export const SHEETS_WEBAPP_URL =
  'https://script.google.com/macros/s/AKfycbwMoPem4ENEBK_kmZOhxBstO8sc5KL6EQYmSh0SQwhi7T1Pe0faFFjtvSBVr5yuMo4ZNQ/exec';
export const SHEET_VIEW_URL = '';

/** Structura unui test: câte întrebări din fiecare tip. */
export const TEST_STRUCTURE = {
  theory: 4,
  analysis: 3,
  fill: 3,
} as const;
