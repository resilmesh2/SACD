import { AgendaContainer } from '@sentinel/layout';
import { Agenda } from '@sentinel/layout';
import { 
  NETWORK_NODES_PATH,
  MISSION_PATH,
  ISSUE_PATH,
  SERVICE_PATH,
  VULNERABILITY_PATH,
  SUBNETS_PATH,
  ORGANISATION_PATH
} from './paths';

export const agendaContainers = [
  new AgendaContainer('Lists', [
    new Agenda('Assets', SERVICE_PATH),
    new Agenda('Vulnerabilities', ISSUE_PATH)
  ]),
  new AgendaContainer('Visualizations', [
    new Agenda('Network nodes', NETWORK_NODES_PATH),
    new Agenda('Vulnerabilities', VULNERABILITY_PATH),
    new Agenda('Missions', MISSION_PATH),
    
  ]),
  new AgendaContainer('CRUD', [
    new Agenda('Subnets', SUBNETS_PATH),
    new Agenda('Organisation Units', ORGANISATION_PATH),
  ]),
];
