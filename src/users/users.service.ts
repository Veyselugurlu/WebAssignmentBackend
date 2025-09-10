import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  create(userDto: CreateUserDto): User {
    const newUser: User = { id: this.users.length + 1, ...userDto };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateData: Partial<CreateUserDto>): User | undefined {
    const user = this.findOne(id);
    if (user) Object.assign(user, updateData);
    return user;
  }

  remove(id: number) {
    this.users = this.users.filter((u) => u.id !== id);
    return { deleted: true };
  }
}
