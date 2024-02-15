-- DropForeignKey
ALTER TABLE "UserTodoLink" DROP CONSTRAINT "UserTodoLink_todoId_fkey";

-- DropForeignKey
ALTER TABLE "UserTodoLink" DROP CONSTRAINT "UserTodoLink_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserTodoLink" ADD CONSTRAINT "UserTodoLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTodoLink" ADD CONSTRAINT "UserTodoLink_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "Todo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
