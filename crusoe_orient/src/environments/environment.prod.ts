import * as packageData from '../../package.json';

export const environment = {
  applicationName: 'CRUSOE Dashboard',
  production: true,
  version: packageData.version,
  apiUrl: 'https://crusoe.csirt.muni.cz/redirect-api/redirect/',
  tmpActApi: 'https://crusoe.csirt.muni.cz/act/',
  graphqlApi: 'http://localhost:4001/graphql',
  firewallApi: 'https://crusoe-worker.csirt.muni.cz/firewall',
};
