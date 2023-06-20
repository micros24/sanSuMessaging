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

const GET_USERS = gql`
  query getUsers {
    getUsers {
      email
      firstName
      lastName
      profilePicture
    }
  }
`;

export default function ChatWindow() {
  const dispatch = useAuthDispatch();
  const [errors, setErrors] = useState(Object);

  const { loading, data, error } = useQuery(GET_USERS);
  //TODO: add logic to find who are your friends

  if (error) {
    console.log(error);
  }

  if (data) {
    //console.log(data);
  }
  let friendsMarkup;
  if (!data || loading) {
    friendsMarkup = <p>Loading...</p>;
  } else if (data.getUsers.length === 0) {
    friendsMarkup = <p>Add some friends to start chatting :)</p>;
  } else if (data.getUsers.length > 0) {
    friendsMarkup = data.getUsers.map((user) => (
      <div key={user.email}>
        <p>{user.email}</p>
      </div>
    ));
  }

  // let friendsMarkup;
  // if (!data || loading) {
  //   friendsMarkup = <p>Loading...</p>;
  // } else if (data.getFriends.length === 0) {
  //   friendsMarkup = <p>Add some friends to start chatting :)</p>;
  // } else if (data.getFriends.length > 0) {
  //   friendsMarkup = data.getFriends.map((user) => (
  //     <div key={user.email}>
  //       <p>{user.email}</p>
  //     </div>
  //   ));
  // }

  // const [getFriends, { loading }] = useQuery(GET_FRIENDS, {
  //   onError: (error) => setErrors(error.graphQLErrors[0].extensions.errors),
  //   onCompleted(data) {},
  // });

  return (
    <div>
      <Row>
        <Col xs={4}>{friendsMarkup}</Col>
        <Col xs={8}>
          <p>Messages</p>
        </Col>
      </Row>

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
