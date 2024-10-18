import { Migration } from '@mikro-orm/migrations';

export class Migration20241018205416 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" uuid not null, "firstname" varchar(255) not null, "lastname" varchar(255) not null, "age" int not null, "gender" text check ("gender" in (\'male\', \'female\')) not null, "created_at" timestamptz(0) not null, "job_title" varchar(255) not null, "email" varchar(255) not null, constraint "user_pkey" primary key ("id"));');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');

    this.addSql('create table "task" ("id" uuid not null, "title" varchar(255) not null, "description" text not null, "status" text check ("status" in (\'planned\', \'in-progress\', \'completed\', \'cancelled\')) not null, "from" timestamptz(0) not null, "to" timestamptz(0) not null, "user_id" uuid not null, constraint "task_pkey" primary key ("id"));');

    this.addSql('alter table "task" add constraint "task_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "task" drop constraint "task_user_id_foreign";');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "task" cascade;');
  }

}
