import React from "react";
import logo from "./logo.svg";
import "./App.css";

// when i click on button show images -> onclick

function List(props) {
  return (
    <ol>
      {props.puppies.map(puppy => {
        console.log("puppy cuteness is:", puppy.cuteness);
        return (
          <li key={puppy.name}>
            {puppy.name}, Cuteness: {puppy.cuteness}{" "}
            {props.selectedPuppy === puppy.name && "👑"}
            <button onClick={event => props.changeSelectedPuppy(puppy.name)}>
              pick me to be pup of the week
            </button>
            <button onClick={event => props.changeCuteness(puppy.name)}>
              I am the cutest puppy, please vote for me!
            </button>
            <button
              onClick={function(event) {
                console.log(event.target, puppy.name);
                props.deletePup(puppy.name);
              }}
            >
              remove this pup
            </button>
            {props.puppiesDisplayed && <img src={puppy.url} alt={puppy.name} />}
          </li>
        );
      })}
    </ol>
  );
}

class App extends React.Component {
  state = {
    puppies: [
      {
        name: "daisy",
        url:
          "https://cdn3-www.dogtime.com/assets/uploads/2018/10/puppies-cover.jpg",
        cuteness: 1
      },
      {
        name: "rusty",
        url:
          "https://images.unsplash.com/photo-1566903451935-7e8835ed3e97?ixlib=rb-1.2.1&w=1000&q=80",
        cuteness: 4
      },
      {
        name: "muttley",
        url:
          "https://vignette.wikia.nocookie.net/hanna-barbera/images/c/c6/Muttley_2.jpg/revision/latest/scale-to-width-down/120?cb=20090503020146",
        cuteness: 2
      }
    ],
    puppiesDisplayed: false,
    selectedPuppy: "rusty",
    puppiesSorted: false
  };

  render() {
    return (
      <main>
        <header>my cute puppes</header>
        <button onClick={this.togglePuppies}>show dem pups!</button>
        <button onClick={this.sortPuppies}>
          sort puppies by cuteness ranking
        </button>
        <List
          changeSelectedPuppy={this.changeSelectedPuppy}
          selectedPuppy={this.state.selectedPuppy}
          puppies={this.state.puppies}
          puppiesDisplayed={this.state.puppiesDisplayed}
          deletePup={this.deletePup}
          // changeCuteness={this.changeCuteness}
        />
      </main>
    );
  }

  togglePuppies = event => {
    this.setState(currentState => {
      return { puppiesDisplayed: !currentState.puppiesDisplayed };
    });
    // update the chosen keys in state
    // and call the render method
  };

  changeSelectedPuppy = puppy => {
    this.setState({ selectedPuppy: puppy });
  };

  sortPuppies = event => {
    this.setState(currentState => {
      currentState.puppiesSorted = !currentState.puppiesSorted;
      return {
        puppies: currentState.puppies.sort((a, b) => {
          return currentState.puppiesSorted
            ? b.cuteness - a.cuteness
            : a.cuteness - b.cuteness;
        })
      };
    });
  };

  deletePup = puppyToDelete => {
    console.log("puppyToDelete", puppyToDelete);
    this.setState(currentState => {
      return {
        puppies: currentState.puppies.filter(puppy => {
          return puppy !== puppyToDelete;
        })
      };
    });
  };

  changeCuteness = puppyToChange => {
    // console.log("in here");
    this.setState(currentState => {
      // console.log("currentState", currentState);
      return {
        puppies: currentState.puppies.map(puppy => {
          console.log("puppyToChange", "puppy", puppy.name);
          if (puppy.name === puppyToChange.name) {
            console.log("is puppy name the same??");
            puppy.cuteness++;
            return puppy;
          } else return puppy;
        })
      };
    });
  };
}

export default App;
