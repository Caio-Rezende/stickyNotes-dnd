import {
  PositionType,
  StickyNoteThemeColors,
  StickyNoteType,
} from "../model/StickyNote";

export function useStickyNote(
  updateStickyNote: (sn: StickyNoteType) => void,
  setDraggedStickyNote: (obj: [StickyNoteType, PositionType]) => void,
  all: StickyNoteType[]
) {
  const onDragStart = (model: StickyNoteType) => (ev: React.DragEvent) => {
    ev.stopPropagation();
    ev.dataTransfer.effectAllowed = 'move';
    ev.dataTransfer.dropEffect = "move";
    setDraggedStickyNote([
      model,
      {
        x: ev.clientX - model.x,
        y: ev.clientY - model.y,
      },
    ]);
    return false;
  };
  const onFocus =
    (model: StickyNoteType) => (ev: React.FocusEvent<HTMLTextAreaElement>) => {
      ev.preventDefault();
      model.z = Math.max(...all.map((sn) => sn.z ?? 0)) + 1;
      updateStickyNote(model);
    };
  const onChange =
    (model: StickyNoteType) => (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
      ev.preventDefault();
      updateStickyNote({
        ...model,
        text: ev.currentTarget.value,
      });
    };
  const onClickColorChange =
    (model: StickyNoteType) => (ev: React.MouseEvent<HTMLElement>) => {
      ev.stopPropagation();
      ev.preventDefault();
      const colorKeys = Object.keys(StickyNoteThemeColors);
      const nextColor =
        (colorKeys.indexOf(model.color ?? "yellow") + 1) % colorKeys.length;

      updateStickyNote({
        ...model,
        color: colorKeys[nextColor] as keyof typeof StickyNoteThemeColors,
      });
    };

  return { onDragStart, onChange, onFocus, onClickColorChange };
}
