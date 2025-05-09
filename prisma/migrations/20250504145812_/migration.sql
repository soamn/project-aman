-- AlterTable
ALTER TABLE "Post" ADD COLUMN "Likes" INTEGER;

-- CreateTable
CREATE TABLE "ImagePiece" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "Image" TEXT NOT NULL,
    "Likes" INTEGER
);
