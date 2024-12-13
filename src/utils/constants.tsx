export const exampleInput = `{
    "operand_stack": ["0"],
    "advice_stack": ["0"]
}`;

export const exampleCode = `# This is a basic program that pushes 1 and 2 onto the stack and adds them.
# The result is then pushed onto the stack.

begin
  push.1
  push.2
  add
end`;

export const defaultAccountCode = `
use.miden::account
use.std::sys

export.custom
    push.1 drop
end

export.custom_set_item
    exec.account::set_item
    exec.sys::truncate_stack
end
`;

export const defaultTransactionScript = `
begin
    call.::miden::contracts::auth::basic::auth_tx_rpo_falcon512
end
`;

export const defaultBasicWallet = `
export.::miden::contracts::wallets::basic::receive_asset
export.::miden::contracts::wallets::basic::create_note
export.::miden::contracts::wallets::basic::move_asset_to_note
`;

export const defaultBasicAuthentication = `export.::miden::contracts::auth::basic::auth_tx_rpo_falcon512`;

export const emptyOutput = "\n \n \n \n \n \n \n \n";

export const LOCAL_STORAGE = {
  MIDEN_CODE: "miden_code",
  NOTE_SCRIPT_CODE: "note_script_code",
  NOTE_INPUT_CODE: "note_input_code",
  TRANSACTION_SCRIPT_CODE: "transaction_script_code",
  SELECTED_EXAMPLE_ITEM: "selected_example_item",
  MIDEN_CODE_SIZE: "miden_code_size",
  CODE_UPLOAD_CONTENT: "code_upload_content",
  JSON_EDITOR_VISIBLE: "json_editor_visible",
  ADVICE_VALUE: "advice_value",
  OPERAND_VALUE: "operand_value",
  INPUT_STRING: "input_string",
  ONBOARDING_SHOWN: "onboarding_shown",
  SELECTED_ACCOUNT_CODE: "selected_account_code",
  SELECTED_NOTE_SCRIPT: "selected_note_script",
  ACCOUNT_CODE: "account_code",
};

export const NOTE_SCRIPT_TAB = "Note Script";
export const NOTES_INPUT_TAB = "Notes Input";
export const TRANSACTION_SCRIPT_TAB = "Transaction Script";

export const ACCOUNT_CODE_TAB = "Account Code";
export const BASIC_WALLET_CODE_TAB = "Wallet Code";
export const AUTHENTICATION_CODE_SCRIPT_TAB = "Authentication Code";
