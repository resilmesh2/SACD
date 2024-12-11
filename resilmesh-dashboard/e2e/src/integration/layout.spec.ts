import { LayoutPage } from '../support/layout.po';
import { agendaContainers } from '../../../src/app/agendas';

describe('Layout', () => {
  beforeEach(() => {
    LayoutPage.goToPage();
  });

  it('should display side nav with agendas', () => {
    LayoutPage.checkForAgendas(agendaContainers);
  });

  it('should click all agendas and navigate to clicked agenda', () => {
    LayoutPage.clickAgendas(agendaContainers);
  });

  it('should display breadcrumbs of agendas', () => {
    LayoutPage.checkBreadcrumbsOfAgendas(agendaContainers);
  });

  it('should display user menu in toolbar', () => {
    LayoutPage.checkUserMenu();
  });

  it('should display custom content in toolbar', () => {
    LayoutPage.checkToolbarCustomContent();
  });

  it('should open user menu detail on click', () => {
    LayoutPage.openUserMenuDetail();
  });

  it('should hide menu mobile and display hamburger menu toggle', () => {
    LayoutPage.checkMobileMenu();
  });
});
