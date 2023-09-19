import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Info from "./Question/Info";
import { Editor } from "@monaco-editor/react";

import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Console from "./Question/Console";


const Question = () => {
  const location = useLocation();
  const question = location.state;

  const [language, setLanguage] = useState("Cpp");
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor ) => {
    editorRef.current = editor;
  }

  return (
    <div className="flex gap-1 m-1 " style={{height:"950px"}}>
      <Info info={question} />
      <main className="flex flex-col gap-1 w-2/3">
        <div className="editor p-2 border-2 rounded overflow-auto w-full h-1/2">
          <div className="upperMenu flex justify-between p-2 m-1 ">
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                {language}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => setLanguage("C")}>C</MenuItem>
                <MenuItem onClick={() => setLanguage("Cpp")}>Cpp</MenuItem>
                <MenuItem onClick={() => setLanguage("Java")}>Java</MenuItem>
                <MenuItem onClick={() => setLanguage("Python")}>
                  Python
                </MenuItem>
                <MenuItem onClick={() => setLanguage("Javascript")}>
                  Javascript
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
          <Editor
            language={language.toLowerCase()}
            value={question[language]} 
            onMount={handleEditorDidMount}
            options={{
              inlineSuggest: true,
              setLanguage: language,
              fontSize: "16px",
              formatOnType: true,
              autoClosingBrackets: true,
              minimap: { scale: 0 },
            }}
          />
        </div>
        <div className="consoleWindow  border-2 rounded " style={{ background: "#fff" }}>
          <Console question={question} code={editorRef} language={language} />
        </div>
      </main>
    </div>
  );
};

export default Question;
