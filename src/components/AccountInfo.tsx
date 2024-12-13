import { truncateText } from "../utils/helper_functions";

export interface AccountInfoInterface {
  account_id?: string;
  account_hash?: string;
  type?: string;
  storage_mode?: string;
  code_commitment?: string;
  vault_root?: string;
  storage_root?: string;
  nonce?: number | null;
}

type AccountInfoProps = {
  accountInfo: AccountInfoInterface;
};

const AccountInfo: React.FC<AccountInfoProps> = ({ accountInfo }) => (
  <div className="flex flex-col w-full h-full overflow-hidden">
    <h2 className="text-left text-white text-base font-semibold">
      Account Info
    </h2>
    <div className="overflow-x-auto mt-2">
      <table
        className="w-full text-sm border-separate"
        style={{ borderSpacing: "0" }}
      >
        <thead className="text-white text-xs font-semibold bg-grey-900">
          <tr>
            <th className="p-2 text-left border rounded-tl-lg border-grey-500">
              Account ID
            </th>
            <th className="p-2 text-left border border-grey-500">
              Account Hash
            </th>
            <th className="p-2 text-left border border-grey-500">Type</th>
            <th className="p-2 text-left border rounded-tr-lg border-grey-500">
              Storage Mode
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-white">
            <td className="p-2 text-xs border border-grey-600">
              {truncateText(accountInfo.account_id || "N/A")}
            </td>
            <td className="p-2 text-xs border border-grey-600">
              {truncateText(accountInfo.account_hash || "N/A")}
            </td>
            <td className="p-2 text-xs border border-grey-600">
              {truncateText(accountInfo.type || "N/A")}
            </td>
            <td className="p-2 text-xs border border-grey-600">
              {accountInfo.storage_mode || "N/A"}
            </td>
          </tr>
        </tbody>
      </table>

      <table
        className="w-full text-sm border-separate mt-4"
        style={{ borderSpacing: "0" }}
      >
        <thead className="text-white text-xs font-semibold bg-grey-900">
          <tr>
            <th className="p-2 text-left border rounded-tl-lg border-grey-500">
              Code Commitment
            </th>
            <th className="p-2 text-left border border-grey-500">Vault Root</th>
            <th className="p-2 text-left border border-grey-500">
              Storage Root
            </th>
            <th className="p-2 text-left border rounded-tr-lg border-grey-500">
              Nonce
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-white">
            <td className="p-2 border text-xs border-grey-600">
              {truncateText(accountInfo.code_commitment || "N/A")}
            </td>
            <td className="p-2 border text-xs border-grey-600">
              {truncateText(accountInfo.vault_root || "N/A")}
            </td>
            <td className="p-2 border text-xs border-grey-600">
              {truncateText(accountInfo.storage_root || "N/A")}
            </td>
            <td className="p-2 border text-xs border-grey-600">
              {accountInfo.nonce !== null && accountInfo.nonce !== undefined
                ? accountInfo.nonce
                : "N/A"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default AccountInfo;
