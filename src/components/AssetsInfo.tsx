import { truncateText } from "../utils/helper_functions";

export interface AssetInfoInterface {
  asset_type?: string;
  faucet_id?: string;
  amount?: number | null;
}

type AssetsInfoProps = {
  assetsInfo: AssetInfoInterface;
};

const AssetsInfo: React.FC<AssetsInfoProps> = ({ assetsInfo }) => (
  <div className="flex flex-col w-full h-full overflow-hidden">
    <h2 className="text-left text-white text-base font-semibold">
      Assets Info
    </h2>
    <div className="overflow-x-auto mt-2">
      <table
        className="w-full text-sm border-separate"
        style={{ borderSpacing: "0" }}
      >
        <thead className="text-white text-xs font-semibold bg-grey-900">
          <tr>
            <th className="p-2 text-left border rounded-tl-lg border-grey-500">
              Asset Type
            </th>
            <th className="p-2 text-left border border-grey-500">Faucet ID</th>
            <th className="p-2 text-left border rounded-tr-lg border-grey-500">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-white">
            <td className="p-2 border text-xs border-grey-600">
              {assetsInfo.asset_type || "N/A"}
            </td>
            <td className="p-2 border text-xs border-grey-600">
              {assetsInfo.faucet_id || "N/A"}
            </td>
            <td className="p-2 border text-xs border-grey-600">
              {assetsInfo.amount ?? "N/A"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default AssetsInfo;
