import { Component } from 'react';
import PhonebookForm from './PhonebookForm/PhonebookForm';
import PhonebookList from './PhonebookList/PhonebookList';
import { nanoid } from 'nanoid';
import { Container } from './MyPhonebook.styled';

class MyPhonebook extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  isDuplicate({ name, number }) {
    const { contacts } = this.state;

    const duplicate = contacts.find(item => {
      return (
        item.name.toLowerCase() === name.toLowerCase() &&
        item.number.toLowerCase() === number.toLowerCase()
      );
    });

    return Boolean(duplicate);
  }

  addContact = data => {
    if (this.isDuplicate(data)) {
      return alert(`Contact with ${data.name} and ${data.number} already in the list`);
    }

    this.setState(({ contacts }) => {
      const newContact = {
        id: nanoid(),
        ...data,
      };
      return {
        contacts: [...contacts, newContact],
      };
    });
  };

  deleteContact = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(item => item.id !== id);

      return {
        contacts: newContacts,
      };
    });
  };

  changeFilter = ({ target }) => {
    this.setState({
      filter: target.value,
    });
  };

  getFilteredContacts() {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter(({ name, number }) => {
      const normalizedName = name.toLowerCase();
      const normalizedNumber = number.toLowerCase();

      return (
        normalizedName.includes(normalizedFilter) ||
        normalizedNumber.includes(normalizedFilter)
      );
    });
    return filteredContacts;
  }

  render() {
    const { addContact, deleteContact } = this;
    const contacts = this.getFilteredContacts();
    return (
      <Container>
        <h2>Phonebook</h2>
        <PhonebookForm onSubmit={addContact} />
        <div>
          <input
            onChange={this.changeFilter}
            name="filter"
            placeholder="Поиск"
          />
          <PhonebookList items={contacts} deleteContact={deleteContact} />
        </div>
      </Container>
    );
  }
}

export default MyPhonebook;
