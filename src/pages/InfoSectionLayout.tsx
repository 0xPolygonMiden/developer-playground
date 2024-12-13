import React from "react";
import ProgramInfo, { ProgramInfoInterface } from "../components/ProgramInfo";
import AccountInfo, { AccountInfoInterface } from "../components/AccountInfo";
import AssetsInfo, { AssetInfoInterface } from "../components/AssetsInfo";
import StorageInfo, { StorageInfoInterface } from "../components/StorageInfo";

interface InfoSectionProps {
  programInfo: ProgramInfoInterface;
  accountInfo: AccountInfoInterface;
  assetsInfo: AssetInfoInterface;
  storageInfo: StorageInfoInterface;
}

const InfoSectionLayout: React.FC<InfoSectionProps> = ({
  programInfo,
  accountInfo,
  assetsInfo,
  storageInfo,
}) => (
  <div className="flex flex-col flex-grow w-full h-full sm:gap-y-12 gap-y-6 pt-4 lg:pt-12 lg:px-10 px-0 lg:mt-0 mt-4">
    <div className="flex">
      <ProgramInfo programInfo={programInfo} />
    </div>

    <div className="flex">
      <AccountInfo accountInfo={accountInfo} />
    </div>

    <div className="flex">
      <AssetsInfo assetsInfo={assetsInfo} />
    </div>

    <div className="flex">
      <StorageInfo storageInfo={storageInfo} />
    </div>
  </div>
);

export default InfoSectionLayout;
