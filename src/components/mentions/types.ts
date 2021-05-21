export interface RawData {
  blocks: Array<Block>,
  entityMap: Record<string, Entity> 
}
export interface Block {
  key?: string,
  text: string,
  type?: "unstyled",
  depth?: 0,
  inlineStyleRanges?: [],
  entityRanges?: Array<EntityRange>
  data?: {}
}
export interface EntityRange {
  offset: number,
  length: number,
  key: number
}
export interface Entity {
  type?: "mention",
  mutability?: "IMMUTABLE",
  data?: EntityData 
}
export interface EntityData {
  mention: { name: string, id: number }
}


/* ENCODED JSON TYPE-DEF*/
export interface RawTrimmedData {
  b: Array<TrimmedBlock>
  i: Array<number>
}
export interface TrimmedBlock {
  t: string,
  e?: Array<TrimmedEntityRange>
}
export interface TrimmedEntityRange {
  o: number,
  l: number,
  k: number
}
