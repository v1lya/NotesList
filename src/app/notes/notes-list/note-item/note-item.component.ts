import {Component, Input, OnInit} from '@angular/core';
import {Note} from "../../note.model";

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.css']
})
export class NoteItemComponent implements OnInit {
  @Input() activeNote: Note;
  @Input() activeNoteIndex: number;
  @Input() doneNote: Note;
  @Input() doneNoteIndex: number;
  @Input() selectedIndex: number;

  constructor() { }

  ngOnInit(): void {
  }
}
