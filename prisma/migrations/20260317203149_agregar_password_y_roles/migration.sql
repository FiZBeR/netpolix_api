/*
  Warnings:

  - The primary key for the `clasificacion_usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cliente_id` on the `clasificacion_usuario` table. All the data in the column will be lost.
  - You are about to drop the column `cliente_id` on the `orden` table. All the data in the column will be lost.
  - You are about to drop the `cliente` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `usuario_id` to the `Clasificacion_usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario_id` to the `Orden` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `clasificacion_usuario` DROP FOREIGN KEY `Clasificacion_usuario_cliente_id_fkey`;

-- DropForeignKey
ALTER TABLE `orden` DROP FOREIGN KEY `Orden_cliente_id_fkey`;

-- DropIndex
DROP INDEX `Orden_cliente_id_fkey` ON `orden`;

-- AlterTable
ALTER TABLE `clasificacion_usuario` DROP PRIMARY KEY,
    DROP COLUMN `cliente_id`,
    ADD COLUMN `usuario_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`usuario_id`, `video_id`);

-- AlterTable
ALTER TABLE `orden` DROP COLUMN `cliente_id`,
    ADD COLUMN `usuario_id` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `cliente`;

-- CreateTable
CREATE TABLE `Usuario` (
    `cedula` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `rol` ENUM('ADMIN', 'CLIENTE', 'GERENTE') NOT NULL,
    `created_At` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `puntos` INTEGER NOT NULL DEFAULT 0,
    `saldo` DECIMAL(10, 2) NOT NULL DEFAULT 0,

    PRIMARY KEY (`cedula`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Orden` ADD CONSTRAINT `Orden_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`cedula`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Clasificacion_usuario` ADD CONSTRAINT `Clasificacion_usuario_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`cedula`) ON DELETE RESTRICT ON UPDATE CASCADE;
