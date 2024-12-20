import { AgendaContainer } from '@sentinel/layout';
import { Agenda } from '@sentinel/layout';
import { 
  NETWORK_PATH,
  MISSION_PATH,
  ISSUE_PATH,
  VULNERABILITY_PATH
} from './paths';

export const agendaContainers = [
  new AgendaContainer('Visualizations', [
    new Agenda('Asset Information', NETWORK_PATH),
    new Agenda('Missions', MISSION_PATH),
    new Agenda('Vulnerability', VULNERABILITY_PATH),
    new Agenda('Issues', ISSUE_PATH)
  ])
];
