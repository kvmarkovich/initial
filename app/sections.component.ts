import {Component, EventEmitter, Output} from "@angular/core";
import {Observable} from "rxjs";
import {Http} from "@angular/http";
/**
 * Created by kmarkovych on 08.02.2017.
 */

@Component({
    selector: 'sections',
    templateUrl: '/app/sections.component.html'
})
export class SectionsComponent {
    private sectionsUrl = 'sections';  // URL to web api
    sectionsReplaceUrl = "/sections/replace";
    sections: Section[];
    activeSection: string;
    @Output() sectionChanged: EventEmitter<string> = new EventEmitter<string>();
    title: string;

    constructor(private http: Http) {
        this.readSections();
    }

    showSection(section: Section) {
        this.activeSection = section.title;
        this.sectionChanged.emit(this.activeSection);
    }

    readSections() {
        this.getSections().subscribe(sections => {
            this.sections = sections;
            if (this.activeSection == null && this.sections.length > 0) {
                this.showSection(this.sections[0]);
            }
        });
    }

    getSections(): Observable<Section[]> {
        return this.http.get(this.sectionsUrl)
            .map(response => response.json() as Section[]);
    }

    addSection(newSection: HTMLInputElement) {
        let title = newSection.value;
        if (!title) return;

        // check for duplicates
        if (this.sections.map(s => s.title).find(t => t === title)) return;

        const section: Section = {title};
        this.sections.unshift(section);
        this.showSection(section);

        // write sections to server and clear add section input box
        this.writeSections().subscribe(res => newSection.value = "");
    }

    writeSections() {
        return this.http.post(this.sectionsReplaceUrl, this.sections);
    }


}
export interface Section {
    _id?: string;
    title: string;
}
