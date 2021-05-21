import { mentions } from "./mention-data"
import { RawData, RawTrimmedData } from "./types"

/**
 * Function to remove unneeded properties & compress JSON to store in DB
 * @param json JSON String to encode (i.e compress to store in server, trim data that can be derived) 
 * @returns Trimmed Json object
 */
export function encodeEditorState(json: RawData): RawTrimmedData {
  const resJson: RawTrimmedData = {
    b: [],
    i: []
  }

  json.blocks.forEach((block, idx) => {
    resJson.b[idx] = { t: '' }
    resJson.b[idx].t = block.text
    if (block.entityRanges?.length) {
      resJson.b[idx].e = block.entityRanges.map(range => ({ o: range.offset, l: range.length, k: range.key }))
    }
  })

  Object.keys(json.entityMap).forEach(entityKey => {
    let entity = json.entityMap[entityKey]
    entity.data && resJson.i.push(entity.data.mention.id)
  })

  return resJson
}

/**
 * Function to parse JSON from DB & convert it back to ContentState friendly RawData
 * @param jsonObj JSON Obj after Parsing JSON String response from server
 * @returns JSON Obj as RawData which can be used to create ContentState
 */
export function decodeEditorState(jsonObj: RawTrimmedData): RawData {
  let rawData = {} as RawData

  rawData.blocks = jsonObj.b.map((block, index) => {
    return {
      text: block.t,
      key: index.toString(),
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: block.e
        ? block.e.map(entityRange => (
            { offset: entityRange.o, length: entityRange.l, key: entityRange.k }
          ))
        : [],
      data: {}
    }
  })

  let entities: Record<string, object> = {}
  jsonObj.i.forEach((userId, idx) => {
    entities[idx.toString()] = {
      type :"mention",
      mutability :"IMMUTABLE",
      data: {
        mention: mentions[userId]
      }
    }
  })

  rawData.entityMap = entities

  return rawData;
}
