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
    const data = CreateStreamSchema.parse(await req.json());
    const isYt = YTRegex.test(data.url);

    if (!isYt) {
      return NextResponse.json(
        {
          message: "Wrong URL Format",
        },
        {
          status: 411,
        }
      );
    }

    //split after the v keyword to get the actual id
    const extractedId = data.url.split("?v=")[1];

    await prismaClient.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extractedId,
        type: "Youtube", // for now, later need to add Spotify !
      },
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
