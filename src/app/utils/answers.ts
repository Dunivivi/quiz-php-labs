/**
 * Compară răspunsul scris de elev cu răspunsurile acceptate.
 * Ignoră: spațiile de la capete, spațiile multiple, „;” de la final și literele mari/mici
 * (cuvintele cheie și funcțiile PHP nu țin cont de majuscule).
 * Variabilele PHP țin cont de majuscule, așa că la ele comparăm exact.
 */
export function isFillCorrect(typed: string, accepted: string[]): boolean {
  // „;” de la final se ignoră — dar nu când răspunsul este chiar „;”
  const stripSemicolon = (s: string) => s.replace(/;+$/, '') || s;
  const norm = (s: string) =>
    stripSemicolon(s.trim())
      .replace(/\s+/g, ' ')
      .replace(/\s*([()[\]{},.=<>!+\-*/%?:&|'"])\s*/g, '$1');
  const t = norm(typed);
  if (!t) return false;
  return accepted.some((a) => {
    const n = norm(a);
    return n.includes('$') ? n === t : n.toLowerCase() === t.toLowerCase();
  });
}
