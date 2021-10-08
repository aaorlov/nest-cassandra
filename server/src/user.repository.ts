import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { UserModel } from './user.model';
import { CassandraService } from './cassandra.service';

@Injectable()
export class UserRepository implements OnModuleInit {

  constructor(private cassandraService: CassandraService) { }

  userMapper: mapping.ModelMapper<UserModel>;

  onModuleInit() {
    const mappingOptions: mapping.MappingOptions = {
      models: {
        'User': {
          tables: ['users'],
          keyspace: 'test',
        }
      }
    }

    this.userMapper = this.cassandraService.createMapper(mappingOptions).forModel('User');
  }

  async getUsers() {
    return (await this.userMapper.findAll()).toArray();
  }

  async addUser(user: UserModel) {
    return (await this.userMapper.insert({ id: 'test', addedDate: new Date(), first_name: 'My video', last_name: 'My desc'}));
  }
}