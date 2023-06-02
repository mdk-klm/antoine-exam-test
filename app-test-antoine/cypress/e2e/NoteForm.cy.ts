describe('NoteForm', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays the form and handles form submission', () => {
    const testData = {
      title: 'Test Title',
      note: 8,
      commentary: 'Test Commentary',
    };

    // Open the form modal
    cy.get('.open-form-btn').click();

    // Fill in the form inputs
    cy.get('.title').type(testData.title);
    cy.get('.note').type(testData.note);
    cy.get('.commentary').type(testData.commentary);

    // Submit the form
    cy.get('.submit-btn').click();

    // Assert that the form values are cleared
    cy.get('.title').should('have.value', '');
    cy.get('.note').should('have.value', '');
    cy.get('.commentary').should('have.value', '');

    // Assert that the form data is displayed in the list
    cy.contains('.note-title', testData.title).should('exist');
    cy.contains('.note-note', testData.note).should('exist');
    cy.contains('.note-commentary', testData.commentary).should('exist');
  });

  it('displays an error message for empty fields', () => {
    // Open the form modal
    cy.get('.open-form-btn').click();

    // Submit the form without filling in any inputs
    cy.get('.submit-btn').click();

    // Assert that the error message is displayed
    cy.contains('.errorMsg', 'All the fields are required.').should('exist');
  });

  it('updates a rate when editing', () => {
    const initialData = {
      title: 'Initial Title',
      note: '8',
      commentary: 'Initial Commentary',
    };

    const updatedData = {
      title: 'Updated Title',
      note: '10',
      commentary: 'Updated Commentary',
    };

    // Add a rate to the list
    cy.contains('.add-rate-btn', 'Add Rate').click();
    cy.get('.title').type(initialData.title);
    cy.get('.note').type(initialData.note);
    cy.get('.commentary').type(initialData.commentary);
    cy.get('.submit-btn').click();

    // Edit the rate
    cy.contains('.edit-rate-btn').click();
    cy.get('.title').clear().type(updatedData.title);
    cy.get('.note').clear().type(updatedData.note);
    cy.get('.commentary').clear().type(updatedData.commentary);
    cy.get('.submit-btn').click();

    // Assert that the rate has been updated
    cy.contains('.note-title', updatedData.title).should('exist');
    cy.contains('.note-note', updatedData.note).should('exist');
    cy.contains('.note-commentary', updatedData.commentary).should('exist');
  });
});
