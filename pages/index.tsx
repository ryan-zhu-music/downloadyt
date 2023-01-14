import Head from "next/head";
import { useEffect, useState, CSSProperties } from "react";
import { ImNewTab, ImSearch } from "react-icons/im";
import { RingLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "14px auto",
  borderColor: "red",
};

export default function Home() {
  const [link, setLink] = useState("");
  const [metadata, setMetadata] = useState<any>(null);
  const [video, setVideo] = useState<any>(null);
  const [audio, setAudio] = useState<any>(null);
  const [allFormats, setAllFormats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [videoType, setVideoType] = useState({
    quality: "",
    format: "video/mp4",
  });
  const [audioType, setAudioType] = useState("audio/mp4");

  let qualities: any = [];

  const getVideo = () => {
    qualities = [];
    setMetadata(null);
    setVideo(null);
    setAudio(null);
    setAllFormats(null);
    setLoading(true);
    fetch("/api/getVideo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: link }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setError("");

        if (data.error) {
          throw new Error(data.error);
        }

        setMetadata(data.response.videoDetails);
        setAllFormats(data.response.streamingData.adaptiveFormats);
        const defaultVideo = data.response.streamingData.adaptiveFormats.find(
          (format: any) => {
            return format.mimeType.includes(videoType.format);
          }
        );
        setVideo(defaultVideo);
        setVideoType({
          quality: defaultVideo.qualityLabel,
          format: "video/mp4",
        });
        setAudio(
          data.response.streamingData.adaptiveFormats.find((format: any) => {
            return format.mimeType.includes(audioType);
          })
        );
      })
      .catch((err) => {
        console.log("Error:", err);
        setLoading(false);
        setError(
          "Something went wrong. Please try again later, or try a different video."
        );
      });
  };

  useEffect(() => {
    setVideo(
      allFormats?.find(
        (format: any) =>
          format.mimeType.includes(videoType.format) &&
          format.qualityLabel == videoType.quality
      )
    );
  }, [videoType]);

  useEffect(() => {
    setAudio(
      allFormats?.find((format: any) => format.mimeType.includes(audioType))
    );
  }, [audioType]);

  const parseSeconds = (d: number) => {
    const h = String(Math.floor(d / 3600)).padStart(2, "0");
    const m = String(Math.floor((d % 3600) / 60)).padStart(2, "0");
    const s = String(Math.floor((d % 3600) % 60)).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <>
      <Head>
        <title>DownloadYT</title>
        <meta
          name="description"
          content="Download any YouTube video in video (mp4) or audio (m4a) format
          instantly!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Ryan Zhu" />
        <meta name="keywords" content="download, youtube, video, audio" />
        <meta name="theme-color" content="#B93437" />
        <meta name="msapplication-navbutton-color" content="#B93437" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#B93437" />
        <meta name="msapplication-TileColor" content="#B93437" />
        <meta name="msapplication-TileImage" content="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-screen min-h-screen flex flex-col items-center justify-center bg-[url('/background.png')] bg-cover bg-center px-10 md:px-20 lg:px-32 pt-32">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium gradient-red text-transparent !bg-clip-text uppercase text-center">
          Download<span className="font-bold">YT</span>
        </h1>
        <h2 className="text-xl md:text-2xl font-medium text-white text-center">
          Download any YouTube video in video (mp4) or audio (m4a) format
          instantly!
        </h2>
        <div className="w-5/6 md:w-[550px] h-14 mt-5 rounded-full gradient-red p-[3px]">
          <div className="w-full h-full rounded-full flex items-stretch justify-between flex-nowrap">
            <input
              type="text"
              placeholder="e.g. https://www.youtube.com/watch?v=fs-eur71DRA"
              className="w-full text-white text-base md:text-lg rounded-l-full pl-4 font-normal focus:outline-none placeholder:italic placeholder:text-light-red bg-dark-red focus:medium-red hover:medium-red duration-500"
              onChange={(e) => setLink(e.target.value.trim())}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  getVideo();
                }
              }}
            />
            <button
              className="w-14 text-2xl hover:w-20 duration-500 flex justify-center items-center rounded-r-full bg-[#B93437] text-white font-medium"
              onClick={getVideo}
              name="Search"
            >
              <ImSearch />
            </button>
          </div>
        </div>
        {error && (
          <p className="w-5/6 md:w-[550px] h-14 mt-5 text-red-400 text-center">
            {error}
          </p>
        )}
        <RingLoader
          color={"#B93437"}
          loading={loading}
          size={100}
          cssOverride={override}
        />
        <div
          className={
            "w-full mt-10 grid md:grid-cols-2 md:grid-rows-1 gap-10 duration-500 ease-in-out " +
            (!(video && audio && metadata)
              ? "max-h-0 overflow-y-hidden"
              : "max-h-[1000px]")
          }
        >
          <div className="w-full p-2 gradient-red">
            <div className="w-full h-full bg-dark-red p-5">
              {metadata && (
                <>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white">
                    {metadata?.title}
                  </h3>
                  <div className="h-1 w-20 bg-white opacity-50 my-4"></div>
                  <ul className="text-base md:text-lg text-white">
                    <li className="flex">
                      Channel:
                      <a
                        href={
                          "https://www.youtube.com/channel/" +
                          metadata?.channelId
                        }
                        className="ml-1 text-base md:text-lg text-light-red underline flex items-center justify-start"
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {metadata?.author}
                        <ImNewTab className="inline-block ml-1 mb-1" />
                      </a>
                    </li>
                    <li>
                      Views:{" "}
                      <span className="text-light-red">
                        {metadata?.viewCount}
                      </span>
                    </li>
                    <li>
                      Duration:{" "}
                      <span className="text-light-red">
                        {parseSeconds(metadata?.lengthSeconds)}
                      </span>
                    </li>
                    <li>
                      Video quality:{" "}
                      <select
                        className="text-light-red rounded ml-2 p-2 bg-dark-red"
                        onChange={(e) => {
                          setVideo(null);
                          setVideoType({
                            quality: e.target.value,
                            format: videoType.format,
                          });
                        }}
                      >
                        {allFormats?.map((format: any, index: number) => {
                          if (
                            format.mimeType.includes("video/mp4") &&
                            !qualities.includes(format.quality)
                          ) {
                            qualities.push(format.quality);
                            return (
                              <option key={index} className="p-1">
                                {format.qualityLabel}
                              </option>
                            );
                          }
                        })}
                      </select>
                    </li>
                    <li>
                      Video format:{" "}
                      <form className="flex flex-col justify-center items-start">
                        <div className="flex">
                          <input
                            className="ml-6"
                            type="radio"
                            name="Video format"
                            id="mp4"
                            value="mp4"
                            onChange={() => {
                              setVideo(null);
                              setVideoType({
                                quality: videoType.quality,
                                format: "video/mp4",
                              });
                            }}
                          />
                          <label className="ml-1" htmlFor="mp4">
                            mp4
                          </label>
                        </div>
                        <div className="flex">
                          <input
                            className="ml-6"
                            type="radio"
                            name="format"
                            id="webm"
                            value="webm"
                            onChange={() => {
                              setVideo(null);
                              setVideoType({
                                quality: videoType.quality,
                                format: "video/webm",
                              });
                            }}
                          />
                          <label className="ml-1" htmlFor="webm">
                            webm
                          </label>
                        </div>
                      </form>
                    </li>
                    <li>
                      Audio format:{" "}
                      <form className="flex flex-col justify-center items-start">
                        <div className="flex">
                          <input
                            className="ml-6"
                            type="radio"
                            name="Audio format"
                            id="m4a"
                            value="m4a"
                            onChange={() => {
                              setAudio(null);
                              setAudioType("audio/mp4");
                            }}
                          />
                          <label className="ml-1" htmlFor="m4a">
                            m4a
                          </label>
                        </div>
                        <div className="flex">
                          <input
                            className="ml-6"
                            type="radio"
                            name="format"
                            id="weba"
                            value="weba"
                            onChange={() => {
                              setAudio(null);
                              setAudioType("audio/webm");
                            }}
                          />
                          <label className="ml-1" htmlFor="webm">
                            webm
                          </label>
                        </div>
                      </form>
                    </li>
                  </ul>
                  <p className="text-sm md:text-base text-light-red mt-10">
                    Hint: click the three dots (⋮) on the right to download!
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="w-full">
            {video && (
              <div className="flex flex-col mb-7">
                <h4 className="text-xl md:text-2xl font-semibold text-white mb-1">
                  MP4 Video ({video.width}x{video.height})
                </h4>
                <div className="p-2 gradient-red">
                  <video controls className="w-full h-full">
                    <source src={video.url} type="video/mp4" />
                  </video>
                </div>
              </div>
            )}
            {audio && (
              <div className="flex flex-col">
                <h4 className="text-xl md:text-2xl font-semibold text-white mb-1">
                  M4A Audio
                </h4>
                <div className="p-2 gradient-red rounded-full">
                  <audio controls className="w-full">
                    <source src={audio.url} type="audio/mp4" />
                  </audio>
                </div>
              </div>
            )}
          </div>
        </div>
        <footer className="w-full py-16 flex flex-col justify-center items-center">
          <p className="text-light-red text-base md:text-md">
            View{" "}
            <a
              href="https://github.com/ryan-zhu-music/youtube-downloader"
              target="_blank"
              rel="noreferrer noopener"
              className="font-bold underline hover:text-red-500/50 duration-500"
            >
              GitHub repo
            </a>
          </p>
          <p className="text-light-red text-base md:text-md">
            Made with Next.js by{" "}
            <a
              href="https://www.ryanzhu.com"
              target="_blank"
              rel="noreferrer noopener"
              className="font-bold underline hover:text-red-500/50 duration-500"
            >
              Ryan Zhu
            </a>
          </p>
        </footer>
      </main>
    </>
  );
}
