import { Migration } from '@mikro-orm/migrations';

export class Migration20241015161729_use_tsvector_on_title_and_description_field extends Migration {
  async up(): Promise<void> {
    this.addSql(`
      CREATE INDEX title_description_idx 
      ON task 
      USING GIN (to_tsvector('english', title || ' ' || description));
    `);
  }

  async down(): Promise<void> {
    this.addSql('DROP INDEX IF EXISTS title_description_idx;');
  }
}
