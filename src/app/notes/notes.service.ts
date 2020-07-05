import {Injectable} from "@angular/core";
import {Note} from "./note.model";
import {Subject} from "rxjs";
import {UiService} from "../shared/ui.service";

@Injectable({providedIn: "root"})
export class NotesService {
  private activeNotes: Note[] = [
    new Note('Movies', 'Go to movies with friends at friday night', false),
    new Note('Grocery', 'Don\'t forget to do shopping!', false),
    new Note('Ideas', 'I want to resume running finally!', false)
  ];
  private doneNotes: Note[] = [];
  activeNotesChanged = new Subject<Note[]>();
  doneNotesChanged = new Subject<Note[]>();

  constructor(private uiService: UiService) { }


  getActiveNotes() {
    return this.activeNotes;
  }

  getDoneNotes() {
    return this.doneNotes;
  }
  getActiveNote(id: number) {
    return this.activeNotes[id];
  }

  getDoneNote(id: number) {
    return this.doneNotes[id];
  }

  addNote(note: Note) {
    this.activeNotes.unshift(note);
    this.uiService.showSnackbar('Note is added!', 'OK', '');
  }

  updateNote(id: number, newNote: Note) {
    this.activeNotes[id] = newNote;
    this.uiService.showSnackbar('Note is updated!', 'OK', '');
  }

  markNoteAsDone(id: number) {
    const note = this.getActiveNote(id);
    note.statusDone = true;

    this.deleteNote(id);
    this.doneNotes.unshift(note);

    this.activeNotesChanged.next(this.activeNotes);
    this.doneNotesChanged.next(this.doneNotes);
    this.uiService.showSnackbar('Note is done!', 'OK', '');

  }

  deleteNote(id: number) {
    this.activeNotes.splice(id, 1);
    this.uiService.showSnackbar('Note is deleted!', 'OK', '');

  }
}
