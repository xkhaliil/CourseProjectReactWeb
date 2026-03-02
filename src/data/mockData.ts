export interface Game {
  id: string
  word: string
  date: string
}

export interface Score {
  id: string
  gameId: string
  userId: string
  guesses: number
  duration: number // seconds
  timestamp: string
}

const games: Game[] = [
  { id: "1", word: "KHALI", date: "2026-03-08" },
  { id: "2", word: "PIXEL", date: "2026-03-09" },
  { id: "3", word: "NOKIA", date: "2026-03-10" },
  { id: "4", word: "SNAKE", date: "2026-03-11" },
  { id: "5", word: "RETRO", date: "2026-03-12" },
]

const scores: Score[] = [
  { id: "1-1", gameId: "1", userId: "RetroFox", guesses: 2, duration: 44, timestamp: "2026-03-08T10:01:00.000Z" },
  { id: "1-2", gameId: "1", userId: "PixelKid", guesses: 3, duration: 66, timestamp: "2026-03-08T10:02:00.000Z" },
  { id: "1-3", gameId: "1", userId: "NeonPalm", guesses: 3, duration: 81, timestamp: "2026-03-08T10:03:00.000Z" },
  { id: "1-4", gameId: "1", userId: "ByteRider", guesses: 4, duration: 97, timestamp: "2026-03-08T10:04:00.000Z" },
  { id: "1-5", gameId: "1", userId: "DialTone", guesses: 5, duration: 124, timestamp: "2026-03-08T10:05:00.000Z" },

  { id: "2-1", gameId: "2", userId: "SignalOne", guesses: 2, duration: 49, timestamp: "2026-03-09T11:01:00.000Z" },
  { id: "2-2", gameId: "2", userId: "MonoGrid", guesses: 3, duration: 70, timestamp: "2026-03-09T11:02:00.000Z" },
  { id: "2-3", gameId: "2", userId: "BlueLCD", guesses: 4, duration: 88, timestamp: "2026-03-09T11:03:00.000Z" },
  { id: "2-4", gameId: "2", userId: "PalmPilot", guesses: 4, duration: 109, timestamp: "2026-03-09T11:04:00.000Z" },
  { id: "2-5", gameId: "2", userId: "OldSchool", guesses: 6, duration: 180, timestamp: "2026-03-09T11:05:00.000Z" },

  { id: "3-1", gameId: "3", userId: "SnakeChamp", guesses: 1, duration: 35, timestamp: "2026-03-10T12:01:00.000Z" },
  { id: "3-2", gameId: "3", userId: "T9Master", guesses: 2, duration: 58, timestamp: "2026-03-10T12:02:00.000Z" },
  { id: "3-3", gameId: "3", userId: "BrickPhone", guesses: 3, duration: 77, timestamp: "2026-03-10T12:03:00.000Z" },
  { id: "3-4", gameId: "3", userId: "DotMatrix", guesses: 4, duration: 99, timestamp: "2026-03-10T12:04:00.000Z" },
  { id: "3-5", gameId: "3", userId: "GreenTint", guesses: 5, duration: 142, timestamp: "2026-03-10T12:05:00.000Z" },

  { id: "4-1", gameId: "4", userId: "ArcadeKid", guesses: 2, duration: 46, timestamp: "2026-03-11T13:01:00.000Z" },
  { id: "4-2", gameId: "4", userId: "PocketWin", guesses: 3, duration: 73, timestamp: "2026-03-11T13:02:00.000Z" },
  { id: "4-3", gameId: "4", userId: "SIMCard", guesses: 4, duration: 94, timestamp: "2026-03-11T13:03:00.000Z" },
  { id: "4-4", gameId: "4", userId: "Antenna", guesses: 4, duration: 111, timestamp: "2026-03-11T13:04:00.000Z" },
  { id: "4-5", gameId: "4", userId: "FlipCase", guesses: 5, duration: 136, timestamp: "2026-03-11T13:05:00.000Z" },

  { id: "5-1", gameId: "5", userId: "MonoTone", guesses: 2, duration: 52, timestamp: "2026-03-12T14:01:00.000Z" },
  { id: "5-2", gameId: "5", userId: "TinyLCD", guesses: 3, duration: 69, timestamp: "2026-03-12T14:02:00.000Z" },
  { id: "5-3", gameId: "5", userId: "KeyClick", guesses: 3, duration: 84, timestamp: "2026-03-12T14:03:00.000Z" },
  { id: "5-4", gameId: "5", userId: "Ringer", guesses: 4, duration: 101, timestamp: "2026-03-12T14:04:00.000Z" },
  { id: "5-5", gameId: "5", userId: "ClassicUI", guesses: 6, duration: 175, timestamp: "2026-03-12T14:05:00.000Z" },
]

export const getGames = (): Game[] => {
  return games
}

export const getGame = (id: string): Game | undefined => {
  return games.find((g) => g.id === id)
}

export const getScores = (gameId: string): Score[] => {
  return scores
    .filter((s) => s.gameId === gameId)
    .sort((a, b) => {
      if (a.guesses !== b.guesses) return a.guesses - b.guesses
      return a.duration - b.duration
    })
}

export const getTopScores = (gameId: string, limit: number): Score[] => {
  return getScores(gameId).slice(0, limit)
}
