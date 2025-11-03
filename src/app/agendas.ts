import { AgendaContainer } from '@sentinel/layout';
import { Agenda } from '@sentinel/layout';
import { 
  NETWORK_NODES_PATH,
  MISSION_PATH,
  ISSUE_PATH,
  ASSETS_PATH,
  VULNERABILITY_PATH,
  SUBNETS_PATH,
  ORGANIZATION_PATH,
  SUBNETS_GRAPH_PATH,
  ORGANIZATION_GRAPH_PATH,
  CSA_PATH,
  MISSION_EDITOR_PATH,
} from './paths';
import { EXTERNAL_AGENDAS } from './external';

export const agendaContainers = [
  new AgendaContainer('Lists', [
    new Agenda('Assets', ASSETS_PATH),
    new Agenda('Vulnerabilities', ISSUE_PATH),
    new Agenda('CSA', CSA_PATH),
  ], 'list'),
  new AgendaContainer('Visualizations', [
    new Agenda('Network Nodes', NETWORK_NODES_PATH),
    new Agenda('Subnets Graph', SUBNETS_GRAPH_PATH),
    new Agenda('Organizations', ORGANIZATION_GRAPH_PATH),
    new Agenda('Missions', MISSION_PATH),
    new Agenda('Vulnerabilities', VULNERABILITY_PATH),
  ], 'analytics'),
  new AgendaContainer('CRUD', [
    new Agenda('Subnets', SUBNETS_PATH),
    new Agenda('Organizations', ORGANIZATION_PATH),
    new Agenda('Mission Editor', MISSION_EDITOR_PATH),
  ], 'edit_note'),
  new AgendaContainer('External', [
    ...EXTERNAL_AGENDAS
  ], 'api')
];
