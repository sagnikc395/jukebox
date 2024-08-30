import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const YTRegex = new RegExp(
  "^(https?://)?(www.)?(youtube.com|youtu.be)/(watch?v=)?([a-zA-Z0-9_-]{11})"
);
const SpotifyRegex = new RegExp(
  "^(https://open.spotify.com/(track|album|playlist|artist)/[a-zA-Z0-9]+)(?si=[a-zA-Z0-9]+)?$"
);

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
    const isYt = data.url.includes("youtube");

    prismaClient.stream.create({
      userId: data.creatorId,
      url: data.url,
    });
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
