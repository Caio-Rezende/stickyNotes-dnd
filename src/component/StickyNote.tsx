import { useStickyNote } from "../controller/useStickyNote";
import {
  StickyNoteType,
  StickyNoteThemeColors,
  PositionType,
} from "../model/StickyNote";
import "../assets/css/component/StickyNote.css";

export function StickyNote({
  model,
  all,
  updateStickyNote,
  setDraggedStickyNote,
}: {
  model: StickyNoteType;
  all: StickyNoteType[];
  updateStickyNote: (sn: StickyNoteType) => void;
  setDraggedStickyNote: (obj: [StickyNoteType, PositionType]) => void;
}) {
  const { onDragStart, onChange, onFocus, onClickColorChange } = useStickyNote(
    updateStickyNote,
    setDraggedStickyNote,
    all
  );

  return (
    <>
      <div
        className="StickyNoteColorChange"
        style={{
          backgroundColor: StickyNoteThemeColors[model.color ?? "yellow"],
          left: `${model.x - 10}px`,
          top: `${model.y - 10}px`,
          zIndex: (model.z ?? 0) + 1,
        }}
        onClick={onClickColorChange(model)}
        onDragStart={onDragStart(model)}
        draggable
      />
      <textarea
        className="StickyNote"
        style={{
          backgroundColor: StickyNoteThemeColors[model.color ?? "yellow"],
          left: `${model.x}px`,
          height: `${model.height}px`,
          top: `${model.y}px`,
          width: `${model.width}px`,
          zIndex: model.z,
        }}
        draggable
        onDragStart={onDragStart(model)}
        onFocus={onFocus(model)}
        onChange={onChange(model)}
        value={model.text}
      />
    </>
  );
}
