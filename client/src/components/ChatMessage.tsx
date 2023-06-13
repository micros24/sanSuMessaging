// interface Props {
//   onSend: () => void;
// }
// { onSend }: Props

export default function ChatMessage() {
  return (
    <div className="input-group">
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
  );
}
