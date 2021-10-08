import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class AppService {
  constructor(private userRepository: UserRepository){}

  async getUsers() {
    return this.userRepository.getUsers();
  }

  async addUser(data) {
    return this.userRepository.addUser(data);
  }
}
