CREATE TABLE "ContactSubmission" (
    "id" UUID NOT NULL,
    "idempotencyKey" UUID NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "need" VARCHAR(80) NOT NULL,
    "consentVersion" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ContactSubmission_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "NewsletterSubscriber" (
    "id" UUID NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "consentVersion" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "NewsletterSubscriber_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ContactSubmission_idempotencyKey_key" ON "ContactSubmission"("idempotencyKey");
CREATE INDEX "ContactSubmission_createdAt_idx" ON "ContactSubmission"("createdAt");
CREATE UNIQUE INDEX "NewsletterSubscriber_email_key" ON "NewsletterSubscriber"("email");
CREATE INDEX "NewsletterSubscriber_createdAt_idx" ON "NewsletterSubscriber"("createdAt");
