import React from "react";
import { Highlight } from "@tiptap/extension-highlight";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import {
  EditorContent,
  useEditor} from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import MenuBar from "./menu-bar";
import "./styles.scss";

interface EditorProps {
  content: string;
  onChange: (richText: string) => void;
}

function Editor({ onChange, content }: EditorProps) {
  const editorRef = useEditor({
    extensions: [
      StarterKit.configure(),
      Highlight,
      TaskList,
      TaskItem,
    ],
    content,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "w-full rounded-b-md px-3 py-2 min-h-[150px] border-none focus:ring-0 focus:outline-none",
      },
    },
  });

  return (
    <div className="editor">
      {editorRef ? <MenuBar editor={editorRef} /> : null}
      <EditorContent
        className="editor__content border rounded-b-md focus-within:outline focus-within:outline-slate-400 focus-within:outline-offset-[-1px] focus-within:outline-1"
        editor={editorRef}
      />
    </div>
  );
}

export default Editor;
