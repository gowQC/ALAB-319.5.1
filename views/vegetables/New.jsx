const React = require("react");

class New extends React.Component {
  render() {
    return (
      <form action="/api/vegetables" method="POST">
        Name: <input type="text" name="name" /> <br />
        Color: <input type="text" name="color" /> <br />
        Is Ready to Eat: <input type="checkbox" name="readyToEat" /> <br />
        <input type="submit" name="" value="Create Vegetable" />
      </form>
    );
  }
}

module.exports = New;
