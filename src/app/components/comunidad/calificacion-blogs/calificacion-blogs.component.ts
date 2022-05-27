import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-calificacion-blogs',
  templateUrl: './calificacion-blogs.component.html',
  styleUrls: ['./calificacion-blogs.component.css']
})
export class CalificacionBlogsComponent implements OnInit {


  @Input() blog: any = {}

  constructor() {
  }

  ngOnInit(): void {
  }

}
