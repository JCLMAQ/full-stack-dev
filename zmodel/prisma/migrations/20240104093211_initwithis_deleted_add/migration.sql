-- AlterTable
ALTER TABLE "File" ADD COLUMN     "isDeletedDT" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "isDeletedDT" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "isDeletedDT" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "isDeletedDT" TIMESTAMP(3);
