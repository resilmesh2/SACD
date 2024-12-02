import { AgendaContainer } from '@sentinel/layout';
import { Agenda } from '@sentinel/layout';
import { NETWORK_PATH, MISSION_PATH } from './paths';

export const agendaContainers = [
  new AgendaContainer('Visualizations', [new Agenda('Asset Information', NETWORK_PATH), new Agenda('Missions', MISSION_PATH)])
];
