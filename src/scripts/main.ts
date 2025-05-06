import { Team } from '../types/team';
import { getTeams } from '../api/api';

const teams: Team[] = await getTeams();

console.log(teams);
