import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotesService} from "../notes.service";
import {Note} from "../note.model";
import {ActivatedRoute, Router} from "@angular/router";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {Subscription} from "rxjs";
import {MatTabChangeEvent} from "@angular/material/tabs";


@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit, OnDestroy {
  activeNotes: Note[] = [];
  doneNotes: Note[] = [];
  activeNotesSubscription: Subscription;
  doneNotesSubscription: Subscription;
  selectedTabIndex: number;

  constructor(private notesService: NotesService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeNotesSubscription = this.notesService.activeNotesChanged.subscribe((activeNotes: Note[]) => {
      this.activeNotes = activeNotes;
    });
    this.activeNotes = this.notesService.getActiveNotes();

    this.doneNotesSubscription = this.notesService.doneNotesChanged.subscribe((doneNotes: Note[]) => {
      this.doneNotes = doneNotes;
    })
    this.doneNotes = this.notesService.getDoneNotes();
  };

  onAddNewNote() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  drop(event: CdkDragDrop<Note[]>) {
    moveItemInArray(this.activeNotes, event.previousIndex, event.currentIndex);
    moveItemInArray(this.doneNotes, event.previousIndex, event.currentIndex);
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent) {
    this.selectedTabIndex = tabChangeEvent.index;
  }

  ngOnDestroy() {
    this.activeNotesSubscription.unsubscribe();
    this.doneNotesSubscription.unsubscribe();
  }
}
