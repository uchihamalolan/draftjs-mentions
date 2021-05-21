import React from 'react';
import { MentionData } from "@draft-js-plugins/mention";

/**
 * React Element to show on hovering over mentiontext
 * @param mention The actual Mention data
 * @returns ReactElement
 */
export function PopoverContent(mention: MentionData) {
  return (<>
    <p>ID: {mention.id}</p>
    <p>Name: {mention.name}</p>
  </>)
}
