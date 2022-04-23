import { cyan } from "@mui/material/colors";

describe('The App Loads', () => {
  it('successfully loads', () => {
    cy.visit('/');
  })
  it('successfully searches', () => {
    cy.visit('/');
    cy.get('input[type=search]').click().type("absol");
    cy.get('h2[id=searchResult]').then(($res) => {
      const absolText = $res.text();
      expect(absolText).to.eql("Absol");
    })
  })
})