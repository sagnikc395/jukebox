import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CreateStreamSchema = z.object({
  creatorId: z.string(),
  //regex check for spotify or youtube; TODO!
  url: z.string(),
});

export async function POST(req: NextRequest) {
  //user will send the id of the creator where they will send the stream
  //using zod to parse the correct data
  try {
    const data = CreateStreamSchema.safeParse(await req.json());
    prismaClient.stream.create({});
  } catch (e) {
    return NextResponse.json(
      {
        message: "Error while adding a stream",
      },
      {
        status: 411,
      }
    );
  }
}
