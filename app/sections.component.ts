import {Component, EventEmitter, Output, PipeTransform, Pipe, Input} from "@angular/core";
import {Observable} from "rxjs";
import {Http} from "@angular/http";
import {DragulaService} from "ng2-dragula";
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

    @Input()
    set section(section: string) {
        if (section && section.length > 0) {
            this.activeSection = section;
        }
    }

    @Output() sectionChanged: EventEmitter<string> = new EventEmitter<string>();

    constructor(private http: Http, private dragulaService: DragulaService) {
        this.readSections();
        dragulaService.drop.subscribe(this.onDrop.bind(this));
    }

    onDrop(value) {
        let [bag, elementMoved, targetContainer, srcContainer] = value;
        if (targetContainer.children) {
            let arr = Array.from(targetContainer.children);
            this.sections = arr.map((li: HTMLLIElement) => {
                return {title: li.textContent.trim()}
            });
            this.writeSections().subscribe();
        }
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

@Pipe({
    name: 'sectionFilter',
    pure: false
})
export class SectionFilterPipe implements PipeTransform {
    transform(sections: Section[], v: string): Section[] {
        if (!sections) return [];
        return sections.filter(
            s => s.title.toLowerCase().startsWith(v.toLowerCase()));
    }
}