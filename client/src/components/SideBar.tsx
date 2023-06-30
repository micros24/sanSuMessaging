import { gql, useQuery, useSubscription } from "@apollo/client";
import { useAuthState } from "../context/auth";
import { useState } from "react";
import { UserModel } from "../../../src/models";

const GET_FRIENDS_QUERY = gql`
  query getFriends {
    getFriends {
      email firstName lastName profilePicture
    }
  }
`;

const GET_FRIENDS_SUBSCRIPTION = gql`
  subscription newFriend($recipient: String!) {
    newFriend(recipient: $recipient) {
      email firstName lastName profilePicture
    }
  }
`;

interface Props {
  onFriendClick: () => void;
};

export default function SideBar({onFriendClick}: Props) {
  const user = useAuthState().user;
  const [friends, setFriends] = useState<UserModel[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const {} = useQuery(GET_FRIENDS_QUERY, {
    onError: (error) => alert("An error has occured: " + error.graphQLErrors[0].extensions.code),
    onCompleted(data) {
      setFriends(data.getFriends);
    }
  });

  const {} = useSubscription(GET_FRIENDS_SUBSCRIPTION, {
    onError: (error) => alert("An error has occured: " + error.graphQLErrors[0].extensions.code),
    onData(data) {
      let newFriend = data.data.data.newFriend;
      let temp = [...friends, newFriend]
      setFriends(temp);
    },
    variables: {
      recipient: user.email
    }
  })

  return (
    <div className="list-group list-group-flush text-center">
      {friends[0] ? 
        (friends.map((person: UserModel, index) => (
          <a className={selectedIndex === index 
              ? "list-group-item list-group-item-action active"
              : "list-group-item list-group-item-action"
              }
              onClick={() => {
                setSelectedIndex(index);
                onFriendClick;
              }}
              key={person.email}
              href="#">
            {person.profilePicture} {person.firstName} {person.lastName}
          </a>
        ))) 
        : (<p className="secondary text-white">Start adding friends!</p>)}
    </div>
  );
}
