import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { GlobalStyle } from './GlobalStyle';

const usersData = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleDelete = id => {
    this.setState(prevState => {
      const newContactsList = prevState.contacts.filter(
        contact => contact.id !== id
      );
      return { contacts: newContactsList };
    });
  };

  handleAddContact = ({ name, number }) => {
    const { contacts } = this.state;
    const isExistingContact = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isExistingContact) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      id: nanoid(4),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  componentDidMount() {
    const users = JSON.parse(localStorage.getItem('contacts')) || usersData;

    if (users) {
      this.setState({ contacts: users });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.contacts !== prevState.contacts
    ) {
    }
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.handleAddContact} />
        <h2>Contacts</h2>
        <Filter name="filter" value={filter} onChange={this.handleChange} />
        <ContactList contacts={filteredContacts} onDelete={this.handleDelete} />
        <GlobalStyle />
      </div>
    );
  }
}
