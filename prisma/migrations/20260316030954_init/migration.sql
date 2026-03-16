-- CreateTable
CREATE TABLE `Participante` (
    `id_participante` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `fecha_nacimiento` DATETIME(3) NULL,

    PRIMARY KEY (`id_participante`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `id_categoria` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Categoria_nombre_key`(`nombre`),
    PRIMARY KEY (`id_categoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Idioma` (
    `id_idioma` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Idioma_nombre_key`(`nombre`),
    PRIMARY KEY (`id_idioma`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Coleccion` (
    `isan` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `volumen` INTEGER NOT NULL,

    PRIMARY KEY (`isan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Clasificacion` (
    `tipo` ENUM('G', 'PG', 'PG-13', 'R', 'NC-17') NOT NULL,
    `descripcion` VARCHAR(191) NULL,

    PRIMARY KEY (`tipo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Serie` (
    `id_serie` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `sinopsis` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_serie`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cliente` (
    `cedula` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `created_At` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `puntos` INTEGER NOT NULL DEFAULT 0,
    `saldo` DECIMAL(10, 2) NOT NULL DEFAULT 0,

    PRIMARY KEY (`cedula`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Video` (
    `isan` VARCHAR(191) NOT NULL,
    `titulo_original` VARCHAR(191) NOT NULL,
    `anio_produccion` INTEGER NOT NULL,
    `duracion_min` INTEGER NOT NULL,
    `clasificacion_id` ENUM('G', 'PG', 'PG-13', 'R', 'NC-17') NOT NULL,
    `serie_id` INTEGER NULL,

    PRIMARY KEY (`isan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Video_participante` (
    `rol` ENUM('Actor', 'Productor', 'Director', 'Invitado') NOT NULL,
    `video_id` VARCHAR(191) NOT NULL,
    `participante_id` INTEGER NOT NULL,

    UNIQUE INDEX `Video_participante_video_id_key`(`video_id`),
    UNIQUE INDEX `Video_participante_participante_id_key`(`participante_id`),
    PRIMARY KEY (`video_id`, `participante_id`, `rol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Video_categoria` (
    `video_id` VARCHAR(191) NOT NULL,
    `categoria_id` INTEGER NOT NULL,

    UNIQUE INDEX `Video_categoria_video_id_key`(`video_id`),
    UNIQUE INDEX `Video_categoria_categoria_id_key`(`categoria_id`),
    PRIMARY KEY (`video_id`, `categoria_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Video_idioma` (
    `tipo` ENUM('Original', 'Doblaje', 'Subtitulo') NOT NULL,
    `video_id` VARCHAR(191) NOT NULL,
    `idioma_id` INTEGER NOT NULL,

    UNIQUE INDEX `Video_idioma_video_id_key`(`video_id`),
    UNIQUE INDEX `Video_idioma_idioma_id_key`(`idioma_id`),
    PRIMARY KEY (`video_id`, `idioma_id`, `tipo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Video_coleccion` (
    `video_id` VARCHAR(191) NOT NULL,
    `coleccion_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Video_coleccion_video_id_key`(`video_id`),
    UNIQUE INDEX `Video_coleccion_coleccion_id_key`(`coleccion_id`),
    PRIMARY KEY (`video_id`, `coleccion_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Orden_Detalle` (
    `id_detalle` INTEGER NOT NULL AUTO_INCREMENT,
    `orden_id` INTEGER NOT NULL,
    `video_id` VARCHAR(191) NOT NULL,
    `tipo_transaccion` ENUM('Compra', 'Alquiler') NOT NULL,
    `precio_unitario` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id_detalle`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Orden` (
    `id_orden` INTEGER NOT NULL AUTO_INCREMENT,
    `cliente_id` VARCHAR(191) NOT NULL,
    `fechar_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `estado` ENUM('PENDIENTE', 'COMPLETADA', 'CANCELADA') NOT NULL DEFAULT 'PENDIENTE',
    `total` DECIMAL(10, 2) NOT NULL,
    `puntos_ganados` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id_orden`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Clasificacion_usuario` (
    `cliente_id` VARCHAR(191) NOT NULL,
    `video_id` VARCHAR(191) NOT NULL,
    `puntuacion` ENUM('Excelente', 'buena', 'Regular', 'Mala') NOT NULL,
    `comentario` VARCHAR(191) NULL,
    `created_At` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`cliente_id`, `video_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Video` ADD CONSTRAINT `Video_clasificacion_id_fkey` FOREIGN KEY (`clasificacion_id`) REFERENCES `Clasificacion`(`tipo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Video` ADD CONSTRAINT `Video_serie_id_fkey` FOREIGN KEY (`serie_id`) REFERENCES `Serie`(`id_serie`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Video_participante` ADD CONSTRAINT `Video_participante_video_id_fkey` FOREIGN KEY (`video_id`) REFERENCES `Video`(`isan`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Video_participante` ADD CONSTRAINT `Video_participante_participante_id_fkey` FOREIGN KEY (`participante_id`) REFERENCES `Participante`(`id_participante`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Video_categoria` ADD CONSTRAINT `Video_categoria_video_id_fkey` FOREIGN KEY (`video_id`) REFERENCES `Video`(`isan`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Video_categoria` ADD CONSTRAINT `Video_categoria_categoria_id_fkey` FOREIGN KEY (`categoria_id`) REFERENCES `Categoria`(`id_categoria`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Video_idioma` ADD CONSTRAINT `Video_idioma_video_id_fkey` FOREIGN KEY (`video_id`) REFERENCES `Video`(`isan`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Video_idioma` ADD CONSTRAINT `Video_idioma_idioma_id_fkey` FOREIGN KEY (`idioma_id`) REFERENCES `Idioma`(`id_idioma`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Video_coleccion` ADD CONSTRAINT `Video_coleccion_video_id_fkey` FOREIGN KEY (`video_id`) REFERENCES `Video`(`isan`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Video_coleccion` ADD CONSTRAINT `Video_coleccion_coleccion_id_fkey` FOREIGN KEY (`coleccion_id`) REFERENCES `Coleccion`(`isan`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orden_Detalle` ADD CONSTRAINT `Orden_Detalle_orden_id_fkey` FOREIGN KEY (`orden_id`) REFERENCES `Orden`(`id_orden`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orden_Detalle` ADD CONSTRAINT `Orden_Detalle_video_id_fkey` FOREIGN KEY (`video_id`) REFERENCES `Video`(`isan`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orden` ADD CONSTRAINT `Orden_cliente_id_fkey` FOREIGN KEY (`cliente_id`) REFERENCES `Cliente`(`cedula`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Clasificacion_usuario` ADD CONSTRAINT `Clasificacion_usuario_cliente_id_fkey` FOREIGN KEY (`cliente_id`) REFERENCES `Cliente`(`cedula`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Clasificacion_usuario` ADD CONSTRAINT `Clasificacion_usuario_video_id_fkey` FOREIGN KEY (`video_id`) REFERENCES `Video`(`isan`) ON DELETE RESTRICT ON UPDATE CASCADE;
