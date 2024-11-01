import "@blocknote/core/style.css";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import {
  BlockNoteEditor,
  PartialBlock
} from "@blocknote/core";
import {
  useCreateBlockNote 
} from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";

interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string;
    editable?: boolean;
}

const Editor = ({
    onChange,
    initialContent,
    editable
}: EditorProps) => {
    const editor: BlockNoteEditor = useCreateBlockNote({
        initialContent: 
            initialContent 
            ? JSON.parse(initialContent) as PartialBlock[] 
            : undefined,
        uploadFile
    });

    return ( 
        <div className="mx-auto h-full w-full max-w-5xl rounded-xl bg-white p-4">
            <BlockNoteView
                editor={editor}
                editable={editable}
                theme={"light"}
                onChange={() => {
                    onChange(JSON.stringify(editor.document, null, 2))
                }}
            />
        </div>
     );
}
 
export default Editor;

async function uploadFile(file: File) {
    const body = new FormData();
    body.append("file", file);
   
    const ret = await fetch("https://tmpfiles.org/api/v1/upload", {
      method: "POST",
      body: body,
    });
    return (await ret.json()).data.url.replace(
      "tmpfiles.org/",
      "tmpfiles.org/dl/"
    );
  }