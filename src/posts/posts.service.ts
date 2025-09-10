// src/posts/posts.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

@Injectable()
export class PostsService {
  private posts: Post[] = [
    { id: 1, title: 'Hello World', body: 'This is the first post', userId: 1 },
    { id: 2, title: 'NestJS Tips', body: 'Some useful NestJS tips', userId: 2 },
    {
      id: 3,
      title: 'Frontend Guide',
      body: 'How to connect frontend to backend',
      userId: 1,
    },
  ];
  private counter = this.posts.length + 1;

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: number): Post {
    const post = this.posts.find((p) => p.id === id);
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  create(body: CreatePostDto): Post {
    const newPost: Post = { id: this.counter++, ...body };
    this.posts.push(newPost);
    return newPost;
  }

  update(id: number, body: Partial<CreatePostDto>): Post {
    const post = this.findOne(id);
    Object.assign(post, body);
    return post;
  }

  remove(id: number): { deleted: boolean } {
    const index = this.posts.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException('Post not found');
    this.posts.splice(index, 1);
    return { deleted: true };
  }
}
