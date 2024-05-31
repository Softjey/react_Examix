/*
  Warnings:

  - The values [PHYSICAL_EDUCATION] on the enum `Subject` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Subject_new" AS ENUM ('MATH', 'ENGLISH', 'SCIENCE', 'HISTORY', 'GEOGRAPHY', 'COMPUTER_SCIENCE', 'PHYSICS', 'CHEMISTRY', 'BIOLOGY', 'ECONOMICS', 'CIVICS', 'GOVERNMENT', 'LITERATURE', 'ART', 'MUSIC', 'SPORT', 'HEALTH', 'SPANISH', 'FRENCH', 'GERMAN');
ALTER TABLE "Question" ALTER COLUMN "subject" TYPE "Subject_new" USING ("subject"::text::"Subject_new");
ALTER TABLE "Test" ALTER COLUMN "subject" TYPE "Subject_new" USING ("subject"::text::"Subject_new");
ALTER TYPE "Subject" RENAME TO "Subject_old";
ALTER TYPE "Subject_new" RENAME TO "Subject";
DROP TYPE "Subject_old";
COMMIT;
