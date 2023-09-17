import React, { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Info from './Info'
import TextEditor from './TextEditor'
import Console from './Console'

const QuestionScreen = () => {
    const location = useLocation()
    const question = location.state

    const editorRef = useRef(null);
    const handleEditorDidMount = (editor ) => {
      editorRef.current = editor;
    }

  return (
    <div className='h-screen flex gap-2 m-1'>
        <Info question={question} />
        <div className="main flex flex-col gap-1 w-2/3">
          <TextEditor onValue={handleEditorDidMount} />
          <Console code={editorRef} question={question} />
        </div>
    </div>
  )
}

export default QuestionScreen
