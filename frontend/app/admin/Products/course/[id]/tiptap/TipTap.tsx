"use client";
import "./style.css";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import {useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

import { FontBoldIcon, FontItalicIcon } from "@radix-ui/react-icons";
import { GrClear } from "react-icons/gr";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { RiParagraph } from "react-icons/ri";
import {
  PiTextHOne,
  PiTextHTwo,
  PiTextHThree,
  PiTextHFive,
  PiTextHFour,
  PiTextHSix,
  PiTextStrikethrough,
  PiCodeBlock,
} from "react-icons/pi";
import {
  MdFormatListBulleted,
  MdOutlineFormatListNumbered,
} from "react-icons/md";
import { BsBlockquoteLeft } from "react-icons/bs";
import { VscHorizontalRule } from "react-icons/vsc";
import {LuSpace} from "react-icons/lu";
import { IoCodeSlashOutline } from "react-icons/io5";

export const MenuBar = () => {
  const { editor } = useCurrentEditor();
  if (!editor) {
    return null;
  }


  return (
      <div className="flex gap-2 mb-2 flex-wrap">
        <div
          className={`hover:bg-slate-300 w-7 h-7 rounded flex justify-center items-center cursor-pointer bg-slate-200 ${
            editor.isActive("bold") ? "bg-slate-300" : ""
          }`}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <FontBoldIcon />
        </div>
        <div
          className={`hover:bg-slate-300 w-7 h-7 rounded flex justify-center items-center cursor-pointer bg-slate-200 ${
            editor.isActive("italic") ? "bg-slate-300" : ""
          }`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <FontItalicIcon />
        </div>
        <div
          className={`hover:bg-slate-300 w-7 h-7 rounded flex justify-center items-center cursor-pointer bg-slate-200 ${
            editor.isActive("strike") ? "bg-slate-300" : ""
          }`}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <PiTextStrikethrough />
        </div>
        <div
          className={`hover:bg-slate-300 w-7 h-7 rounded flex justify-center items-center cursor-pointer bg-slate-200`}
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        >
          <GrClear />
        </div>
        <div
          className={`hover:bg-slate-300 w-7 h-7 rounded flex justify-center items-center cursor-pointer bg-slate-200 ${
            editor.isActive("code") ? "bg-slate-300" : ""
          }`}
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <IoCodeSlashOutline  />
        </div>
        <div
          className={`hover:bg-slate-300 w-7 h-7 rounded flex justify-center items-center cursor-pointer bg-slate-200`}
          onClick={() => editor.chain().focus().clearNodes().run()}
        >
          <IoIosRemoveCircleOutline />
        </div>
        <div
          className={`hover:bg-slate-300 w-7 h-7 rounded flex justify-center items-center cursor-pointer bg-slate-200 ${
            editor.isActive("paragraph") ? "bg-slate-300" : ""
          }`}
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          <RiParagraph />
        </div>
        <div
          className={`hover:bg-slate-300 w-7 h-7 rounded flex justify-center items-center cursor-pointer bg-slate-200 ${
            editor.isActive("heading", { level: 1 }) ? "bg-slate-300" : ""
          }`}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <PiTextHOne />
        </div>
        <div
          className={`hover:bg-slate-300 w-7 h-7 rounded flex justify-center items-center cursor-pointer bg-slate-200 ${
            editor.isActive("heading", { level: 2 }) ? "bg-slate-300" : ""
          }`}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <PiTextHTwo />
        </div>
        <div
          className={`hover:bg-slate-300 w-7 h-7 rounded flex justify-center items-center cursor-pointer bg-slate-200 ${
            editor.isActive("heading", { level: 3 }) ? "bg-slate-300" : ""
          }`}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <PiTextHThree />
        </div>
        <div
          className={`hover:bg-slate-300 w-7 h-7 rounded flex justify-center items-center cursor-pointer bg-slate-200 ${
            editor.isActive("heading", { level: 4 }) ? "bg-slate-300" : ""
          }`}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
        >
          <PiTextHFour />
        </div>
        <div
          className={`hover:bg-slate-300 w-7 h-7 rounded flex justify-center items-center cursor-pointer bg-slate-200 ${
            editor.isActive("heading", { level: 5 }) ? "bg-slate-300" : ""
          }`}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
        >
          <PiTextHFive />
        </div>
        <div
          className={`hover:bg-slate-300 w-7 h-7 rounded flex justify-center items-center cursor-pointer bg-slate-200 ${
            editor.isActive("heading", { level: 6 }) ? "bg-slate-300" : ""
          }`}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
        >
          <PiTextHSix />
        </div>
        <div
          className={`hover:bg-slate-300 w-7 h-7 rounded flex justify-center items-center cursor-pointer bg-slate-200 ${
            editor.isActive("bulletList") ? "bg-slate-300" : ""
          }`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <MdFormatListBulleted />
        </div>
        <div
          className={`hover:bg-slate-300 w-7 h-7 rounded flex justify-center items-center cursor-pointer bg-slate-200 ${
            editor.isActive("orderedList") ? "bg-slate-300" : ""
          }`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <MdOutlineFormatListNumbered />
        </div>
        <div
          className={`hover:bg-slate-300 w-7 h-7 rounded flex justify-center items-center cursor-pointer bg-slate-200 ${
            editor.isActive("codeBlock") ? "bg-slate-300" : ""
          }`}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <PiCodeBlock />
        </div>
        <div
          className={`hover:bg-slate-300 w-7 h-7 rounded flex justify-center items-center cursor-pointer bg-slate-200 ${
            editor.isActive("blockquote") ? "bg-slate-300" : ""
          }`}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <BsBlockquoteLeft />
        </div>
        <div
          className={`hover:bg-slate-300 w-7 h-7 rounded flex justify-center items-center cursor-pointer bg-slate-200`}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <VscHorizontalRule />
        </div>
        <div
          className={`hover:bg-slate-300 w-7 h-7 rounded flex justify-center items-center cursor-pointer bg-slate-200`}
          onClick={() => editor.chain().focus().setHardBreak().run()}
        >
          <LuSpace />
        </div>
      </div>
  );
};

export const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];