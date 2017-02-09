import {Http, URLSearchParams} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Note} from "../notes.component";
/**
 * Created by kmarkovych on 09.02.2017.
 */
@Injectable()
export class NotesServerService {
    private notesUrl = 'notes';  // URL to web api

    constructor(private http: Http) {
    }

    getNotes(section: string): Observable<Note[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('section', section);
        return this.http.get(this.notesUrl, {search: params})
            .map(response => response.json() as Note[]);
    }
}
