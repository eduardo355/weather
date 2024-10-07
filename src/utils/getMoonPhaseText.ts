export function getMoonPhaseText(moonphase: number): string {
  if (moonphase === 0) return 'Luna nueva'
  if (moonphase === 0.25) return 'Cuarto creciente'
  if (moonphase === 0.5) return 'Luna llena'
  if (moonphase === 0.75) return 'Cuarto menguante'
  return 'Fase intermedia'
}
