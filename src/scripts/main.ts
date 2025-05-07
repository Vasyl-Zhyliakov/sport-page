// import { Team } from '../types/team';
// import { getTeams } from '../api/api';

// const teams: Team[] = await getTeams();

document.addEventListener('DOMContentLoaded', () => {
  const tabLinks =
    document.querySelectorAll<HTMLAnchorElement>('.main__tables-link');
  const tabItems =
    document.querySelectorAll<HTMLLIElement>('.main__tables-item');
  const tabContents = document.querySelectorAll<HTMLElement>(
    '.main__tables-container'
  );

  tabLinks.forEach((link, index) => {
    link.addEventListener('click', (event: MouseEvent) => {
      event.preventDefault();

      const tab = link.dataset.tab;
      if (!tab) return;

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
        targetContainer.classList.add('main__tables-container--active');
      }
    });
  });
});
