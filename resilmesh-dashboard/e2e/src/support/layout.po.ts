import { AgendaContainer } from '../../../../sentinel-layout/src/model/agenda-container';
import { Agenda } from '../../../../sentinel-layout/src/model/agenda';

export class LayoutPage {
  static goToPage() {
    cy.visit('/');
  }

  static checkForAgendas(agendaContainer: AgendaContainer[]) {
    agendaContainer.forEach((container) => {
      cy.contains(container.label);
      container.children.forEach((agenda) => {
        cy.contains(agenda.label);
      });
    });
  }

  static clickAgendas(agendaContainer: AgendaContainer[]) {
    agendaContainer.forEach((container) => {
      container.children.forEach((agenda) => {
        if (agenda instanceof Agenda) {
          cy.contains(agenda.label).click();
          cy.url().should('include', agenda.path);
        }
      });
    });
  }

  static checkBreadcrumbsOfAgendas(agendaContainer: AgendaContainer[]) {
    agendaContainer.forEach((container) => {
      container.children.forEach((agenda) => {
        cy.contains(agenda.label).click().get('[data-cy=sentinel-agenda-breadcrumb]').should('be.visible');
      });
    });
  }

  static checkUserMenu() {
    cy.get('[data-cy=sentinel-user-menu]');
  }

  static openUserMenuDetail() {
    cy.get('[data-cy=sentinel-user-menu]').click().get('[data-cy=sentinel-user-menu-detail]');
  }

  static checkMobileMenu() {
    cy.get('[data-cy=sentinel-nav]');
    cy.viewport('iphone-6')
      .get('[data-cy=sentinel-nav]')
      .should('be.hidden')
      .get('[data-cy=hamburger-menu]')
      .click()
      .get('[data-cy=sentinel-nav]');
  }

  static checkToolbarCustomContent() {
    cy.get('[data-cy=customized-toolbar-content]');
  }
}
