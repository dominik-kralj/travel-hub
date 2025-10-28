/*
  Warnings:

  - You are about to drop the column `code` on the `Airport` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Airport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "iata" TEXT NOT NULL,
    "icao" TEXT,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "countryId" INTEGER NOT NULL,
    CONSTRAINT "Airport_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Airport" ("countryId", "iata", "id", "latitude", "longitude", "name") SELECT "countryId", "iata", "id", "latitude", "longitude", "name" FROM "Airport";
DROP TABLE "Airport";
ALTER TABLE "new_Airport" RENAME TO "Airport";
CREATE UNIQUE INDEX "Airport_iata_key" ON "Airport"("iata");
CREATE UNIQUE INDEX "Airport_icao_key" ON "Airport"("icao");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
