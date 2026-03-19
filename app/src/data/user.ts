import type { User } from '../types'

export const currentUser: User = {
  id: 'user',
  name: 'Jonas C.',
  initials: 'JC',
  age: 27,
  level: 4,
  levelName: 'Engagierter',
  ehrenpunkte: 480,
  rankingpunkte: 1120,
  nextLevelPoints: 600,
  skills: ['Teamarbeit', 'Deutsch', 'Englisch', 'Erste Hilfe', 'Fußball'],
  experience: [
    'Tafel München (2× geholfen)',
    'Isar Cleanup 2025',
    'Hausaufgabenhilfe (3 Monate)',
  ],
  certificates: ['Erste-Hilfe-Kurs (2024)', 'Führungszeugnis vorhanden'],
}
