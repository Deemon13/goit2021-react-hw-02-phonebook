import React, { Component } from 'react';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [],
    name: '',
  };

  addContact = name => {
    const contact = {
      id: nanoid(),
      name,
    };
    console.log(contact);

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
    console.log(this.state.contacts);
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { name } = this.state;
    this.addContact(name);
    this.setState({ name: '' });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { name } = this.state;
    return (
      <>
        <h1>phonebook</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="">name</label>
          <input
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleChange}
          />
          <button type="submit" disabled={!name}>
            Add contact
          </button>
        </form>
        <section>
          <h2>Contacts</h2>
          <ul>
            {this.state.contacts.map(({ id, name }) => {
              return <li key={id}>{name}</li>;
            })}
          </ul>
        </section>
      </>
    );
  }
}
