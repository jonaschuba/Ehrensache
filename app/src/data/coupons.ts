import type { Coupon } from '../types'

export const coupons: Coupon[] = [
  {
    id: 'cp1',
    name: '10% Rabatt',
    partner: 'Bio Company München',
    pointsRequired: 500,
    description: '10% auf deinen nächsten Einkauf im Bio Company Markt.',
    category: 'Einkaufen',
    color: '#16A34A',
  },
  {
    id: 'cp2',
    name: 'Freier Eintritt',
    partner: 'Deutsches Museum',
    pointsRequired: 600,
    description: 'Ein kostenloser Eintritt ins Deutsche Museum für dich und eine Begleitperson.',
    category: 'Kultur',
    color: '#2563EB',
  },
  {
    id: 'cp3',
    name: 'Monatsticket MVV',
    partner: 'Münchner Verkehrsgesellschaft',
    pointsRequired: 1200,
    description: 'Ein kostenloses Monatsticket für das gesamte MVV-Netz.',
    category: 'Mobilität',
    color: '#7C3AED',
  },
  {
    id: 'cp4',
    name: 'Kinoticket',
    partner: 'Mathäser Filmpalast',
    pointsRequired: 450,
    description: 'Zwei Kinotickets für eine Vorstellung deiner Wahl.',
    category: 'Freizeit',
    color: '#DC2626',
  },
  {
    id: 'cp5',
    name: 'Yoga-Monat',
    partner: 'Yoga Vidya München',
    pointsRequired: 700,
    description: 'Ein ganzer Monat Yoga-Kurse nach Wahl.',
    category: 'Sport & Gesundheit',
    color: '#D97706',
  },
]
