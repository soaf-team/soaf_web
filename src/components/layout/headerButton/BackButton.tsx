import { useFlow } from "@/stackflow";

interface Props {
  onClick?: () => void;
}

export const BackButton = ({ onClick }: Props) => {
  const { pop } = useFlow();

  const handleBackClick = () => {
    if (onClick) {
      onClick();
    } else {
      pop();
    }
  };

  return (
    <button type="button" onClick={handleBackClick}>
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
};
