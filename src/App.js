import React, { Component } from 'react';
import './App.css';
import GuestList from './GuestList';
import Counter from './Counter';

class App extends Component {
  state = {
    isFiltered: false,
    pendingGuest: "",
    nextId: 4,
    guests: [
      {
        name: "John",
        isConfirmed: false,
        isEditing: false,
        id: 1
      },
      {
        name: "Matt",
        isConfirmed: true,
        isEditing: false,
        id: 2
      },
      {
        name: "Joe",
        isConfirmed: false,
        isEditing: false,
        id: 3
      }
    ]
  };

  toggleGuestPropertyAt = (property, idToChange) => {
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if (guest.id === idToChange) {
          return {
            ...guest,
            [property]: !guest[property]
          };
        } else {
          return guest;
        }
      })
    });
  }

  toggleConfirmationAt = (idToChange) =>
    this.toggleGuestPropertyAt("isConfirmed", idToChange);

  toggleEditingAt = (idToChange) =>
    this.toggleGuestPropertyAt("isEditing", idToChange);

  setNameAt = (text, idToChange) => {
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if (guest.id === idToChange) {
          return {
            ...guest,
            name: text
          };
        } else {
          return guest;
        }
      })
    });
  }

  toggleFilter = () =>
    this.setState({
      isFiltered: !this.state.isFiltered
    });

  handleNameInput = e =>
    this.setState({
      pendingGuest: e.target.value
    });

  newGuestSubmitHandler = e => {
    e.preventDefault();
    this.setState({
      guests: [
        {
          name: this.state.pendingGuest,
          isConfirmed: false,
          isEditing: false,
          id: this.state.nextId
        },
        ...this.state.guests
      ],
      pendingGuest: "",
      nextId: this.state.nextId + 1
    });

  }

  getTotalInvited = () => this.state.guests.length;

  getTotalAttending = () =>
    this.state.guests.reduce((total, guest) => {
      return guest.isConfirmed ? total + 1 : total;
    }, 0);

  removeGuestAt = idToChange =>
    this.setState({
      guests: this.state.guests.filter(guest => guest.id !== idToChange)
    });


  render() {
    const totalInvited = this.getTotalInvited();
    const numberAttending = this.getTotalAttending();
    const numberUnconfirmed = totalInvited - numberAttending;
    return (
      <div className="App">
        <header>
          <h1>RSVP</h1>
          <p>RSVP App</p>
          <form onSubmit={this.newGuestSubmitHandler}>
            <input type="text"
              value={this.state.pendingGuest}
              placeholder="Invite Someone"
              onChange={this.handleNameInput}
            />
            <button type="submit" name="submit" value="submit">Submit</button>
          </form>
        </header>
        <div className="main">
          <div>
            <h2>Invitees</h2>
            <label>
              <input
                type="checkbox"
                onChange={this.toggleFilter}
                checked={this.state.isFiltered}
              />
              Hide those who haven't responded
            </label>
          </div>

          <Counter
            totalInvited={totalInvited}
            numberAttending={numberAttending}
            numberUnconfirmed={numberUnconfirmed}
          />

          <GuestList
            guests={this.state.guests}
            toggleConfirmationAt={this.toggleConfirmationAt}
            toggleEditingAt={this.toggleEditingAt}
            setNameAt={this.setNameAt}
            isFiltered={this.state.isFiltered}
            removeGuestAt={this.removeGuestAt}
            pendingGuest={this.state.pendingGuest}
          />

        </div>
      </div>
    );
  }
}

export default App;
