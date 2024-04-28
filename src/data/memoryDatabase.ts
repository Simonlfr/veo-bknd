import { Injectable, OnModuleDestroy } from '@nestjs/common';
import * as sqlite3 from 'sqlite3';

@Injectable()
export class MemoryDatabaseService implements OnModuleDestroy {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database(':memory:', (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Connected to the in-memory SQlite database.');
    });

    this.db.run(
      'CREATE TABLE employees(id number, name text, parentId number)',
      (err) => {
        if (err) {
          return console.log(err.message);
        }
        console.log('Table created.');
      },
    );

    // Insert 3 level employee structure
    this.db.serialize(() => {
      this.db.run(
        'INSERT INTO employees(id, name, parentId) VALUES(1, "CEO", NULL)',
      );
      this.db.run(
        'INSERT INTO employees(id, name, parentId) VALUES(2, "Manager", 1)',
      );
      this.db.run(
        'INSERT INTO employees(id, name, parentId) VALUES(3, "Employee", 2)',
      );
    });
  }

  getDb() {
    return this.db;
  }

  onModuleDestroy() {
    this.db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Close the database connection.');
    });
  }
}
