import { useState, useEffect } from "react";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromHTML,
  Modifier,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { stateFromHTML } from "draft-js-import-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function uploadImageCallBack(file) {
  return new Promise(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
      xhr.open('POST', 'https://api.imgur.com/3/image');
      xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
      const data = new FormData(); // eslint-disable-line no-undef
      data.append('image', file);
      xhr.send(data);
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    },
  );
}

const WSIWYGEditor = ({ raw, onChangeRaw }) => {
  // console.log("console log nya raw", raw);
  const [editorState, setEditorState] = useState(
    raw === undefined || raw === ""
      ? () => {
          EditorState.createEmpty();
        }
      : EditorState.createWithContent(stateFromHTML(raw))
  );
  const [rawHTML, setRawHTML] = useState("");

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setRawHTML(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  // useEffect(() => {
  //   console.log("console log nya rawHTML", rawHTML);
  //   return () => {};
  // }, [rawHTML]);

  // ================== START FUNCTION CLICK TAB EQUALS FEW SPACES ==================
  const tabCharacter = "    ";

  const handleTab = (e) => {
    e.preventDefault();

    let currentState = editorState;
    let newContentState = Modifier.replaceText(
      currentState.getCurrentContent(),
      currentState.getSelection(),
      tabCharacter
    );

    setEditorState(
      EditorState.push(currentState, newContentState, "insert-characters")
    );
  };

  return (
    <>
      <Editor
        onTab={handleTab}
        // initialContentState={contentState}
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onChange={() => {
          onChangeRaw(rawHTML)
        }}
        onEditorStateChange={onEditorStateChange}
        // onContentStateChange={onContentStateChange}
        toolbar={{
          options: [
            "fontFamily",
            "fontSize",
            "inline",
            "blockType",
            "list",
            "textAlign",
            "colorPicker",
            "image",
            "link",
            "history",
          ],
          blockType: { inDropdown: true },
          list: { inDropdown: false },
          inline: { inDropdown: false },
          textAlign: { inDropdown: false },
          link: { inDropdown: false },
          history: { inDropdown: false },
          image: {
            uploadCallback: uploadImageCallBack,
            alt: { present: true, mandatory: false },
          },
        }}
      />
    </>
  );
};

export default WSIWYGEditor;
