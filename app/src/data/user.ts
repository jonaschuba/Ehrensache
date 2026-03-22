import type { User } from '../types'

export const currentUser: User = {
  id: 'user',
  name: 'Lukas Wagner',
  initials: 'LW',
  age: 27,
  ehrenpunkte: 840,
  rankingpunkte: 2450,
  skills: ['Coding', 'Design', 'Teamarbeit', 'Deutsch', 'Englisch', 'Erste Hilfe'],
  experience: [
    'Tafel München (5× geholfen)',
    'Isar Cleanup 2025 & 2026',
    'Hausaufgabenhilfe (6 Monate)',
    'Senioren-PC-Hilfe (3 Monate)',
  ],
  certificates: ['Erste-Hilfe-Kurs (2024)', 'Führungszeugnis vorhanden', 'Jugendleiter-Card'],
}
