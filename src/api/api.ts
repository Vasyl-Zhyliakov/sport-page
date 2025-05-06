import { Team } from '../types/team';
const API = 'https://63ee0ec0388920150dd83e3c.mockapi.io/teams';

export function getTeams(): Promise<Team[]> {
  return fetch(API).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    return response.json();
  });
}
