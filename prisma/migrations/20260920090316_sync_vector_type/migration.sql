/*
  Warnings:

  - Made the column `embedding` on table `SourceChunk` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SourceChunk" ALTER COLUMN "embedding" SET NOT NULL;
