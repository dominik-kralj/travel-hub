/*
  Warnings:

  - You are about to drop the column `code` on the `Airline` table. All the data in the column will be lost.
  - The primary key for the `AirlinesOnAirports` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `AirlinesOnAirports` table. All the data in the column will be lost.
  - Made the column `countryId` on table `Airline` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `airlineId` to the `Route` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Airline" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "countryId" INTEGER NOT NULL,
    CONSTRAINT "Airline_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Airline" ("countryId", "id", "name") SELECT "countryId", "id", "name" FROM "Airline";
DROP TABLE "Airline";
ALTER TABLE "new_Airline" RENAME TO "Airline";
CREATE TABLE "new_AirlinesOnAirports" (
    "airlineId" INTEGER NOT NULL,
    "airportId" INTEGER NOT NULL,

    PRIMARY KEY ("airlineId", "airportId"),
    CONSTRAINT "AirlinesOnAirports_airlineId_fkey" FOREIGN KEY ("airlineId") REFERENCES "Airline" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "AirlinesOnAirports_airportId_fkey" FOREIGN KEY ("airportId") REFERENCES "Airport" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_AirlinesOnAirports" ("airlineId", "airportId") SELECT "airlineId", "airportId" FROM "AirlinesOnAirports";
DROP TABLE "AirlinesOnAirports";
ALTER TABLE "new_AirlinesOnAirports" RENAME TO "AirlinesOnAirports";
CREATE TABLE "new_Route" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fromAirportId" INTEGER NOT NULL,
    "toAirportId" INTEGER NOT NULL,
    "airlineId" INTEGER NOT NULL,
    CONSTRAINT "Route_fromAirportId_fkey" FOREIGN KEY ("fromAirportId") REFERENCES "Airport" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Route_toAirportId_fkey" FOREIGN KEY ("toAirportId") REFERENCES "Airport" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Route_airlineId_fkey" FOREIGN KEY ("airlineId") REFERENCES "Airline" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Route" ("fromAirportId", "id", "toAirportId") SELECT "fromAirportId", "id", "toAirportId" FROM "Route";
DROP TABLE "Route";
ALTER TABLE "new_Route" RENAME TO "Route";
CREATE UNIQUE INDEX "Route_fromAirportId_toAirportId_airlineId_key" ON "Route"("fromAirportId", "toAirportId", "airlineId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
