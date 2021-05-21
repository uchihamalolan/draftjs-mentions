# draftjs-mentions
A POC for Implementing mentions with DraftJS &amp; DraftJS Plugins. (Including storing and fetching from server with the same state)

## Uses the Following
- [DraftJs](https://draftjs.org/) for Rich Text Handling
- [DraftJS Plugin Mentions](https://www.draft-js-plugins.com/plugin/mention) for mentions decorators
- [Ant design](https://ant.design/components/popover) for implementing Pop-overs
- [StyledComponents](https://styled-components.com/) for general styling

## Approach

**Write**
- Convert `ContentState` to `RawData`
- Strip unnecessary properties from `RawData` (function inside serializer folder)
- Save the JSON as string in backend

**Read**
- Use `Editor` with `readOnly={true}` for displaying notes/comments/posts with "mentions"
- Fetch JSON String from Server (DB)
- Parse and build back the `RawData` (to feed to ContentState via `convertFromRaw`)
- Create ContentState and initialize EditorState with it


## This Project is built using [Vite](https://vitejs.dev/)
