// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  response: any;
  error?: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const url = req.body.url;
  if (
    url &&
    (url.startsWith("https://www.youtube.com/watch?v=") ||
      url.startsWith("https://youtu.be/"))
  ) {
    fetch(url, {
      method: "GET",
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-US,en;q=0.9",
        "accept-enconding": "gzip, deflate, br",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
        connection: "keep-alive",
      },
    })
      .then((response) => response.text())
      .then((data) => {
        try {
          data =
            data.split("var ytInitialPlayerResponse = ")[1].split("}}}};")[0] +
            "}}}}";
          res.status(200).json({ response: data });
        } catch (error: any) {
          res.status(400).json({ response: data, error: error });
        }
      });
  } else {
    res.status(400).json({ response: "Invalid url" });
  }
}
