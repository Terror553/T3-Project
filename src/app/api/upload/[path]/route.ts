import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";
import { s3 } from "~/server/s3";

export async function POST(req: Request) {
  try {
    const path = new URL(req.url).pathname.split("/").pop();
    const body = (await req.json()) as {
      fileName: string;
      contentType: string;
    };

    const key = `${randomUUID()}-${body.fileName}`;

    const command = new PutObjectCommand({
      Bucket: path,
      Key: key,
      ContentType: body.contentType,
    });

    const url = await getSignedUrl(s3, command, {
      expiresIn: 60 * 5,
    });

    return Response.json({
      url,
      key,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to create upload URL" },
      { status: 500 },
    );
  }
}
