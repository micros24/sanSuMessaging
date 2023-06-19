interface Props {
  onAccountClick: () => void;
}

export default function SideBarTop({ onAccountClick }: Props) {
  return (
    <div>
      <a href="#" className="link-light mx-3" onClick={onAccountClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-person-circle"
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          <path
            fillRule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
          />
        </svg>
      </a>
      <a
        href="#"
        className="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
        onClick={onAccountClick}
      >
        TODO:AccountName
      </a>
    </div>
  );
}
