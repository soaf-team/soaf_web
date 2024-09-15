import { useGetYoutubeQuery } from "@/hooks";
import { Youtube } from "@/types";
import React, { useState } from "react";
import { YoutubeItem, YoutubeItemProps } from "./YoutubeItems";
import { SearchInput } from "../../_components";

interface Props {
  onNextStep: () => void;
  setYoutubeInfo: React.Dispatch<React.SetStateAction<YoutubeItemProps>>;
}

export const SearchYoutubeList = ({ onNextStep, setYoutubeInfo }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { youtube } = useGetYoutubeQuery({
    videoId: searchQuery.split("v=")[1],
  });

  const handleItemClick = (video: Youtube["items"][0]) => {
    setYoutubeInfo({
      title: video.snippet.title,
      channelTitle: video.snippet.channelTitle,
      publishedAt: video.snippet.publishedAt,
      thumbnail: video.snippet.thumbnails.medium.url,
    });
    onNextStep();
  };

  return (
    <>
      <SearchInput type="youtube" setSearchQuery={setSearchQuery} />

      <YoutubeItem
        key={youtube?.id}
        type="search"
        onClick={() => handleItemClick(youtube)}
        youtube={
          youtube && {
            title: youtube.snippet.title,
            channelTitle: youtube.snippet.channelTitle,
            publishedAt: youtube.snippet.publishedAt,
            thumbnail: youtube.snippet.thumbnails.medium.url,
          }
        }
      />
    </>
  );
};
