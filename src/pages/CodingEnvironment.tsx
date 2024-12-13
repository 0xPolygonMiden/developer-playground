import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { isMobile } from "mobile-device-detect";
import DropDown from "../components/DropDown";
import MidenEditor from "../components/MidenCode";
import { getNoteScriptExample } from "../utils/helper_functions";
import {
  LOCAL_STORAGE,
  emptyOutput,
  exampleCode,
  exampleInput,
  defaultAccountCode,
  NOTE_SCRIPT_TAB,
  NOTES_INPUT_TAB,
  TRANSACTION_SCRIPT_TAB,
  defaultTransactionScript,
  ACCOUNT_CODE_TAB,
  BASIC_WALLET_CODE_TAB,
  AUTHENTICATION_CODE_SCRIPT_TAB,
  defaultBasicWallet,
  defaultBasicAuthentication,
} from "../utils/constants";
import { ProgramInfoInterface } from "../components/ProgramInfo";
import InfoSectionLayout from "./InfoSectionLayout";
import AccountDropDown from "../components/AccountDropDown";
import MidenJsonInputs from "../components/MidenJsonInputs";
import ExecuteButton, { ButtonState } from "../components/ExecuteButton";
import init, { execute, Outputs } from "miden-wasm";
import { toast } from "react-toastify";
import { AccountInfoInterface } from "../components/AccountInfo";
import { AssetInfoInterface } from "../components/AssetsInfo";
import { StorageInfoInterface } from "../components/StorageInfo";

