import React, { useCallback, useMemo, useRef, useState } from 'react'
import { Popover } from 'antd';

import { convertToRaw, EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

import createMentionPlugin, { defaultSuggestionsFilter } from '@draft-js-plugins/mention';
import Editor from '@draft-js-plugins/editor';

import { mentions } from './mention-data'
import { MentionBox } from '../../styles';
import { RawData } from './types';
import { encodeEditorState } from './serializer';
import { PopoverContent } from './common-components';

interface Props {
  sendToParent: (readerState: string) => void,
  sendToJson: (root: string, jsonObj: object) => void,
  sendToHTML: (markup: string) => void,
  sendToText: (text: string) => void,
}

export function TextBoxWithMentions(props: Props) {
  const ref = useRef<Editor>(null);

  const mentionsList = useMemo(() => Object.values(mentions), [])

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState(mentionsList);

  const { MentionSuggestions, plugins } = useMemo(() => {
    const mentionPlugin = createMentionPlugin({
      entityMutability: 'IMMUTABLE',
      supportWhitespace: true,
      mentionPrefix: '@',
      mentionComponent(mentionProps) {
        return (
          <Popover content={PopoverContent(mentionProps.mention)} title={mentionProps.mention.name}>
            <span style={{color: '#4a85bb',  textDecoration: 'none'}}>
              {mentionProps.children}
            </span>
          </Popover>
        );
      }
    });

    const plugins = [mentionPlugin],
      { MentionSuggestions } = mentionPlugin;

    return { plugins, MentionSuggestions };
  }, [])

  function sendToParent() {
    const rawState = encodeEditorState(convertToRaw(editorState.getCurrentContent()) as RawData)
    props.sendToParent(JSON.stringify(rawState))
  }

  const onSearchChange = useCallback(({ value }: { value: string }) => {
    setSuggestions(defaultSuggestionsFilter(value, mentionsList));
  }, [])

  return (
    <MentionBox onClick={() => ref.current!.focus()}>
      <div className="editor">
        <Editor
          editorKey={'editor'}
          editorState={editorState}
          onChange={setEditorState}
          plugins={plugins}
          ref={ref}
        />
      </div>
      <MentionSuggestions
        open={open}
        onOpenChange={setOpen}
        suggestions={suggestions}
        onSearchChange={onSearchChange}
      />

      <div className="controls">
        <button onClick={() => props.sendToJson('rawState', convertToRaw(editorState.getCurrentContent()))}>Show EditorState</button>
        <button onClick={() => props.sendToJson('rawState', encodeEditorState(convertToRaw(editorState.getCurrentContent()) as RawData))}>Show Encoded JSON</button>
        <button onClick={() => props.sendToHTML(stateToHTML(editorState.getCurrentContent()))}>Show HTML</button>
        <button onClick={() => props.sendToText(editorState.getCurrentContent().getPlainText())}>Show Text</button>
        <button className="render-action" onClick={() => sendToParent()}>Render Below</button>
      </div>
    </MentionBox>
  )
}
