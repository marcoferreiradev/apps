import type { App, FnContext } from "$live/mod.ts";
import manifest, { Manifest } from "./manifest.gen.ts";
import { createClient } from "./utils/client.ts";

export type AppContext = FnContext<State, Manifest>;

/** @title Algolia */
export interface Props {
  /**
   * @description Algolia App ID
   */
  appId: string;

  /**
   * @description Aloglia App Key
   */
  appKey: string;
}

type State = Props & { client: ReturnType<typeof createClient> };

/**
 * @title Algolia
 */
export default function App(state: Props): App<Manifest, State> {
  return {
    state: {
      ...state,
      client: createClient(state.appId, state.appKey),
    },
    manifest,
  };
}