export default function CodingEnvironment(): JSX.Element {
  const [inputs, setInputs] = useState(
    getLocalStorageValue(LOCAL_STORAGE.INPUT_STRING, exampleInput)
  );
  const [buttonState, setButtonState] = useState<ButtonState>("normal");
  const [executionResult, setExecutionResult] = useState<Outputs | null>(null);

  const [noteScriptCode, setNoteScriptCode] = useState("");
  const [noteInputCode, setNoteInputCode] = useState([
    "10376293541461622847",
    "",
    "",
    "",
  ]);
  const [transactionScriptCode, setTransactionScriptCode] = useState(
    defaultTransactionScript
  );
  const [accountCode, setAccountCode] = useState(defaultAccountCode);
  const [basicWalletCode, setBasicWalletCode] = useState(defaultBasicWallet);
  const [authenticationCode, setAuthenticationCode] = useState(
    defaultBasicAuthentication
  );

  const scriptTabs = [NOTE_SCRIPT_TAB, NOTES_INPUT_TAB, TRANSACTION_SCRIPT_TAB];
  const codeTabs = [
    ACCOUNT_CODE_TAB,
    BASIC_WALLET_CODE_TAB,
    AUTHENTICATION_CODE_SCRIPT_TAB,
  ];

  const [activeTab, setActiveTab] = useState(scriptTabs[0]);
  const [activeCodeTab, setActiveCodeTab] = useState(codeTabs[0]);
  const [output, setOutput] = useState(emptyOutput);
  const [codeSize, setCodeSize] = useState(12);
  const [programInfo, setProgramInfo] = useState<ProgramInfoInterface>({
    program_hash: "",
    cycles: 0,
    trace_len: 0,
    error: undefined,
  });

  const [accountInfo, setAccountInfo] = useState<AccountInfoInterface>({
    account_id: "10376293541461622847",
    account_hash: "",
    type: "Regular Account",
    storage_mode: "Off-chain",
    code_commitment: "",
    vault_root: "",
    storage_root: "",
    nonce: 0,
  });

  const [assetsInfo, setAssetsInfo] = useState<AssetInfoInterface>({
    asset_type: "",
    faucet_id: "",
    amount: 0,
  });

  const [storageInfo, setStorageInfo] = useState<StorageInfoInterface>({
    slot_index: 0,
    slot_type: "",
    value: "",
  });

  const [wasmLoaded, setWasmLoaded] = useState(false); // Track WASM loading state
  const [hashValue, setHashValue] = useState("");
  const [resultOutput, setResultOutput] = useState(null);

  function getLocalStorageValue(key: string, initialValue: string): string {
    const value = localStorage.getItem(key);
    return value ?? initialValue;
  }

  useLayoutEffect(() => {
    const savedNoteScriptCode = localStorage.getItem(
      LOCAL_STORAGE.NOTE_SCRIPT_CODE
    );
    const savedCodeSize = localStorage.getItem(LOCAL_STORAGE.MIDEN_CODE_SIZE);

    if (savedNoteScriptCode) {
      setNoteScriptCode(savedNoteScriptCode);
    }
    if (savedCodeSize) {
      setCodeSize(Number(savedCodeSize));
    }
  }, []);

  useEffect(() => {
    const initializeWasm = async () => {
      try {
        await init(); // Initialize WebAssembly
        setWasmLoaded(true); // Set to true when WASM is successfully loaded
      } catch (error) {
        console.error("Failed to initialize WASM module:", error);
      }
    };

    initializeWasm();
  }, []);

  const handleSelectChange = async (scriptChange: string) => {
    setOutput(emptyOutput);
    localStorage.setItem(LOCAL_STORAGE.SELECTED_NOTE_SCRIPT, scriptChange);

    const script_code = await getNoteScriptExample(scriptChange);
    setNoteScriptCode(script_code);
  };

  const handleAccountCodeOptionChange = async (newSelectedValue: string) => {
    localStorage.setItem(LOCAL_STORAGE.SELECTED_ACCOUNT_CODE, newSelectedValue);
  };

  const handleNoteScriptCodeChange = (newCodeString: string) => {
    try {
      const parsedData = JSON.parse(newCodeString);
      setNoteInputCode(parsedData);
    } catch (error) {
      console.error("Invalid JSON input:", error);
    }
  };

  function parseVaultData(vaultString: string | null | undefined) {
    const assetInfo = {
      asset_type: "Fungible Token",
      faucet_id: "",
      amount: 0,
    };

    if (!vaultString) {
      return assetInfo;
    }

    const fungibleMatch = /AccountId\((\d+)\):\s*(\d+)/.exec(vaultString);

    if (fungibleMatch) {
      assetInfo.faucet_id = fungibleMatch[1];
      assetInfo.amount = parseInt(fungibleMatch[2], 10);
    }

    return assetInfo;
  }

  useEffect(() => {
    setProgramInfo({
      program_hash: executionResult?.account_code_commitment,
      cycles: executionResult?.cycle_count,
      trace_len: executionResult?.trace_length,
    });

    setAccountInfo({
      account_id: "10376293541461622847",
      account_hash: executionResult?.account_hash,
      type: "Regular Account",
      storage_mode: "Off-chain",
      code_commitment: executionResult?.account_code_commitment,
      vault_root: executionResult?.account_vault_commitment,
      storage_root: executionResult?.account_storage_commitment,
      nonce: executionResult?.account_delta_nonce,
    });

    setAssetsInfo(parseVaultData(executionResult?.account_delta_vault));

    setStorageInfo({
      slot_index: 0,
      slot_type: "Value",
      value: executionResult?.account_delta_storage,
    });
  }, [executionResult]);

  useEffect(() => {
    if (noteScriptCode) {
      localStorage.setItem(LOCAL_STORAGE.NOTE_SCRIPT_CODE, noteScriptCode);
    }
  }, [noteScriptCode]);

  const handleExecuteClick = () => {
    if (buttonState === "normal" && wasmLoaded) {
      setButtonState("executing");

      setTimeout(() => {
        try {
          const noteInputsBigInt = new BigUint64Array(
            noteInputCode
              .filter((input) => input.trim() !== "")
              .map((input) => BigInt(input))
          );

          const result = execute(
            accountCode,
            noteScriptCode,
            noteInputsBigInt,
            transactionScriptCode
          );

          setExecutionResult(result);
          console.log("result is ", result);

          setButtonState("executed");
          toast.success("Execution Successful!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            closeButton: false,
            className: "custom-toast",
            progressClassName: "custom-toast",
            onClose: () => setButtonState("normal"),
          });
        } catch (error) {
          console.error("Execution failed:", error);
          toast.error("There was an error executing your code", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            closeButton: false,
            className: "custom-toast-error",
            progressClassName: "custom-toast-error",
            onClose: () => setButtonState("normal"),
          });
          setButtonState("normal");
        }
      }, 0);
    }
  };

  return (
    <div className="bg-black h-full w-full overflow-y-hidden">
      <div className="flex flex-col lg:flex-row w-full h-full overflow-y-auto">
        <div className="flex flex-col h-fit overflow-scroll bg-grey-900 lg:px-8 px-6 pt-4 sm:h-full w-full lg:w-1/2">
          <h1 className="text-left text-lg text-white font-semibold mt-3 mb-3">
            Scripts
          </h1>
          <div className="flex flex-col bg-grey-500 pl-3 pr-3 pb-4 h-72 rounded-lg border border-grey-400">
            <div className="h-14 flex items-center py-2">
              <div className="flex space-x-2">
                {scriptTabs.map((tab) => (
                  <p
                    key={tab}
                    className={`text-sm py-1 px-2 rounded-2xl cursor-pointer ${
                      activeTab === tab
                        ? "bg-[#413B4D] text-white font-semibold"
                        : "text-zinc-400 hover:bg-zinc-800 hover:text-white font-semibold"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </p>
                ))}
              </div>
              <div className="ml-auto example-drop-down">
                {activeTab === NOTE_SCRIPT_TAB && (
                  <DropDown onExampleValueChange={handleSelectChange} />
                )}
              </div>
            </div>

            <div className="bg-grey-800 h-full rounded-lg border-grey-400">
              {activeTab === NOTE_SCRIPT_TAB && (
                <MidenEditor
                  value={noteScriptCode}
                  codeSize={codeSize}
                  onChange={setNoteScriptCode}
                />
              )}
              {activeTab === NOTES_INPUT_TAB && (
                <MidenJsonInputs
                  value={JSON.stringify(noteInputCode, null, 2)}
                  onChange={handleNoteScriptCodeChange}
                />
              )}
              {activeTab === TRANSACTION_SCRIPT_TAB && (
                <MidenEditor
                  value={transactionScriptCode}
                  codeSize={codeSize}
                  onChange={setTransactionScriptCode}
                />
              )}
            </div>
          </div>

          <h1 className="text-left text-lg text-white font-semibold mt-6 mb-3">
            Account Code
          </h1>

          <div className="flex flex-col bg-grey-500 pl-3 pr-3 pb-4 h-72 rounded-lg border border-grey-400">
            <div className="h-14 flex items-center py-2 px-4">
              <div className="flex space-x-2">
                {codeTabs.map((tab) => (
                  <p
                    key={tab}
                    className={`text-sm py-1 px-2 rounded-2xl cursor-pointer ${
                      activeCodeTab === tab
                        ? "bg-[#413B4D] text-white font-semibold"
                        : "text-zinc-400 hover:bg-zinc-800 hover:text-white font-semibold"
                    }`}
                    onClick={() => setActiveCodeTab(tab)}
                  >
                    {tab}
                  </p>
                ))}
              </div>
              <div className="ml-auto example-drop-down">
                {activeCodeTab === ACCOUNT_CODE_TAB && (
                  <AccountDropDown
                    onValueChange={handleAccountCodeOptionChange}
                  />
                )}
              </div>
            </div>

            <div className="bg-grey-800 h-full rounded-lg border-grey-400">
              {activeCodeTab === ACCOUNT_CODE_TAB && (
                <MidenEditor
                  value={accountCode}
                  codeSize={codeSize}
                  onChange={setAccountCode}
                />
              )}
              {activeCodeTab === BASIC_WALLET_CODE_TAB && (
                <MidenEditor
                  value={basicWalletCode}
                  editable={false}
                  codeSize={codeSize}
                  onChange={setBasicWalletCode}
                />
              )}
              {activeCodeTab === AUTHENTICATION_CODE_SCRIPT_TAB && (
                <MidenEditor
                  value={authenticationCode}
                  editable={false}
                  codeSize={codeSize}
                  onChange={setAuthenticationCode}
                />
              )}
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <ExecuteButton state={buttonState} onClick={handleExecuteClick} />
          </div>

          <div className="w-full block sm:hidden">
            <InfoSectionLayout
              programInfo={programInfo}
              accountInfo={accountInfo}
              assetsInfo={assetsInfo}
              storageInfo={storageInfo}
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 hidden sm:block">
          <InfoSectionLayout
            programInfo={programInfo}
            accountInfo={accountInfo}
            assetsInfo={assetsInfo}
            storageInfo={storageInfo}
          />
        </div>
      </div>
    </div>
  );
}
