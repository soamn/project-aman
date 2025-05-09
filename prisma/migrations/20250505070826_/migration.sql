-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "tags" TEXT NOT NULL,
    "thumbnail" TEXT,
    "publishedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category" TEXT NOT NULL DEFAULT 'general',
    "Likes" INTEGER
);
INSERT INTO "new_Post" ("Likes", "content", "createdAt", "description", "featured", "id", "published", "publishedAt", "slug", "tags", "thumbnail", "title") SELECT "Likes", "content", "createdAt", "description", "featured", "id", "published", "publishedAt", "slug", "tags", "thumbnail", "title" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
