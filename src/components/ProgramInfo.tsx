import { truncateText } from "../utils/helper_functions";

export interface ProgramInfoInterface {
  program_hash?: string;
  cycles?: number | null;
  trace_len?: number | null;
  error?: string;
}

type ProgramInfoProps = {
  programInfo: ProgramInfoInterface;
};

const ProgramInfo: React.FC<ProgramInfoProps> = ({ programInfo }) => (
  <div className="flex flex-col w-full h-full overflow-hidden">
    <h1 className="text-left text-white text-base font-semibold">
      Program Info
    </h1>
    <div className="flex flex-col w-full border border-grey-500 rounded-lg p-4 bg-grey-600 mt-2">
      <p className="text-left text-white text-xs font-semibold">
        Program Hash:
      </p>
      <p className="text-left text-gray-400 mt-2 mb-8 text-xs font-normal break-words">
        {programInfo.program_hash}
      </p>
      <div className="h-px bg-grey-500"></div>

      <div className="flex flex-col md:flex-row mt-4">
        <p className="text-left text-gray-400 text-sm font-normal">
          Cycles ⸱{" "}
          <span className="text-white text-xs font-normal ml-1">
            {programInfo.cycles ?? "N/A"}
          </span>
        </p>
        <p className="text-left text-gray-400 text-xs font-normal ml-40">
          Trace Length ⸱{" "}
          <span className="text-white ml-1">
            {programInfo.trace_len ?? "N/A"}
          </span>
        </p>
      </div>
    </div>
  </div>
);

export default ProgramInfo;
