-- AlterTable
ALTER TABLE "ScanResult" ADD COLUMN     "resultArr" TEXT[],
ALTER COLUMN "result" SET NOT NULL,
ALTER COLUMN "result" SET DATA TYPE TEXT;
