import { Component } from '@angular/core';
import {AboutComponent} from "../about/about.component";
import {NgIf} from "@angular/common";
import {ProjectsComponent} from "../projects/projects.component";
import {EntryPageComponent} from "../entry-page/entry-page.component";
import {ExperienceComponent} from "../experience/experience.component";

@Component({
  selector: 'app-initial',
  standalone: true,
  imports: [
    AboutComponent,
    NgIf,
    ProjectsComponent,
    EntryPageComponent,
    ExperienceComponent
  ],
  templateUrl: './initial.component.html',
  styleUrl: './initial.component.css'
})
export class InitialComponent {
  showEntryPage: boolean = true;

  ngOnInit() {
    setTimeout(() => {
      this.showEntryPage = false;
    }, 5000); // Show entry page for 3 seconds
  }

  about_visibility = false;
  projects_visibility = false;
  experience_visibility = false;

  toggle_about(){
    this.about_visibility = !this.about_visibility;
    this.projects_visibility = false;
    this.experience_visibility = false;
  }

  toggle_projects(){
    this.projects_visibility = !this.projects_visibility;
    this.about_visibility = false;
    this.experience_visibility = false;
  }

  toggle_experience(){
    this.experience_visibility = !this.experience_visibility;
    this.about_visibility = false;
    this.projects_visibility = false;
  }
}
