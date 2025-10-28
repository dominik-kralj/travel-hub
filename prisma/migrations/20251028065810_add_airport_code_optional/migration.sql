/*
  Warnings:

  - You are about to drop the column `airlineId` on the `Route` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Airline" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL DEFAULT 'TEMP_CODE',
    "countryId" INTEGER,
    CONSTRAINT "Airline_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Airline" ("countryId", "id", "name") SELECT "countryId", "id", "name" FROM "Airline";
DROP TABLE "Airline";
ALTER TABLE "new_Airline" RENAME TO "Airline";
CREATE UNIQUE INDEX "Airline_code_key" ON "Airline"("code");
CREATE TABLE "new_Airport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL DEFAULT 'TEMP_CODE',
    "iata" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "countryId" INTEGER NOT NULL,
    CONSTRAINT "Airport_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Airport" ("countryId", "iata", "id", "latitude", "longitude", "name") SELECT "countryId", "iata", "id", "latitude", "longitude", "name" FROM "Airport";
DROP TABLE "Airport";
ALTER TABLE "new_Airport" RENAME TO "Airport";
CREATE UNIQUE INDEX "Airport_code_key" ON "Airport"("code");
CREATE UNIQUE INDEX "Airport_iata_key" ON "Airport"("iata");
CREATE TABLE "new_Route" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fromAirportId" INTEGER NOT NULL,
    "toAirportId" INTEGER NOT NULL,
    CONSTRAINT "Route_fromAirportId_fkey" FOREIGN KEY ("fromAirportId") REFERENCES "Airport" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Route_toAirportId_fkey" FOREIGN KEY ("toAirportId") REFERENCES "Airport" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Route" ("fromAirportId", "id", "toAirportId") SELECT "fromAirportId", "id", "toAirportId" FROM "Route";
DROP TABLE "Route";
ALTER TABLE "new_Route" RENAME TO "Route";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
