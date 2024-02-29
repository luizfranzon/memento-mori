/*
  Warnings:

  - You are about to drop the column `secondsPassed` on the `Timer` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `Timer` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Timer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "endDate" DATETIME NOT NULL,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Timer" ("id", "updatedAt") SELECT "id", "updatedAt" FROM "Timer";
DROP TABLE "Timer";
ALTER TABLE "new_Timer" RENAME TO "Timer";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
