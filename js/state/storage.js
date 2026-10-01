const STORAGE_KEY = 'dota2_memory_game_leaderboard';

const compareScores = (a, b) =>
  a.moves !== b.moves
    ? a.moves - b.moves
    : (a.timestamp || 0) - (b.timestamp || 0);

export const getLeaderboard = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.sort(compareScores).slice(0, 10);
  } catch {
    return [];
  }
};

export const saveScore = ({ moves }) => {
  try {
    const current = getLeaderboard();
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;

    const newRecord = {
      moves: Number(moves),
      date: formattedDate,
      timestamp: Date.now(),
    };

    current.push(newRecord);

    current.sort(compareScores);

    const top10 = current.slice(0, 10);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(top10));
    return top10;
  } catch {
    return [];
  }
};
