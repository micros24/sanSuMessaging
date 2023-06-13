// interface Props {
//   onSend: () => void;
// }
// { onSend }: Props

function ChatMessage() {
  return (
    <div>
      <div className="input-group mb-3">
        <input
          id="chatMessageMessage"
          type="text"
          className="form-control"
          placeholder="Aa"
          aria-label="Aa"
          aria-describedby="btnSend"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              // onSend();
            }
          }}
        />
        <button
          className="btn btn-success text-light"
          type="button"
          id="btnSend"
          onClick={() => {
            // onSend();
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatMessage;
