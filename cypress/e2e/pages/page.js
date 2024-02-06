import Locators from "./locators";

export default class Page extends Locators{

    login() {
        cy.get(this.locators.usernameInput).type(Cypress.env('USERNAME'));
        cy.get(this.locators.passwordInput).type(Cypress.env('PASSWORD'));
        cy.get(this.locators.rememberCheckbox).click();
        cy.get(this.locators.loginButton).click();
    }


    saveDataInMemory() {
        const tableData = [];

        const recursiveClick = () => {
            cy.get('.a-GV-pageButton.js-pg-next').then($button => {
                if ($button.attr('disabled')) {
                    cy.get('tbody tr').each(($line) => {
                        const $cells = $line.find('td');
                        const id = $line.attr('data-id');
                        const quantity = $cells.eq(1).text().trim();
                        const product = $cells.eq(2).text().trim();
                        const store = $cells.eq(4).text().trim();
                        const data = { id, product, quantity, store };
                        tableData.push(data);
                    });
                    Cypress.env('tableDataPage', tableData);
                    cy.log(Cypress.env('tableDataPage'));
                    return;
                }

                cy.get('tbody tr').each(($line) => {
                    const $cells = $line.find('td');
                    const id = $line.attr('data-id');
                    const quantity = $cells.eq(1).text().trim();
                    const product = $cells.eq(2).text().trim();
                    const store = $cells.eq(4).text().trim();
                    const data = { id, product, quantity, store };
                    tableData.push(data);
                });

                cy.get('.a-GV-pageButton.js-pg-next').click().then(() => {
                    recursiveClick();
                });
            });
        };

        recursiveClick();
    }

    changeQuantityOfElementWithOrder(order, value) {
        cy.get(this.locators.quantityCell).should('not.be.null')
        cy.get(this.locators.filterButton).should('be.visible').click();
        cy.get(this.locators.searchInput).type(`${order}{enter}`);
        cy.get(this.locators.processingSpinner).should('not.exist');
        cy.get('td.a-GV-cell.u-tE').dblclick().type(`${value}{esc}`);
    }

    changeCostumerOfElementWithOrder(value) {
        cy.get(this.locators.customerCell).dblclick();
        cy.get(this.locators.customerLovButton).click();
        cy.get(this.locators.customerSearchInput).type(value);
        cy.get(this.locators.customerSearchButton).click();
        cy.get('span').contains(value).click();
    }

    saveChanges() {
        cy.get(this.locators.saveButton).click();
    }


}
