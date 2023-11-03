import { PropertyValue, Thing } from "../../commerce/types.ts";
import type { ConfigShopFeed } from "../mod.ts";

export const createClient = (params: ConfigShopFeed) => {
  if (!params) return;
  const { videosForProduct } = params;

  const filterByProductId = ({
    productId,
  }: {
    productId: string;
  }): Thing | undefined => {
    const currentVideo = videosForProduct.find(({ id }) => id === productId);

    if (!currentVideo) return undefined;

    return {
      "@type": "Thing",
      video: [
        {
          "@type": "VideoObject",
          thumbnail: currentVideo.thumbnailVideo,
          url: currentVideo.videoSrc,
        },
      ],
    };
  };
  const filterByCollectionId = ({
    possibleCollections,
  }: {
    possibleCollections: PropertyValue[] | undefined;
  }): Thing | undefined => {
    if (!possibleCollections) return undefined;

    const currentVideo = videosForProduct.find(({ id }) =>
      possibleCollections.find(({ value }) => value === id)
    );

    if (!currentVideo) return undefined;

    return {
      "@type": "Thing",
      video: [
        {
          "@type": "VideoObject",
          thumbnail: currentVideo.thumbnailVideo,
          url: currentVideo.videoSrc,
        },
      ],
    };
  };

  return {
    filterByProductId,
    filterByCollectionId,
  };
};
