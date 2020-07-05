import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {NotesService} from "../notes.service";
import {Note} from "../note.model";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent implements OnInit {
  id: number;
  noteEditDetail: Note;
  editMode = false;
  noteForm: FormGroup;

  constructor(private notesService: NotesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.noteEditDetail = this.notesService.getActiveNote(this.id);
      this.editMode = params['id'] != null;
    })
    this.initForm();
  }

  private initForm() {
    let noteName = '';
    let noteDescription = '';
    let noteImage = '';

    if (this.editMode) {
      const note = this.notesService.getActiveNote(this.id);
      noteName = note.name;
      noteDescription = note.description;
      noteImage = note.image;
    }

    this.noteForm = new FormGroup({
      name: new FormControl(noteName),
      description: new FormControl(noteDescription)
    });
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onSubmit() {
    if (this.editMode) {
      this.notesService.updateNote(this.id, this.noteForm.value as Note);
    } else {
      this.notesService.addNote(this.noteForm.value as Note);
    }
    this.onCancel();
  }
}
