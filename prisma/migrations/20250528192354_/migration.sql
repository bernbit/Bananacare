/*
  Warnings:

  - Changed the type of `resultArr` on the `ScanResult` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ScanResult" DROP COLUMN "resultArr",
ADD COLUMN     "resultArr" JSONB NOT NULL;
