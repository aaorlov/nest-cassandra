import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, mapping, auth } from 'cassandra-driver';

@Injectable()
export class CassandraService implements OnModuleInit {
  client: Client;
  mapper: mapping.Mapper;

  async onModuleInit() {
    this.client = new Client({
      contactPoints: ['cass1'],
      localDataCenter: 'Mars',
      // authProvider: new auth.PlainTextAuthProvider('cassandra', 'cassandra')
    });
    await this.client.connect()
    // await this.client.execute(`DROP TABLE test.users`)
    await this.client.execute(`CREATE KEYSPACE IF NOT EXISTS test WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1' }`)
    await this.client.execute(`USE test`)
    await this.client.execute(`CREATE TABLE IF NOT EXISTS test.users (id varchar, first_name varchar, last_name varchar,
      PRIMARY KEY (id))`)
  }

  createMapper(mappingOptions: mapping.MappingOptions) {
    return new mapping.Mapper(this.client, mappingOptions);
  }
}