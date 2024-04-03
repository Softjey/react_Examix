/*
  Warnings:

  - You are about to drop the column `max_score` on the `TestQuestion` table. All the data in the column will be lost.
  - Added the required column `maxScore` to the `TestQuestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeLimit` to the `TestQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TestQuestion" DROP COLUMN "max_score",
ADD COLUMN     "maxScore" INTEGER NOT NULL,
ADD COLUMN     "timeLimit" INTEGER NOT NULL;
