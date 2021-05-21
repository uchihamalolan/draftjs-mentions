import React, { useState } from 'react'

import { ReadWithMentions } from './components/mentions/MentionRead'
import { TextBoxWithMentions } from './components/mentions/Mentions'

import ReactJson from 'react-json-view'
import { AppLayout } from './styles'

import { Tabs } from 'antd'
const { TabPane } = Tabs

const jsonRenderCofings = {
  enableClipboard: false,
  displayDataTypes: false
}

function App() {
  const [readerState, setReaderState] = useState('')
  const [jsonObj, setJsonObj] = useState<object>({})
  const [markup, setMarkup] = useState('')
  const [jsonRoot, setJsonRoot] = useState('')
  const [text, setText] = useState('')
  const [activeKey, setActiveKey] = useState("1")

  function sendToJson(rootName: string, jsonObj: object) {
    setJsonRoot(rootName)
    setJsonObj(jsonObj)
    setActiveKey("1")
  }
  function sendToHTML(markup: string) {
    setMarkup(markup)
    setActiveKey("2")
  }
  function sendToText(text: string) {
    setText(text)
    setActiveKey("3")
  }

  return (
    <div className="App">
      <AppLayout>
        <div className="mentions-textbox">
          <TextBoxWithMentions sendToParent={setReaderState} sendToJson={sendToJson} sendToHTML={sendToHTML} sendToText={sendToText}/>
        </div>
        <div className="mentions-textread">
          <ReadWithMentions rawEditorState={readerState} sendToJson={sendToJson} />
        </div>
        <Tabs activeKey={activeKey} onChange={setActiveKey}>
          <TabPane tab="JSON" key="1">
            <div className="jsonview">
            <div className="summary">
              <b>Char Count:</b><i>{JSON.stringify(jsonObj).length}</i>
            </div>
              <ReactJson src={jsonObj} name={jsonRoot} {...jsonRenderCofings}/>
            </div>
          </TabPane>
          <TabPane tab="HTML" key="2">
            <div className="htmlview">
              {markup}
            </div>
          </TabPane>
          <TabPane tab="Text" key="3">
            <div className="textView">
              {text}
            </div>
          </TabPane>
        </Tabs>
        
      </AppLayout>
    </div>
  )
}

export default App
