/* eslint-disable react/no-unstable-nested-components -- FIXME: disable this rule for now. */
/* eslint-disable react/function-component-definition -- FIXME: disable this rule for now. */

"use client";

import {
  MDXEditor,
  toolbarPlugin,
  listsPlugin,
  quotePlugin,
  headingsPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  thematicBreakPlugin,
  frontmatterPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  directivesPlugin,
  diffSourcePlugin,
  markdownShortcutPlugin,
  ConditionalContents,
  UndoRedo,
  Separator,
  BoldItalicUnderlineToggles,
  CodeToggle,
  ListsToggle,
  BlockTypeSelect,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  InsertCodeBlock,
  InsertAdmonition,
  AdmonitionDirectiveDescriptor,
  DiffSourceToggleWrapper,
  ChangeCodeMirrorLanguage,
  ChangeAdmonitionType,
} from "@mdxeditor/editor";
import type {
  MDXEditorMethods,
  EditorInFocus,
  AdmonitionKind,
} from "@mdxeditor/editor";
import type { DirectiveNode } from "@mdxeditor/editor/dist/plugins/directives/DirectiveNode";
import "@mdxeditor/editor/style.css";

function whenInAdmonition(editorInFocus: EditorInFocus | null) {
  const node = editorInFocus?.rootNode;
  if (!node || node.getType() !== "directive") {
    return false;
  }

  return ["note", "tip", "danger", "info", "caution"].includes(
    (node as DirectiveNode).getMdastNode().name as AdmonitionKind,
  );
}

export const BasicToolbar: React.FC = () => {
  return (
    <>
      <UndoRedo />
      <Separator />
      <BoldItalicUnderlineToggles />
      <CodeToggle />
      <Separator />
      <ListsToggle />
      <Separator />

      <ConditionalContents
        options={[
          {
            when: whenInAdmonition,
            contents: () => <ChangeAdmonitionType />,
          },
          { fallback: () => <BlockTypeSelect /> },
        ]}
      />

      <Separator />
      <CreateLink />
      <InsertImage />
      <Separator />
      <InsertTable />
      <InsertThematicBreak />
      <Separator />
      <InsertCodeBlock />
      <ConditionalContents
        options={[
          {
            when: (editorInFocus) => !whenInAdmonition(editorInFocus),
            contents: () => (
              <>
                <Separator />
                <InsertAdmonition />
              </>
            ),
          },
        ]}
      />
    </>
  );
};

export const KitchenSinkToolbar: React.FC = () => {
  return (
    <DiffSourceToggleWrapper>
      <ConditionalContents
        options={[
          {
            when: (editor) => editor?.editorType === "codeblock",
            contents: () => <ChangeCodeMirrorLanguage />,
          },
          {
            fallback: () => (
              <BasicToolbar />
            ),
          },
        ]}
      />
    </DiffSourceToggleWrapper>
  );
};

const ALL_PLUGINS = [
  listsPlugin(),
  quotePlugin(),
  headingsPlugin({ allowedHeadingLevels: [1, 2, 3] }),
  linkPlugin(),
  linkDialogPlugin(),
  imagePlugin(),
  tablePlugin(),
  thematicBreakPlugin(),
  frontmatterPlugin(),
  codeBlockPlugin({ defaultCodeBlockLanguage: "txt" }),
  codeMirrorPlugin({
    codeBlockLanguages: {
      js: "JavaScript",
      css: "CSS",
      txt: "text",
      tsx: "TypeScript",
      jsx: "JSX",
    },
  }),
  directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
  markdownShortcutPlugin(),
];

const exportPlugins = (rawMarkdown) => {
return  [
  directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
  markdownShortcutPlugin(),
  diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: rawMarkdown }),
];

}

export interface EditorProps {
  markdown: string;
  rawMarkdown?: string;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
  onChange?: (markdown: string) => void;
}

export const Editor: React.FC<EditorProps> = ({
  markdown,
  rawMarkdown = "",
  editorRef,
  onChange,
}) => {
  let plugins;

  if (rawMarkdown === "") {
    plugins = [
      ...ALL_PLUGINS,
      toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar /> }),
    ];
  } else {
    plugins = [
      ...exportPlugins(rawMarkdown),
      toolbarPlugin({ toolbarContents: () => <BasicToolbar /> }),
    ];
  }

  return (
    <MDXEditor
      className="border border-slate-200 overflow-scroll h-[400px]"
      contentEditableClassName="prose h-[340px]"
      markdown={markdown}
      onChange={onChange}
      plugins={plugins}
      ref={editorRef}
    />
  );
};

export default Editor;
