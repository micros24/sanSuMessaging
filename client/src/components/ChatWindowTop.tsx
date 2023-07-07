import { useMessagingState } from "../context/messaging";
import { Image } from "react-bootstrap";

export default function ChatWindowTop() {
  const recipient = useMessagingState().recipient;

  return (
    <>
      <div className="text-center text-white">
        {recipient ? (
          <h4 className="p-0 m-0">
            {recipient.profilePicture ? (
              <Image
                src={recipient.profilePicture}
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
                className="bi bi-person-circle text-white"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
            )}{" "}
            {recipient.firstName} {recipient.lastName}
          </h4>
        ) : (
          <span className="text-white">Add a friend to start chatting!</span>
        )}
      </div>
    </>
  );
}
