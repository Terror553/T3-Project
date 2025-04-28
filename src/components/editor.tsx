"use client";

import { useRef, useState } from "react";
import { Editor as TINYEditor } from "@tinymce/tinymce-react";
import type { Editor as TinyMCEEditorClass } from "tinymce"; // Import the editor instance type
import React from "react";

export function Editor({
  id,
  textarea,
}: {
  id: string | number;
  textarea?: string;
}) {
  const editorRef = useRef<TinyMCEEditorClass | null>(null);
  const [value, setValue] = useState<string>("");

  const handleEditorChange = (content: string) => {
    setValue(content);
  };

  return (
    <>
      <TINYEditor
        id={id.toString()}
        apiKey="kzpas4b5kufo27pprvph60gjjmkz4mpq06m2j3d6ukjgktnx"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        textareaName={textarea ?? id.toString()}
        onChange={(e: { target: TinyMCEEditorClass }) => {
          handleEditorChange(e.target.getContent());
        }}
        onEditorChange={handleEditorChange}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "autoresize",
            "autosave",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
            "codesample",
            "emoticons",
          ],
          toolbar:
            "undo redo localautosave | styleselect formatselect fontselect fontsizeselect | cut copy paste | bold italic underline removeformat | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent link unlink image quickupload | print preview visualblocks fullscreen code media | forecolor backcolor emoticons",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <textarea
        name={id.toString()}
        id={id.toString()}
        value={value}
        readOnly
        hidden
      ></textarea>
    </>
  );
}
