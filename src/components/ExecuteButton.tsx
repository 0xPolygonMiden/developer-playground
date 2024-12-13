import React from "react";
import { PlayIcon, CheckIcon } from "@heroicons/react/24/outline";
import ClipLoader from "react-spinners/ClipLoader";

export type ButtonState = "normal" | "executing" | "executed";

type ExecuteButtonProps = {
  state: ButtonState;
  onClick: () => void;
};

const ExecuteButton: React.FC<ExecuteButtonProps> = ({ state, onClick }) => {
  const getButtonStyles = (state: ButtonState) => {
    const baseStyles =
      "flex items-center w-34 justify-center px-4 py-2 rounded-lg border-black text-base font-semibold";
    switch (state) {
      case "normal":
        return `${baseStyles} border bg-purplec-800 border-purplec-500 text-white hover:bg-purplec-500 transition-colors duration-300`;
      case "executing":
        return `${baseStyles} bg-[#1C1A22] text-purplec-400`;
      case "executed":
        return `${baseStyles} bg-[#1C1A22] text-[#21B732]`;
    }
  };

  return (
    <button
      className={getButtonStyles(state)}
      onClick={onClick}
      disabled={state !== "normal"}
    >
      {state === "normal" && (
        <>
          Execute{" "}
          <PlayIcon strokeWidth={2} className="ml-2 h-5 w-5 flex-shrink-0" />
        </>
      )}
      {state === "executing" && (
        <>
          Executing
          <ClipLoader
            color="#7371EE"
            loading={true}
            size={18}
            speedMultiplier={0.75}
            className="ml-2"
          />
        </>
      )}
      {state === "executed" && (
        <>
          Executed{" "}
          <CheckIcon strokeWidth={2} className="ml-2 h-5 w-5 flex-shrink-0" />
        </>
      )}
    </button>
  );
};

export default ExecuteButton;
