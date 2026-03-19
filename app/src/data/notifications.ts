import type { AppNotification } from '../types'

export const notifications: AppNotification[] = [
  {
    id: 'n1',
    type: 'last_chance',
    title: 'Letzte Chance: Isar Cleanup',
    body: 'Nur noch 8 Plätze frei! Melde dich jetzt für den Isar Cleanup am 21. März an.',
    timestamp: 'vor 1 Std.',
    read: false,
  },
  {
    id: 'n2',
    type: 'friend_request',
    title: 'Neue Freundschaftsanfrage',
    body: 'Felix R. möchte dein Freund auf Ehrensache werden.',
    timestamp: 'vor 2 Std.',
    read: false,
  },
  {
    id: 'n3',
    type: 'new_event',
    title: 'Neue Ehrensache von Caritas',
    body: 'Caritas München hat eine neue Ehrensache veröffentlicht: "Mahlzeit für Obdachlose – Helfer gesucht"',
    timestamp: 'vor 5 Std.',
    read: false,
  },
  {
    id: 'n4',
    type: 'change',
    title: 'Änderung: Street Soccer Cup',
    body: 'Der Treffpunkt für den Street Soccer Cup wurde geändert. Bitte neue Details in der App prüfen.',
    timestamp: 'Gestern',
    read: true,
  },
  {
    id: 'n5',
    type: 'cancellation',
    title: 'Absage: Workshop Öffentlichkeitsarbeit',
    body: 'Der Workshop am 15. März musste leider kurzfristig abgesagt werden. Du erhältst deine Punkte zurück.',
    timestamp: 'Vor 2 Tagen',
    read: true,
  },
]
