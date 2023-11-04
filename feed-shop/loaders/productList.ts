import { Product } from "../../commerce/types.ts";
import { ExtensionOf } from "../../website/loaders/extension.ts";
import { AppContext } from "../mod.ts";
import { createClient } from "../utils/client.ts";

const getProductId = (product: Product) => product.isVariantOf!.productGroupID;
const getCollectionIds = (product: Product) =>
  product.additionalProperty?.filter(({ propertyID }) =>
    propertyID === "cluster"
  );

/**
 * @title Feed shop - Videos for Products[]
 */
export default function productList(
  _config: unknown,
  _req: Request,
  ctx: AppContext,
): ExtensionOf<Product[] | null> {
  const client = createClient({ ...ctx });

  return (products: Product[] | null) => {
    if (!products) {
      return null;
    }

    if (!client) {
      return products;
    }

    return products.map((product) => {
      const productId = getProductId(product);
      console.log("ProductID ->", productId);
      const possibleCollections = getCollectionIds(product);
      const teste = {
        collectionId: () =>
          client.filterByCollectionId({ possibleCollections }),
        productId: () => client.filterByProductId({ productId }),
      } as const;

      const additionalData = teste[ctx.filterFor]();
      const customData = product.customData ?? [];

      if (!additionalData) {
        return {
          ...product,
        };
      }

      return {
        ...product,
        customData: [...customData, additionalData],
      };
    });
  };
}
