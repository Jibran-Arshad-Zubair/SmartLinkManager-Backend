-- CreateTable
CREATE TABLE "SiteLink" (
    "id" SERIAL NOT NULL,
    "siteUrl" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "coverImage" TEXT,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SiteLink_siteUrl_key" ON "SiteLink"("siteUrl");

-- AddForeignKey
ALTER TABLE "SiteLink" ADD CONSTRAINT "SiteLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
