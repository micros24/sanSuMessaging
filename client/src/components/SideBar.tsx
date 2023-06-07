import { Component } from "react";

class SideBar extends Component {
  render() {
    return (
      <>
        <div className="list-group list-group-flush">
          <a
            href="#"
            className="list-group-item list-group-item-action active"
            aria-current="true"
          >
            The current link item
          </a>
          {/* <ul className="list-group">
            {userModel.map((user: string) => (
              <li className="list-group-item active" key={user}></li>
            ))}
          </ul> */}
        </div>
      </>
    );
  }
}

export default SideBar;
