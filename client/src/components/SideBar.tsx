import { gql, useQuery, useSubscription } from "@apollo/client";
import { useAuthState } from "../context/auth";
import { useState } from "react";
import { UserModel } from "../../../src/models";
import { ListGroup, Image } from "react-bootstrap";
import { useMessagingDispatch } from "../context/messaging";

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

const SIDEBAR_REORGANIZER_SUBSCRIPTION = gql`
  subscription newMessageSideBarReorganizer($recipient: String!) {
    newMessageSideBarReorganizer(recipient: $recipient) {
      to
      from
    }
  }
`;

export default function SideBar() {
  const user = useAuthState().user;
  const messagingDispatch = useMessagingDispatch();
  const [friends, setFriends] = useState<UserModel[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  //friends: UserModel[] = useFriendsState().friends;

  useQuery(GET_FRIENDS_QUERY, {
    onError: (error) =>
      alert("An error has occured: " + error.graphQLErrors[0].extensions.code),
    onCompleted(data) {
      if (data.getFriends[0]) {
        setFriends(data.getFriends);
        setSelectedIndex(0);
        messagingDispatch({ type: "SET", payload: data.getFriends[0] });
      }
    },
  });

  useSubscription(GET_FRIENDS_SUBSCRIPTION, {
    onError: (error) =>
      alert("An error has occured: " + error.graphQLErrors[0].extensions.code),
    onData(data) {
      let newFriend = data.data.data.newFriend;
      let newFriendsList = [...friends, newFriend];
      setFriends(newFriendsList);
    },
    variables: {
      recipient: user.email,
    },
  });

  useSubscription(SIDEBAR_REORGANIZER_SUBSCRIPTION, {
    // onError: (error) =>
    //   alert("An error has occured: " + error.graphQLErrors[0].extensions.code),
    onData(data) {
      let message = data.data.data.newMessageSideBarReorganizer;
      let index;
      friends.forEach((friend, forEachIndex) => {
        if (friend.email === message.from) index = forEachIndex;
      });

      var temp = friends;

      delete temp[index];
      console.log(friends);
      //console.log(splicedItem);
      console.log(temp);
      //temp.unshift();
    },
    variables: {
      recipient: user.email,
    },
  });

  const handleOnFriendClick = (person: UserModel) => {
    messagingDispatch({ type: "SET", payload: person });
  };

  return (
    <ListGroup>
      {friends.length !== 0 ? (
        friends.map((person: UserModel, index) => (
          <ListGroup.Item
            action
            variant="light"
            id={person.email}
            key={person.email}
            active={selectedIndex === index}
            onClick={() => {
              setSelectedIndex(index);
              handleOnFriendClick(person);
            }}
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
                className="bi bi-person-circle text-success"
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
          </ListGroup.Item>
        ))
      ) : (
        <h2 className="text-white text-center">Start adding friends!</h2>
      )}
    </ListGroup>
  );
}
