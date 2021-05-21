import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Popover } from 'antd';

import { convertFromRaw, convertToRaw, EditorState, RawDraftContentState } from 'draft-js';

import Editor from '@draft-js-plugins/editor';
import createMentionPlugin from '@draft-js-plugins/mention';

import { MentionBox } from '../../styles';
import { decodeEditorState } from './serializer';
import { PopoverContent } from './common-components';

interface Props {
  rawEditorState: string,
  sendToJson: (root: string, jsonObj: object) => void,
}

export function ReadWithMentions (props: Props) {
  const ref = useRef<Editor>(null);

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  useEffect(() => {
    if (props.rawEditorState) {
      const rawData = decodeEditorState(JSON.parse(props.rawEditorState))
      setEditorState(EditorState.createWithContent(convertFromRaw(rawData as RawDraftContentState)))
    }
  }, [props.rawEditorState])

  const plugins = useMemo(() => {
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

    return [mentionPlugin]
  }, [])

  return (
    <MentionBox style={{'--bg-color': 'ivory'} as React.CSSProperties}>
      <div className="charcount">
        <b>Char Count: </b><i>{props.rawEditorState.length}</i>
      </div>
      <div className="editor">
        <Editor
          editorKey={'editor'}
          editorState={editorState}
          onChange={setEditorState}
          readOnly={true}
          plugins={plugins}
          ref={ref}
        />
      </div>
      <div className="controls">
        <button onClick={() => props.sendToJson('raw_editor_state', convertToRaw(editorState.getCurrentContent()))}>Show EditorState</button>
        <button onClick={() => props.sendToJson('json_from_server', JSON.parse(props.rawEditorState))}>Show JSON Source</button>
      </div>
    </MentionBox>
  )
}
