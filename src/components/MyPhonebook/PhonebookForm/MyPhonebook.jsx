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

  isDublicate({ name, number }) {
    const normalizedName = name.toLowerCase();
    const normalizedNumber = number.toLowerCase();
    const { contacts } = this.state;

    const dublicate = contacts.find(item => {
      const normalizedCurrentName = item.name.toLowerCase();
      const normalizedCurrentNumber = item.number.toLowerCase();
      return (
        normalizedCurrentName === normalizedName &&
        normalizedCurrentNumber === normalizedNumber
      );
    });
    return Boolean(dublicate);
  }

  addContacts = data => {
    if (this.isDublicate(data)) {
      return alert(
        `Contact with ${data.name} and ${data.number} already in list`
      );
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

  deleteContacts = id => {
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
    const { addContacts, deleteContacts } = this;
    const contacts = this.getFilteredContacts();
    return (
     <Container>
      <h2>Phonebook</h2>
        <PhonebookForm onSubmit={addContacts} />
        <div>
          <input onChange={this.changeFilter} name="filter" placeholder="Search" />
          <PhonebookList items={contacts} deleteContacts={deleteContacts} />
        </div>
        </Container>
    );
  }
}

export default MyPhonebook;
