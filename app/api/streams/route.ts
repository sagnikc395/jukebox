import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

//as no types found
//@ts-ignore
import youtubesearchapi from "youtube-search-api";

const YTRegex =
  "/^(?:(?:https?:)?//)?(?:www.)?(?:m.)?(?:youtu(?:be)?.com/(?:v/|embed/|watch(?:/|?v=))|youtu.be/)((?:w|-){11})(?:S+)?$/;";

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
    const isYt = data.url.match(YTRegex);

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

    const details = await youtubesearchapi.GetVideoDetails(extractedId);

    //thumbnails
    const thumbnails = details.thumbnail.thumbnails;
    //sort the thumbnails
    thumbnails.sort((a: { width: number }, b: { width: number }) =>
      a.width < b.width ? -1 : 1
    );

    const stream = await prismaClient.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extractedId,
        type: "Youtube", // for now, later need to add Spotify !
        title: details.title ?? "Cant find video",
        smallImg:
          (thumbnails.length > 1
            ? thumbnails[thumbnails.length - 2]
            : thumbnails[thumbnails.length - 1]) ?? "",
        bigImg: thumbnails[thumbnails.lenght - 1] ?? "",
      },
    });
    return NextResponse.json({
      message: "Added Stream",
      id: stream.id,
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

//get a specific stream
export async function GET(req: NextRequest) {
  //get a particular stream from a query parameter
  const creatorId = req.nextUrl.searchParams.get("creatorId");
  const streams = await prismaClient.stream.findMany({
    where: {
      userId: creatorId ?? "",
    },
  });
  return NextResponse.json({ streams });
}
