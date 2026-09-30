import { createElement } from '../utils/dom.js';
import { getLeaderboard } from '../state/storage.js';
import { createModal } from './modal.js';

export const showLeaderboardModal = () => {
  const records = getLeaderboard();

  let bodyContent;

  if (records.length === 0) {
    const emptyTitle = createElement('p', {
      className: 'leaderboard-empty__title',
      text: 'NO BATTLES RECORDED YET',
    });

    const emptyDesc = createElement('p', {
      className: 'leaderboard-empty__desc',
      text: 'Complete a game to claim your glory among the Legends!',
    });

    bodyContent = createElement('div', {
      className: 'leaderboard-empty',
      children: [emptyTitle, emptyDesc],
    });
  } else {
    const headerRow = createElement('tr', {
      children: [
        createElement('th', { className: 'leaderboard-th leaderboard-th--rank', text: 'RANK' }),
        createElement('th', { className: 'leaderboard-th leaderboard-th--moves', text: 'MOVES' }),
        createElement('th', { className: 'leaderboard-th leaderboard-th--date', text: 'DATE' }),
      ],
    });

    const thead = createElement('thead', {
      children: [headerRow],
    });

    const rows = records.map((record, index) => {
      const rank = index + 1;
      let rankClass = 'leaderboard-rank';
      if (rank === 1) rankClass += ' leaderboard-rank--first';
      else if (rank === 2) rankClass += ' leaderboard-rank--second';
      else if (rank === 3) rankClass += ' leaderboard-rank--third';

      const rankBadge = createElement('span', {
        className: rankClass,
        text: String(rank),
      });

      const rankTd = createElement('td', {
        className: 'leaderboard-td leaderboard-td--rank',
        children: [rankBadge],
      });

      const movesTd = createElement('td', {
        className: 'leaderboard-td leaderboard-td--moves',
        text: String(record.moves),
      });

      const dateTd = createElement('td', {
        className: 'leaderboard-td leaderboard-td--date',
        text: record.date || '-',
      });

      return createElement('tr', {
        className: 'leaderboard-tr',
        children: [rankTd, movesTd, dateTd],
      });
    });

    const tbody = createElement('tbody', {
      children: rows,
    });

    const table = createElement('table', {
      className: 'leaderboard-table',
      children: [thead, tbody],
    });

    bodyContent = createElement('div', {
      className: 'leaderboard-container',
      children: [table],
    });
  }

  const modal = createModal({
    title: 'HALL OF HEROES',
    content: bodyContent,
    buttons: [
      {
        text: 'CLOSE',
        className: 'btn--leaderboard',
        onClick: (_, { close }) => {
          close();
        },
      },
    ],
  });

  modal.open();
  return modal;
};
