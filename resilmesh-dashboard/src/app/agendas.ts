import { AgendaContainer } from '@sentinel/layout';
import { Agenda } from '@sentinel/layout';
import { 
  NETWORK_PATH,
  MISSION_PATH,
  ISSUE_PATH,
  VULNERABILITY_PATH,
  NETWORK_INTERACTIVE_PATH,
  NETWORK_STATIC_LANDSCAPE
} from './paths';

export const agendaContainers = [
  new AgendaContainer('Visualizations', [
    new Agenda('Asset Information', NETWORK_PATH),
    new Agenda('Missions', MISSION_PATH),
    new Agenda('Vulnerability', VULNERABILITY_PATH),
    new Agenda('Issues', ISSUE_PATH),
    new Agenda('Interactive Visualization', NETWORK_INTERACTIVE_PATH),
    new Agenda('Network Landscape', NETWORK_STATIC_LANDSCAPE)
  ])
];
