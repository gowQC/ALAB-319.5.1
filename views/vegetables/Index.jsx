const React = require("react");

class Index extends React.Component {
  render() {
    const { vegetables } = this.props;

    return (
      <>
        <nav>
          <a href="/vegetables/new">Create a New Vegetable</a>
        </nav>
        <ul>
          {vegetables.map((vegetable, i) => {
            return (
              <li>
                The{" "}
                <a href={`api/vegetables/${vegetable._id}`}>{vegetable.name}</a>{" "}
                is {vegetable.color} <br></br>
                {vegetable.readyToEat
                  ? `It is ready to eat`
                  : `It is NOT ready to eat`}
                <br />
                <a href={`/vegetables/${vegetable._id}/edit`}>
                  Edit This vegetable
                </a>
                <form
                  action={`api/vegetables/${vegetable._id}?_method=DELETE`}
                  method="POST"
                >
                  <input type="submit" value="DELETE" />
                </form>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

module.exports = Index;
