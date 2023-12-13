-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "card" TEXT NOT NULL,
    "tranches" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "obs" TEXT NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);
