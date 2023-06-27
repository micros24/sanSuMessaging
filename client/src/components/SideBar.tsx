import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { UserModel } from "../../../src/models";

const GET_FRIENDS = gql`
  query getFriends {
    getFriends {
      email firstName lastName profilePicture
    }
  }
`;

interface Props {
  onFriendClick: () => void;
};

export default function SideBar({onFriendClick}: Props) {
  const [friends, setFriends] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { refetch } = useQuery(GET_FRIENDS, {
    onError: (error) => alert("An error has occured: " + error.graphQLErrors[0].extensions.code),
    onCompleted(data) {
      setFriends(data.getFriends);
    }
  });

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
              href="#">
            {person.profilePicture} {person.firstName} {person.lastName}
          </a>
        ))) 
        : (<p className="secondary text-white">Start adding friends!</p>)}
    </div>
  );
}
