import { Component } from 'react';
import PhonebookForm from './PhonebookForm/PhonebookForm';
import PhonebookList from './PhonebookList/PhonebookList';
import { nanoid } from 'nanoid';
import { Container } from './MyPhonebook.styled';

class MyPhonebook extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const storedContacts = localStorage.getItem('my-contacts');
    if (storedContacts) {
      this.setState({
        contacts: JSON.parse(storedContacts),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('my-contacts', JSON.stringify(contacts));
    }
  }

  isDuplicate({ name, number }) {
    const { contacts } = this.state;
    return contacts.some(
      (contact) =>
        contact.name.toLowerCase() === name.toLowerCase() &&
        contact.number.toLowerCase() === number.toLowerCase()
    );
  }

  addContact = (data) => {
    if (this.isDuplicate(data)) {
      return alert(`Contact with ${data.name} and ${data.number} already in the list`);
    }

    this.setState((prevState) => ({
      contacts: [
        ...prevState.contacts,
        {
          id: nanoid(),
          ...data,
        },
      ],
    }));
  };

  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
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

    return contacts.filter(({ name, number }) =>
      name.toLowerCase().includes(normalizedFilter) ||
      number.toLowerCase().includes(normalizedFilter)
    );
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
            placeholder="Search"
          />
          <PhonebookList items={contacts} deleteContact={deleteContact} />
        </div>
      </Container>
    );
  }
}

export default MyPhonebook;
