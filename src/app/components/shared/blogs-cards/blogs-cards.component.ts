import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogs-cards',
  templateUrl: './blogs-cards.component.html',
  styleUrls: ['./blogs-cards.component.css']
})
export class BlogsCardsComponent implements OnInit {

  @Input() blog: any = {};

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ver_blog() {
    this.router.navigate(['/ver-blog', this.blog.id_blog]);
  }

}
