import { Team } from '../types/team';
import { getTeams } from '../api/api';
let teams: Team[] = [];

function createFormIcons(form: Pick<Team, 'form'>['form']): HTMLElement {
  const iconsContainer = document.createElement('div');
  iconsContainer.classList.add('table__form-container');

  for (const char of form) {
    const formIcon = document.createElement('div');
    formIcon.classList.add('table__form-icon');

    switch (char) {
      case 'W':
        formIcon.classList.add('table__form-icon--win');
        break;

      case 'D':
        formIcon.classList.add('table__form-icon--draw');
        break;

      case 'L':
        formIcon.classList.add('table__form-icon--lose');
        break;

      default:
        continue;
    }

    iconsContainer.appendChild(formIcon);
  }

  return iconsContainer;
}

function createRow(team: Team, index: number): HTMLTableRowElement {
  const tr = document.createElement('tr');
  tr.classList.add('table__row', 'table__row--body');

  const positionCell = document.createElement('td');
  positionCell.classList.add('table__cell', 'table__cell--position');

  if (index < 2) {
    positionCell.classList.add('table__cell--first-positions', 'tooltip');
    positionCell.dataset.tooltip = 'Лига чемпионов';
  }

  if (index === 2) {
    positionCell.classList.add('table__cell--third-position', 'tooltip');
    positionCell.dataset.tooltip = 'Другая лига';
  }

  positionCell.textContent = (index + 1).toString();
  tr.appendChild(positionCell);

  const iconCell = document.createElement('td');
  iconCell.classList.add('table__cell', 'table__cell--logo');
  const teamIcon = document.createElement('div');
  teamIcon.classList.add('table__icon');
  teamIcon.style.backgroundImage = `url(${team.logo})`;
  iconCell.appendChild(teamIcon);
  tr.appendChild(iconCell);

  const nameCell = document.createElement('td');
  nameCell.classList.add('table__cell', 'table__cell--name');
  nameCell.textContent = team.name;
  tr.appendChild(nameCell);

  const gamesCell = document.createElement('td');
  gamesCell.classList.add('table__cell', 'table__cell--games');
  gamesCell.textContent = team.games.toString();
  tr.appendChild(gamesCell);

  const winsCell = document.createElement('td');
  winsCell.classList.add('table__cell', 'table__cell--wins');
  winsCell.textContent = team.wins.toString();
  tr.appendChild(winsCell);

  const drawsCell = document.createElement('td');
  drawsCell.classList.add('table__cell', 'table__cell--draws');
  drawsCell.textContent = team.draws.toString();
  tr.appendChild(drawsCell);

  const lossesCell = document.createElement('td');
  lossesCell.classList.add('table__cell', 'table__cell--loses');
  lossesCell.textContent = team.loses.toString();
  tr.appendChild(lossesCell);

  const scoreCell = document.createElement('td');
  scoreCell.classList.add('table__cell', 'table__cell--scored');
  scoreCell.textContent = `${team.scored} - ${team.conceded}`;
  tr.appendChild(scoreCell);

  const formCell = document.createElement('td');
  formCell.classList.add(
    'table__cell',
    'table__cell--form',
    'table__cell--desktop'
  );
  formCell.appendChild(createFormIcons(team.form));
  tr.appendChild(formCell);

  const pointsCell = document.createElement('td');
  pointsCell.classList.add('table__cell', 'table__cell--points');
  pointsCell.textContent = String(team.points);
  tr.appendChild(pointsCell);

  return tr;
}

function renderTables(groups = ['A', 'B', 'C']): void {
  const container = document.querySelector('.main__tables-container.guests');

  if (!container) return;
  groups.forEach((group) => {
    const groupTeams = teams.filter((team) => team.group === group);
    const table = container.querySelector(`.main__table.Group${group}`);
    const tbody = table?.querySelector('tbody');

    if (!tbody) return;

    groupTeams
      .sort((a, b) => b.points - a.points)
      .forEach((team, i) => {
        const row = createRow(team, i);
        tbody.appendChild(row);
      });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const tabLinks =
    document.querySelectorAll<HTMLAnchorElement>('.main__tables-link');
  const tabItems =
    document.querySelectorAll<HTMLLIElement>('.main__tables-item');
  const tabContents = document.querySelectorAll<HTMLElement>(
    '.main__tables-container'
  );

  tabLinks.forEach((link, index) => {
    link.addEventListener('click', async (event: MouseEvent) => {
      event.preventDefault();

      const tab = link.dataset.tab;

      if (link.classList.contains('main__tables-link--active')) return;

      tabItems.forEach((item) =>
        item.classList.remove('main__tables-item--active')
      );
      tabLinks.forEach((link) =>
        link.classList.remove('main__tables-link--active')
      );
      tabContents.forEach((container) =>
        container.classList.remove('main__tables-container--active')
      );

      tabItems[index].classList.add('main__tables-item--active');
      link.classList.add('main__tables-link--active');

      const targetContainer = document.querySelector<HTMLElement>(
        `.main__tables-container.${tab}`
      );

      if (targetContainer) {
        const tbodies = targetContainer.querySelectorAll('tbody');
        const isEmpty = Array.from(tbodies).every(
          (tbody) => tbody.children.length === 0
        );

        if (tab === 'guests' && isEmpty) {
          teams = await getTeams();
          renderTables();
        }

        targetContainer.classList.add('main__tables-container--active');
      }
    });
  });
});
