/*
  Warnings:

  - Added the required column `percentage` to the `ScanResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ScanResult" ADD COLUMN     "percentage" DOUBLE PRECISION NOT NULL;
