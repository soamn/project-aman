import { S3Client } from "@aws-sdk/client-s3";

export const r2 = new S3Client({
  endpoint: process.env.ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
  region: "auto",
});
