import {Component, OnInit} from '@angular/core';
import {Note} from "../note.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NotesService} from "../notes.service";
import {MatDialog} from "@angular/material/dialog";
import {AlertComponent} from "../../shared/alert/alert.component";

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.css']
})
export class NoteDetailsComponent implements OnInit {
  noteDetail: Note;
  noteDoneDetail: Note;
  id: number;

  constructor(private notesService: NotesService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.noteDetail = this.notesService.getActiveNote(this.id);
      this.noteDoneDetail = this.notesService.getDoneNote(this.id);
    });
  }

  onMarkAsDone() {
    this.notesService.markNoteAsDone(this.id);
    this.router.navigate(['/notes']);
  }

  onDeleteNote() {
    const dialogRef = this.dialog.open(AlertComponent, {
      data: this.noteDetail,
      panelClass: 'panel-alert'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.notesService.deleteNote(this.id);
        this.router.navigate(['/notes']);
      }
    })
  }
}
