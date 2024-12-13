import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { LOCAL_STORAGE } from "../utils/constants";

const options = ["default"];

function classExamples(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type AccountDropDownProps = {
  onValueChange?: (newType: string) => void;
};

export default function AccountDropDown({
  onValueChange,
}: AccountDropDownProps): JSX.Element {
  const [selected, setSelected] = useState(
    localStorage.getItem(LOCAL_STORAGE.SELECTED_ACCOUNT_CODE) ?? options[0]
  );

  useEffect(() => {
    if (!localStorage.getItem(LOCAL_STORAGE.ACCOUNT_CODE)) {
      onValueChange?.(selected);
    }
  }, []);

  return (
    <Listbox
      value={selected}
      onChange={(value) => {
        onValueChange?.(value);
        setSelected(value);
      }}
    >
      {({ open }) => (
        <>
          <div className="relative flex-grow sm:flex-grow-0 ml-auto sm:mb-0">
            <Listbox.Button className="relative hover:bg-[#423b4e] cursor-pointer text-zinc-400 hover:text-white rounded-2xl py-1 pl-3 pr-10 text-left shadow-sm focus:outline-non sm:text-sm">
              <span className="block truncate max-w-xs text-sm sm:max-w-none capitalize">
                {selected}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon className="h-3 w-3 stroke-purplec-400 stroke-2" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-primary py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option}
                    className={({ active }) =>
                      classExamples(
                        active ? "text-accent-1 bg-secondary-8" : "text-white",
                        "relative cursor-pointer select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={option}
                    data-testid="select-option"
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={classExamples(
                            selected
                              ? "font-semibold text-purplec-400"
                              : "font-normal text-white",
                            "block truncate capitalize"
                          )}
                        >
                          {option}
                        </span>

                        {selected ? (
                          <span
                            className={classExamples(
                              "absolute inset-y-0 right-0 flex items-center pr-4 text-purplec-400"
                            )}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
