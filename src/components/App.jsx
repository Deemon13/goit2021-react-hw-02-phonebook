import React, { Component } from 'react';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [],
    name: '',
    number: '',
  };

  addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { name, number } = this.state;
    this.addContact(name, number);
    this.setState({ name: '', number: '' });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  nameInputId = nanoid();
  numberInputId = nanoid();

  render() {
    const { name, number } = this.state;
    return (
      <>
        <h1>phonebook</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor={this.nameInputId}>name</label>
          <input
            type="text"
            name="name"
            id={this.nameInputId}
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleChange}
          />
          <label htmlFor={this.numberInputId}>number</label>
          <input
            type="tel"
            name="number"
            id={this.numberInputId}
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleChange}
          />
          <button type="submit" disabled={!name || !number}>
            Add contact
          </button>
        </form>
        <section>
          <h2>Contacts</h2>
          <ul>
            {this.state.contacts.map(({ id, name, number }) => {
              return (
                <li key={id}>
                  {name}: {number}
                </li>
              );
            })}
          </ul>
        </section>
      </>
    );
  }
}
