import { StickyNoteType } from "../model/StickyNote";

export function getFromStorage() {
  return JSON.parse(localStorage.getItem("stickynotes") ?? "[]");
}

export async function setToStorage(stickyNotes: StickyNoteType[]) {
  const stringified = JSON.stringify(stickyNotes);
  localStorage.setItem("stickynotes", stringified);

  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: xhr.status,
        statusText: xhr.statusText,
      });
    };
    xhr.send(stringified);
  });
}
