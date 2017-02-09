import {Component, Input, OnInit, OnChanges, Pipe, PipeTransform} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import 'rxjs/rx';
import {Observable} from "rxjs";

@Component({
    selector: 'notes',
    templateUrl: "/app/notes.component.html"
})
export class NotesComponent implements OnChanges {

    @Input() section: string;

    text: string;
    tags: string;
    private notesUrl = '/notes';  // URL to web api

    notes: Note[] = [
        {text: "Note one", section:"Old notes", tags:[]},
        {text: "Note two", section:"Old notes", tags:[]}
    ]

    constructor(private http: Http) {
    }

    ngOnChanges(): void {
        this.readNotes();
    }


    setSection(section: string) {
        this.section = section;
    }

    readNotes() {
        this.getNotes().subscribe(notes => {
            this.notes = notes
            console.log(notes);
        });
    }


    add() {
        let note = {text: this.text, section: this.section, tags: this.tags.split(/\s+/)};
        this.addNote(note);
        this.text = "";
        this.tags = "";
    }


    addNote(note: Note) {
        this.http.post(this.notesUrl, note).toPromise()
            .then(response => {
                console.log("note sent, response", response);
                this.readNotes();
            });
    }

    remove(id: string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', id);
        this.http.delete(this.notesUrl, {search: params})
            .toPromise()
            .then(response => {
                console.log(
                    `note with id ${id} removed, response`, response);
                this.readNotes();
            });
    }

    getNotes(): Observable<Note[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('section', this.section);
        return this.http.get(this.notesUrl, {search: params})
            .map(response => response.json() as Note[]);
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
    section: string;
    tags?: string[];
}

@Pipe({
    name: 'noteFilter',
    pure: true
})
export class NotesFilterPipe implements PipeTransform {
    transform(note: Note[], v: string): Note[] {
        if (!note) return [];
        return note.filter(s => s.text.toLowerCase().indexOf(v.toLowerCase()) >= 0);
    }
}
