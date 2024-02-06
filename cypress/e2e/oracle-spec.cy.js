import Page from './pages/page';
const page = new Page();
describe('template spec', () => {
  beforeEach(() => {
    cy.visit('');
    page.login();
    cy.get('.u-Processing-spinner').should('not.exist');
  });
  it('Save data to the memory', () => {
    page.saveDataInMemory();
  });

  it('Change quantity of the item', () => {
    const newQuantity = 20;
    const newCostumer = 'Deli';
    page.changeQuantityOfElementWithOrder(10, newQuantity);
    page.changeCostumerOfElementWithOrder(newCostumer);
    page.saveChanges();
    cy.get('td.a-GV-cell.u-tE').should('have.text', newQuantity);
    cy.get('#R73937336144205054940_ig_grid_vc > div.a-GV-bdy > div.a-GV-w-scroll > table > tbody > tr > td:nth-child(6)').should('have.text', newCostumer);

  });

});