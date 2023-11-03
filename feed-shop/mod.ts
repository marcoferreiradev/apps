import type { App, AppContext as AC } from "deco/mod.ts";
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
}

// deno-lint-ignore ban-types
export interface ConfigShopFeed {
  /**
   * @title Adicione videos aos seus produtos exclusivos
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
