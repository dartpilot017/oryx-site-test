import { Component, OnInit } from '@angular/core';

interface Comment {
  id: string;
  date: Date;
  content: string;
  replies: Comment[];
  likes: number;
  dislikes: number;
}

@Component({
  selector: 'app-blog-comments',
  templateUrl: './blog-comments.component.html',
  styleUrls: ['./blog-comments.component.scss']
})
export class BlogCommentsComponent implements OnInit {
  comments: Comment[] = [
    {
      id: '1', date: new Date(),
      content: "Some really great info, Gladiola I detected this. I'm not spamming. I'm just saying your website is AWESOME! Thank you so much! Please also visit my website.",
      replies: [], likes: 15, dislikes: 0
    },
    {id: '2', date: new Date(), content: 'This is a comment', replies: [], likes: 8, dislikes: 2},
    {id: '3', date: new Date(), content: 'This is a comment', replies: [], likes: 3, dislikes: 0}
  ];

  ngOnInit(): void { }
}
