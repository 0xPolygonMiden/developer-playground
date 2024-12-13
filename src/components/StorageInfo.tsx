import { truncateText } from "../utils/helper_functions";

export interface StorageInfoInterface {
  slot_index?: number | null;
  slot_type?: string;
  value?: string;
}

type StorageInfoProps = {
  storageInfo: StorageInfoInterface;
};

const StorageInfo: React.FC<StorageInfoProps> = ({ storageInfo }) => (
  <div className="flex flex-col w-full h-full overflow-hidden">
    <h2 className="text-left text-white text-base font-semibold">
      Storage Info
    </h2>
    <div className="overflow-x-auto mb-8 mt-2">
      <table
        className="w-full text-sm border-separate"
        style={{ borderSpacing: "0" }}
      >
        <thead className="text-white text-xs font-semibold bg-grey-900">
          <tr>
            <th className="p-2 text-left border rounded-tl-lg border-grey-500">
              Slot Index
            </th>
            <th className="p-2 text-left border border-grey-500">Slot Type</th>
            <th className="p-2 text-left border rounded-tr-lg border-grey-500">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-white">
            <td className="p-2 border text-xs border-grey-600">
              {storageInfo.slot_index ?? "N/A"}
            </td>
            <td className="p-2 border text-xs border-grey-600">
              {truncateText(storageInfo.slot_type || "N/A")}
            </td>
            <td className="p-2 border text-xs border-grey-600">
              {truncateText(storageInfo.value || "N/A")}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default StorageInfo;
