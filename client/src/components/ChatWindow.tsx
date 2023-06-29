import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useAuthDispatch } from "../context/auth";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";

// const GET_FRIENDS = gql`
//   query getFriends {
//     getFriends {
//       email
//       firstName
//       lastName
//       profilePicture
//     }
//   }
// `;

export default function ChatWindow() {
  const dispatch = useAuthDispatch();
  const [errors, setErrors] = useState(Object);

  // const { loading, data, error } = useQuery(GET_USERS);

  // if (error) {
  //   console.log(error);
  // }

  // if (data) {
  //   //console.log(data);
  // }
  // let friendsMarkup;
  // if (!data || loading) {
  //   friendsMarkup = <p>Loading...</p>;
  // } else if (data.getUsersTemp.length === 0) {
  //   friendsMarkup = <p>Add some friends to start chatting :)</p>;
  // } else if (data.getUsersTemp.length > 0) {
  //   friendsMarkup = data.getUsersTemp.map((user) => (
  //     <div key={user.email}>
  //       <p>{user.email}</p>
  //     </div>
  //   ));
  // }

  return (
    <div>
      {/* <Row>
        <Col xs={4}>{friendsMarkup}</Col>
        <Col xs={8}>
          <p>Messages</p>
        </Col>
      </Row> */}

      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
    </div>
  );
}
