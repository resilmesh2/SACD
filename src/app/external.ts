import { Agenda } from "@sentinel/layout";
import { IframePortalComponent } from "./pages/external/iframe-portal.component";


// Define all your externals here, routes and agendas get generated from EXTERNAL
export const EXTERNAL = [
  {
    name: 'NSE',
    path: 'nse',
    url: 'http://51.92.10.245:4201'
  },
  {
    name: 'NDR',
    path: 'ndr',
    url: 'http://51.92.10.245:3000'
  },
  {
    name: 'GraphQL',
    path: 'graphql',
    url: 'http://51.92.10.245:4001/graphql'
  }
  // {
  //   name: 'Recommender',
  //   path: 'recommender',
  //   url: 'http://51.92.10.245:5173'
  // }
]

export const EXTERNAL_ROUTES = EXTERNAL.map(ext => ({
  path: ext.path,
  component: IframePortalComponent,
  data: {
    breadcrumb: ext.name,
    iframeSrc: ext.url
  }
}));

export const EXTERNAL_AGENDAS = EXTERNAL.map(ext =>
  new Agenda(ext.name, ext.path)
);
