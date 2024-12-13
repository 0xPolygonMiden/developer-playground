import CodeMirror from "@uiw/react-codemirror";
import { createTheme } from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";
import { forwardRef, useCallback } from "react";
import { StreamLanguage } from "@codemirror/language";
import { c } from "@codemirror/legacy-modes/mode/clike";

type MidenCodeProps = {
  value: string;
  codeSize: number;
  onChange: (value: string) => void;
  editable?: boolean;
};

const codeTheme = createTheme({
  theme: "dark",
  settings: {
    background: "#0B090D",
    foreground: "#f8f8f2",
    caret: "#f8f8f0",
    selection: "#44475a",
    selectionMatch: "#44475a",
    lineHighlight: "#24202F",
    gutterBackground: "#141318",
    gutterForeground: "#569CD6",
  },
  styles: [
    { tag: t.comment, color: "#6272a4" },
    { tag: t.keyword, color: "#569CD6" },
    { tag: t.string, color: "#f1fa8c" },
    { tag: t.number, color: "#CB694A" },
    { tag: t.operator, color: "#ffb86c" },
    { tag: t.variableName, color: "#569CD6" },
    { tag: t.className, color: "#ff79c6" },
    { tag: t.definition(t.typeName), color: "#569CD6" },
    { tag: t.typeName, color: "#8be9fd" },
    { tag: t.angleBracket, color: "#f8f8f2" },
    { tag: t.tagName, color: "#ff79c6" },
    { tag: t.attributeName, color: "#ffb86c" },
  ],
});

const extensions = [StreamLanguage.define(c)];

const MidenCode = forwardRef<HTMLDivElement, MidenCodeProps>(
  ({ value, codeSize, onChange, editable = true }, ref) => {
    const handleChange = useCallback(
      (newValue: string) => {
        onChange(newValue);
      },
      [onChange]
    );

    return (
      <div
        className="flex flex-col w-full font-mono rounded-lg overflow-auto miden-code-layout"
        ref={ref}
      >
        <CodeMirror
          value={value}
          theme={codeTheme}
          editable={editable}
          extensions={extensions}
          onChange={handleChange}
          basicSetup={{
            foldGutter: true,
            highlightActiveLineGutter: true,
            dropCursor: true,
            allowMultipleSelections: false,
            indentOnInput: true,
            lineNumbers: true,
            syntaxHighlighting: true,
            bracketMatching: true,
            autocompletion: true,
            highlightActiveLine: true,
          }}
          style={{
            fontSize: `${codeSize}px`,
            fontFamily: "'DM Mono', monospace",
          }}
          className={`grow overflow-auto max-h-60 font-mono`}
        />
      </div>
    );
  }
);

export default MidenCode;
