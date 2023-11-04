import type { AppContext as AC, App } from "deco/mod.ts";
import type { ImageWidget, VideoWidget } from "../admin/widgets.ts";
import manifest, { Manifest } from "./manifest.gen.ts";

export interface VideoProps {
  /**
   * @title ID da coleção ou do produto
   */
  id: string;
  /**
   * @title Upload do video
   */
  videoSrc: VideoWidget;
  /**
   * @title Thumbnaild o video
   */
  thumbnailVideo: ImageWidget;
  label: string;
}

// deno-lint-ignore ban-types
export interface ConfigShopFeed {
  /**
   * @title Adicionar videos
   */
  videosForProduct: VideoProps[];
  /**
   * @title Adicionar ao produtor por:
   */
  filterFor: "collectionId" | "productId";
}
/**
 * @title Feed Shop
 */
export default function App(
  state: ConfigShopFeed,
): App<Manifest, ConfigShopFeed> {
  return { manifest, state };
}

export type AppContext = AC<ReturnType<typeof App>>;
