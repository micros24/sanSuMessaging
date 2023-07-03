import { gql, useQuery, useSubscription } from "@apollo/client";
import { useAuthState } from "../context/auth";
import { useState } from "react";
import { UserModel } from "../../../src/models";
import { Image } from "react-bootstrap";

const GET_FRIENDS_QUERY = gql`
  query getFriends {
    getFriends {
      email
      firstName
      lastName
      profilePicture
    }
  }
`;

const GET_FRIENDS_SUBSCRIPTION = gql`
  subscription newFriend($recipient: String!) {
    newFriend(recipient: $recipient) {
      email
      firstName
      lastName
      profilePicture
    }
  }
`;

interface Props {
  onFriendClick: () => void;
}

export default function SideBar({ onFriendClick }: Props) {
  const user = useAuthState().user;
  const [friends, setFriends] = useState<UserModel[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const {} = useQuery(GET_FRIENDS_QUERY, {
    onError: (error) =>
      alert("An error has occured: " + error.graphQLErrors[0].extensions.code),
    onCompleted(data) {
      setFriends(data.getFriends);
    },
  });

  const {} = useSubscription(GET_FRIENDS_SUBSCRIPTION, {
    onError: (error) =>
      alert("An error has occured: " + error.graphQLErrors[0].extensions.code),
    onData(data) {
      let newFriend = data.data.data.newFriend;
      let temp = [...friends, newFriend];
      setFriends(temp);
    },
    variables: {
      recipient: user.email,
    },
  });

  return (
    <div className="list-group list-group-flush text-center">
      {friends[0] ? (
        friends.map((person: UserModel, index) => (
          <a
            className={
              selectedIndex === index
                ? "list-group-item list-group-item-action active"
                : "list-group-item list-group-item-action"
            }
            onClick={() => {
              setSelectedIndex(index);
              onFriendClick;
            }}
            key={person.email}
            href="#"
          >
            {person.profilePicture ? (
              <Image
                src={person.profilePicture}
                roundedCircle
                height={30}
                width={30}
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-person-circle text-primary"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
            )}{" "}
            {person.firstName} {person.lastName}
          </a>
        ))
      ) : (
        <p className="secondary text-white">Start adding friends!</p>
      )}
    </div>
  );
}
