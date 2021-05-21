import styled from "styled-components";

export const MentionBox = styled.div`
  --bg-color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  .editor {
    flex-grow: 1;
    border: 1px solid darksalmon;
    padding: 1rem;
    background: var(--bg-color);
  }
  .controls {
    display: flex;
    gap: 1rem;
    button {
      &.render-action {
        margin-left: auto;
      }
    }
  }
  
`
export const AppLayout = styled.div`
  margin: 2rem;
  display: grid;
  grid-gap: 1rem;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "mentionwrite jsonview"
    "mentionread jsonview";
  overflow: auto;
  height: calc(100vh - 4rem);
  width: calc(100% - 4rem);

  .mentions-textbox, .mentions-textread {
    border: 1px solid darkgrey;
    overflow: auto;
  }
  .mentions-textbox {
    grid-area: mentionwrite;
  }
  .mentions-textread {
    grid-area: mentionread;
  }
  .ant-tabs {
    border: 1px solid darkgrey;
    overflow: auto;
    padding: 1rem;
    grid-area: jsonview;
  }
`;
