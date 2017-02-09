import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {NotesServerService} from "./services/notes_server.service";
import {Note} from "./notes.component";
import {Observable} from "rxjs";
/**
 * Created by kmarkovych on 09.02.2017.
 */
@Component({
    selector: 'view-section',
    templateUrl: '/app/view_section.component.html'
})
export class ViewSectionComponent implements OnInit {
    private section: string;
    notes$: Observable<Note[]>;

    constructor(private route: ActivatedRoute,
                private noteServer: NotesServerService) {
    }

    getNotes() {
        return this.noteServer.getNotes(this.section);
    }

    ngOnInit(): void {
        this.section = this.route.snapshot.params["name"];
        this.notes$ = this.getNotes();
    }
}