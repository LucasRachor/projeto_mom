/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Pedidos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Pedidos_id_key" ON "Pedidos"("id");
