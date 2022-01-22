import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

import { Form, Label, Input, Button } from './ContactForm.styled';

export class ContactForm extends Component {
  static propTypes = {
    onAddContact: PropTypes.func,
  };

  state = {
    name: '',
    number: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { name, number } = this.state;
    this.props.onAddContact(name, number);
    this.setState({ name: '', number: '' });
  };

  nameInputId = nanoid();
  numberInputId = nanoid();

  render() {
    const { name, number } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Label htmlFor={this.nameInputId}>name</Label>
        <Input
          type="text"
          name="name"
          id={this.nameInputId}
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={this.handleChange}
        />
        <Label htmlFor={this.numberInputId}>number</Label>
        <Input
          type="tel"
          name="number"
          id={this.numberInputId}
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={this.handleChange}
        />
        <Button type="submit" disabled={!name || !number}>
          Add contact
        </Button>
      </Form>
    );
  }
}
