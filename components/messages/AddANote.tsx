"use client";

import React, { KeyboardEvent, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Edit } from "lucide-react";

const AddANote = () => {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [noteAdded, setNoteAdded] = useState(false);

  const handleAddNote = () => {
    if (!note.trim()) return;

    console.log(note);
    setNoteAdded(true);
    setOpen(false);
  };

  const handleEdit = () => {
    if (!note.trim()) return;

    console.log(note);
    setOpen(true);
    setNoteAdded(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleAddNote();
    }
  };

  return (
    <div
      className={cn(
        "w-full mx-auto py-2 bg-stone-50 flex items-center justify-center",
        open && "items-start h-screen z-50 absolute flex-col bg-transparent"
      )}
    >
      {!open && !noteAdded && (
        <Button
          variant="ghost"
          className="text-primary hover:text-primary/80"
          onClick={() => setOpen(true)}
        >
          + Add note
        </Button>
      )}

      {open && (
        <>
          <div className="w-full py-2 bg-stone-50 flex flex-col items-center gap-2 justify-center h-36">
            <div
              onClick={() => setOpen(false)}
              className="cursor-pointer absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
            >
              <Cross2Icon className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </div>

            <div className="flex items-center justify-start flex-col gap-2">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Enter note for patient"
                  value={note}
                  autoFocus
                  onChange={(e) => setNote(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button onClick={handleAddNote}>Add note</Button>
              </div>
              <p className="text-sm text-muted-foreground">
                This note will not be shown to patient.
              </p>
            </div>
          </div>
          <div className="h-full w-full bg-transparent sm:max-w-[600px] bg-opacity-50 backdrop-blur-sm z-40" />
        </>
      )}

      {noteAdded && (
        <div className="bg-slate-50 flex items-center justify-center gap-[10px] py-4">
          <p className="text-primary text-sm leading-normal font-medium">
            {note}
          </p>
          <Edit
            className="w-4 h-4 text-primary cursor-pointer"
            onClick={handleEdit}
          />
        </div>
      )}
    </div>
  );
};

export default AddANote;
