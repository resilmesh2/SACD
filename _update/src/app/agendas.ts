import { AgendaContainer } from '@sentinel/layout';
import { Agenda } from '@sentinel/layout';
import { 
  ASSETS_PATH,
  MISSION_PATH,
  ISSUE_PATH,
  SERVICE_PATH,
  VULNERABILITY_PATH,
  SUBNETS_PATH
} from './paths';

export const agendaContainers = [
  new AgendaContainer('Lists', [
    new Agenda('Assets', SERVICE_PATH),
    //new Agenda('Vulnerabilities', ISSUE_PATH)
  ]),
  new AgendaContainer('Visualizations', [
    new Agenda('Network', ASSETS_PATH),
    // new Agenda('Vulnerabilities', VULNERABILITY_PATH),
    new Agenda('Missions', MISSION_PATH),
    new Agenda('Subnets', SUBNETS_PATH)
  ])
];
