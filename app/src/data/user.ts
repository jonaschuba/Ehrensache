import type { User } from '../types'
import profileAnna from '../assets/profile-anna.jpg'

export const currentUser: User = {
  id: 'user',
  name: 'Anna Kollmer',
  initials: 'AK',
  avatar: profileAnna,
  age: 26,
  city: 'Berlin',
  ehrenpunkte: 840,
  rankingpunkte: 2450,
  skills: ['Coding', 'Design', 'Teamarbeit', 'Deutsch', 'Englisch', 'Erste Hilfe'],
  experience: [
    'Berliner Tafel (5× geholfen)',
    'Spree Cleanup 2025 & 2026',
    'Hausaufgabenhilfe (6 Monate)',
    'Senioren-PC-Hilfe (3 Monate)',
  ],
  certificates: ['Erste-Hilfe-Kurs (2024)', 'Führungszeugnis vorhanden', 'Jugendleiter-Card'],
}
