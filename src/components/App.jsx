import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import { Layout } from './Layout/Layout';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const findContact = this.state.contacts.find(
      contact => contact.name === name
    );

    if (findContact) {
      alert(`${findContact.name} is already in contacts`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  handleChangeFilter = filter => {
    this.setState({ filter });
  };

  getVisibleContacts() {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  filterInputId = nanoid();

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  };

  render() {
    const { contacts, value } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <Layout title="phonebook">
        <ContactForm onAddContact={this.addContact}></ContactForm>

        {contacts.length > 0 && (
          <Section title="Contacts">
            {contacts.length > 2 && (
              <Filter
                id={this.filterInputId}
                value={value}
                onChangeFilter={this.handleChangeFilter}
              />
            )}

            <ContactList
              contacts={visibleContacts}
              onDeleteContact={this.deleteContact}
            ></ContactList>
          </Section>
        )}
      </Layout>
    );
  }
}
