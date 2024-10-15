import { Migration } from '@mikro-orm/migrations';

export class Migration20241015062107 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" uuid not null, "test" varchar(255) not null, "last_name" varchar(255) not null, "age" int not null, "gender" text check ("gender" in (\'male\', \'female\')) not null, "created_at" timestamptz(0) not null, "job_title" varchar(255) not null, constraint "user_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "user" cascade;');
  }

}
