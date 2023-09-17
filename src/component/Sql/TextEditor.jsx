import { Editor } from '@monaco-editor/react'
import React from 'react'

const TextEditor = ({ onValue }) => {
  return (
    <div className='border-1 rounded p-3 overflow-auto pt-6'>
      <Editor 
        height={500}
        width="100%"
        values={"/* Write your MY-SQL query statement below */"}
        language={'mysql'} 
            onMount={onValue}
            options={{
              inlineSuggest: true,
              setLanguage: 'mysql',
              fontSize: "16px",
              formatOnType: true,
              autoClosingBrackets: true,
              minimap: { scale: 15 },
        }}
        />
    </div>
  )
}

export default TextEditor
