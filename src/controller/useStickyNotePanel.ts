import { DragEvent, useState } from "react";
import { PositionType, StickyNoteType } from "../model/StickyNote";
import { getFromStorage, setToStorage } from "../service/storage";

const MIN_WIDTH_HEIGHT = 50;

export function useStickyNotePanel() {
  const [isOverBin, setIsOverBin] = useState(false);
  const [stickyNotes, setStickyNotes] = useState<StickyNoteType[]>(
    getFromStorage()
  );
  const [draggedObjects, setDraggedObjects] =
    useState<[StickyNoteType, PositionType]>();

  const saveStickyNotes = (stickyNotes: StickyNoteType[]) => {
    setStickyNotes(stickyNotes);

    setToStorage(stickyNotes).catch((e) => {});
  };

  const onDragStart: React.DragEventHandler<HTMLDivElement> = (
    ev: DragEvent<HTMLDivElement>
  ) => {
    if (draggedObjects !== undefined) return;

    let img = new Image();
    img.src = "example.gif";
    ev.dataTransfer.setDragImage(img, 10, 10);
    ev.dataTransfer.effectAllowed = "move";
    ev.dataTransfer.dropEffect = "move";

    const stickyNote: StickyNoteType = {
      id: 0,
      height: 0,
      width: 0,
      x: ev.clientX,
      y: ev.clientY,
      z: stickyNotes.length + 1,
      color: "yellow",
      text: "",
    };
    setDraggedObjects([stickyNote, { x: 0, y: 0 }]);
  };

  const onDragEnd: React.DragEventHandler<HTMLDivElement> = (
    ev: DragEvent<HTMLDivElement>
  ) => {
    ev.preventDefault();
    if (draggedObjects === undefined) return;

    const draggedStickyNote = draggedObjects[0];

    if (draggedStickyNote.id === 0) {
      draggedStickyNote.width = Math.abs(draggedStickyNote.x - ev.clientX);
      draggedStickyNote.height = Math.abs(draggedStickyNote.y - ev.clientY);

      if (
        draggedStickyNote.width > MIN_WIDTH_HEIGHT &&
        draggedStickyNote.height > MIN_WIDTH_HEIGHT
      ) {
        if (ev.clientX < draggedStickyNote.x) {
          draggedStickyNote.x = ev.clientX;
        }
        if (ev.clientY < draggedStickyNote.y) {
          draggedStickyNote.y = ev.clientY;
        }

        draggedStickyNote.id = stickyNotes.length + 1;

        saveStickyNotes([...stickyNotes, draggedStickyNote]);
      }
    } else {
      draggedStickyNote.x = ev.clientX - draggedObjects[1].x;
      draggedStickyNote.y = ev.clientY - draggedObjects[1].y;
      updateStickyNote(draggedStickyNote);
    }

    setDraggedObjects(undefined);
  };

  const updateStickyNote = (updated: StickyNoteType) => {
    if (isOverBin) {
      saveStickyNotes(stickyNotes.filter((sn) => sn.id !== updated.id));
    } else {
      saveStickyNotes(
        stickyNotes.map((sn) => (sn.id === updated.id ? updated : sn))
      );
    }
    setDraggedObjects(undefined);
  };

  const setDraggedStickyNote = (obj: [StickyNoteType, PositionType]) => {
    if (draggedObjects === undefined) {
      setDraggedObjects(obj);
    }
  };

  const onDragOverBin: React.DragEventHandler<HTMLDivElement> = (
    ev: DragEvent<HTMLDivElement>
  ) => {
    ev.currentTarget.style.backgroundColor = "red";
    setIsOverBin(true);
  };

  const onDragLeaveBin: React.DragEventHandler<HTMLDivElement> = (
    ev: DragEvent<HTMLDivElement>
  ) => {
    setTimeout(
      ((target) => () => {
        target.style.backgroundColor = "black";
        setIsOverBin(false);
      })(ev.currentTarget),
      200
    );
  };

  return {
    stickyNotes,
    setDraggedStickyNote,
    updateStickyNote,
    onDragStart,
    onDragEnd,
    onDragOverBin,
    onDragLeaveBin,
  };
}
