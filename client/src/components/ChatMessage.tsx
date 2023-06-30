interface Props {
  onMessageSend: () => void;
}

export default function ChatMessage({ onMessageSend }: Props) {
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
            onMessageSend();
          }
        }}
      />
      <button
        className="btn btn-success text-light"
        type="button"
        id="btnSend"
        onClick={() => {
          onMessageSend();
        }}
      >
        Send
      </button>
    </div>
  );
}
