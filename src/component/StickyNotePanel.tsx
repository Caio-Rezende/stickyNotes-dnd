import { useStickyNotePanel } from "../controller/useStickyNotePanel";
import { StickyNote } from "./StickyNote";

import "../assets/css/component/StickyNotePanel.css";

export function StickyNotePanel() {
  const {
    stickyNotes,
    setDraggedStickyNote,
    updateStickyNote,
    onDragStart,
    onDragEnd,
    onDragOverBin,
    onDragLeaveBin,
  } = useStickyNotePanel();

  return (
    <div
      id="StickyNotePanel"
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      draggable
    >
      {stickyNotes.map((sn) => (
        <StickyNote
          key={sn.id}
          model={sn}
          all={stickyNotes}
          updateStickyNote={updateStickyNote}
          setDraggedStickyNote={setDraggedStickyNote}
        />
      ))}
      <div
        id="StickyNoteBin"
        onDragEnter={onDragOverBin}
        onDragLeave={onDragLeaveBin}
      >
        🗑️
      </div>
    </div>
  );
}
