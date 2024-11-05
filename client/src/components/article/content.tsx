import "@blocknote/core/style.css";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { cn } from "@/lib/utils";

interface ContentArticleProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
  className?: string;
}

function ContentArticle({
  onChange,
  initialContent,
  editable,
  className,
}: ContentArticleProps) {
  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile,
  });

  return (
    <div className={cn("mx-auto h-full w-full max-w-5xl rounded-xl p-4", className)}>
      <BlockNoteView
        editor={editor}
        editable={editable}
        theme={"light"}
        onChange={() => {
          onChange(JSON.stringify(editor.document, null, 2));
        }}
        className={className}
      />
    </div>
  );
}

export default ContentArticle;

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
