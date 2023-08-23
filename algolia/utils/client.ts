import algolia from "https://esm.sh/algoliasearch@4.19.1";

export const createClient = (appId: string, appKey: string) =>
  algolia(appId, appKey);
