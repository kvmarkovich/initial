import {Component} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'notes',
    template: `<ul>
    <li *ngFor="let note of notes">
        {{note.text}} <button (click)="remove(note._id)">remove</button>
        <button (click)="moveToTop(note._id)">Move to top</button>
    </li>
</ul>
<textarea [(ngModel)]="text"></textarea>
<button (click)="add()">Add</button>`
})
export class NotesComponent {

    constructor(private http: Http) {
        this.readNotes();
    }

    notes: Note[] = [
        {text: "Note one"},
        {text: "Note two"}
    ]

    readNotes() {
        this.getNotes().then(notes=>{
            this.notes=notes
            console.log(notes);
        });
    }

    text: string;
    private notesUrl = '/notes';  // URL to web api


    add() {
        let note = {text: this.text}
        this.addNote(note);
        this.text = "";
    }


    addNote(note:Note) {
        this.http.post(this.notesUrl, note).toPromise()
            .then(response => {
                console.log("note sent, response", response);
                this.readNotes();
            } );
    }

    remove(id:string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', id);
        this.http.delete(this.notesUrl, { search: params })
            .toPromise()
            .then(response => {
                console.log(
                    `note with id ${id} removed, response`, response);
                this.readNotes();
            });
    }

    getNotes(): Promise<Note[]> {
        return this.http.get(this.notesUrl)
            .toPromise()
            .then(response => response.json() as Note[]);
    }

    moveToTop(idx) {
        let note = this.notes[idx];
        this.notes.splice(idx, 1);
        this.notes = [note, ...this.notes];
        this.storeToServer();
    }

    storeToServer() {
        // console.log(this.notesUrl);
        this.http.post(this.notesUrl, this.notes);
    }
}
interface Note {
    text: string;
}
