/*
  Warnings:

  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_testId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_roomId_fkey";

-- DropTable
DROP TABLE "Room";

-- DropTable
DROP TABLE "Student";
