import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-exception',
  template: `
  <h1>{{ type }}</h1>
  `
})
export class ExceptionComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  get type(): string {
    return this.route.snapshot.data['type'];
  }
  ngOnInit(): void {
  }

}
