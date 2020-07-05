import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NoteEditComponent} from "./notes/note-edit/note-edit.component";
import {NoteStartComponent} from "./notes/note-start/note-start.component";
import {NoteDetailsComponent} from "./notes/note-details/note-details.component";
import {NotesComponent} from "./notes/notes.component";


const routes: Routes = [
  {path: '', redirectTo: '/notes', pathMatch: 'full'},
  {path: 'notes', component: NotesComponent, children: [
      {path: '', component: NoteStartComponent},
      {path: 'new', component: NoteEditComponent},
      {path: ':id', component: NoteDetailsComponent},
      {path: ':id/edit', component: NoteEditComponent},
    ]},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: "top"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
