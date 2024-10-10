"use client";

import React, { KeyboardEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Edit, Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { conversationThunks } from "@/lib/features/conversation/conversationThunks";

const AddANote = () => {
  const dispatch = useAppDispatch();
  const { fetchedConversation } = useAppSelector((state) => state.conversation);

  const [open, setOpen] = useState(false);
  const [noteAdded, setNoteAdded] = useState(false);
  const [note, setNote] = useState(fetchedConversation?.note || "");

  useEffect(() => {
    setNoteAdded(!!fetchedConversation?.note);
    setNote(fetchedConversation?.note || "");
  }, [fetchedConversation]);

  if (!fetchedConversation) return null;

  const handleAddNote = () => {
    if (!note.trim()) return;

    dispatch(
      conversationThunks.addNote({
        note,
        conversationId: fetchedConversation?.conversationId,
      })
    );

    setNoteAdded(true);
    setOpen(false);
  };

  const handleNoteDelete = () => {
    dispatch(
      conversationThunks.deleteNote({
        conversationId: fetchedConversation?.conversationId,
      })
    );

    setNoteAdded(false);
    setOpen(false);
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
                <div className="relative flex items-center flex-1">
                  <div className="absolute right-3">
                    {noteAdded && (
                      <Trash2
                        className="h-4 w-4 text-destructive cursor-pointer"
                        onClick={handleNoteDelete}
                      />
                    )}
                  </div>
                  <input
                    placeholder="Enter note for patient"
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="w-full pl-4 pr-11 py-2.5 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent placeholder-gray-400 text-sm shadow-sm flex-1"
                    autoComplete="off"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
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
            onClick={() => setOpen(true)}
          />
        </div>
      )}
    </div>
  );
};

export default AddANote;
