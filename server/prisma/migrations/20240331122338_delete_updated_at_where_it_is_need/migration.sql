/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Test` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Test" DROP COLUMN "updatedAt";
