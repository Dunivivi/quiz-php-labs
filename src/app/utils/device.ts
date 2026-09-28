/**
 * Informații despre dispozitivul de pe care s-a dat testul (pentru evidența profesorului).
 * Elevul este informat despre asta pe pagina de start.
 */
export interface DeviceInfo {
  /** ID aleatoriu, păstrat în browser: arată dacă același dispozitiv e folosit de mai mulți elevi. */
  id: string;
  type: 'Mobil' | 'Tabletă' | 'Desktop';
  os: string;
  browser: string;
  screen: string;
  language: string;
  timezone: string;
  /** Adresa IP publică (de la api.ipify.org); goală dacă serviciul nu răspunde. */
  ip: string;
}

const DEVICE_ID_KEY = 'quizlab.deviceId';
const IP_SERVICE = 'https://api.ipify.org?format=json';

export async function collectDevice(): Promise<DeviceInfo> {
  const ua = navigator.userAgent;
  return {
    id: deviceId(),
    type: deviceType(ua),
    os: osName(ua),
    browser: browserName(ua),
    screen: `${screen.width}×${screen.height}`,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    ip: await publicIp(),
  };
}

function deviceId(): string {
  try {
    let id = localStorage.getItem(DEVICE_ID_KEY);
    if (!id) {
      id = crypto.randomUUID().slice(0, 8);
      localStorage.setItem(DEVICE_ID_KEY, id);
    }
    return id;
  } catch {
    return 'necunoscut';
  }
}

async function publicIp(): Promise<string> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(IP_SERVICE, { signal: controller.signal });
    clearTimeout(timer);
    return (await res.json()).ip ?? '';
  } catch {
    return '';
  }
}

function deviceType(ua: string): DeviceInfo['type'] {
  // iPad-urile noi se prezintă ca Mac, dar au ecran tactil
  if (/iPad|Tablet/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) {
    return 'Tabletă';
  }
  if (/Android/i.test(ua) && !/Mobile/i.test(ua)) return 'Tabletă';
  if (/Mobi|iPhone|Android/i.test(ua)) return 'Mobil';
  return 'Desktop';
}

function osName(ua: string): string {
  const android = ua.match(/Android ([\d.]+)/);
  if (android) return `Android ${android[1]}`;
  const ios = ua.match(/OS (\d+)[_.](\d+)/);
  if (/iPhone|iPad|iPod/.test(ua) && ios) return `iOS ${ios[1]}.${ios[2]}`;
  if (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1) return 'iPadOS';
  if (/Windows NT 10/.test(ua)) return 'Windows 10/11';
  if (/Windows/.test(ua)) return 'Windows';
  if (/Mac OS X/.test(ua)) return 'macOS';
  if (/CrOS/.test(ua)) return 'ChromeOS';
  if (/Linux/.test(ua)) return 'Linux';
  return 'Necunoscut';
}

function browserName(ua: string): string {
  const rules: [RegExp, string][] = [
    [/Edg\/(\d+)/, 'Edge'],
    [/OPR\/(\d+)/, 'Opera'],
    [/SamsungBrowser\/(\d+)/, 'Samsung Internet'],
    [/Firefox\/(\d+)/, 'Firefox'],
    [/CriOS\/(\d+)/, 'Chrome'],
    [/Chrome\/(\d+)/, 'Chrome'],
    [/Version\/(\d+).*Safari/, 'Safari'],
  ];
  for (const [re, name] of rules) {
    const m = ua.match(re);
    if (m) return `${name} ${m[1]}`;
  }
  return 'Necunoscut';
}

/** Coloanele despre dispozitiv, în formatul trimis spre Google Sheets. */
export function deviceColumns(d: DeviceInfo): Record<string, string> {
  return {
    Dispozitiv: d.type,
    Sistem: d.os,
    Browser: d.browser,
    Ecran: d.screen,
    Limba: d.language,
    'Fus orar': d.timezone,
    IP: d.ip,
    'ID dispozitiv': d.id,
  };
}
