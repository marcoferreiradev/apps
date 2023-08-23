import { Product, ProductListingPage } from "../../commerce/types.ts";
import { AppContext } from "../mod.ts";

export const VNDA_SORT_OPTIONS: SortOption[] = [
  { value: "", label: "Relevância" },
  { value: "newest", label: "Mais recentes" },
  { value: "oldest", label: "Mais antigos" },
  { value: "lowest_price", label: "Menor preço" },
  { value: "highest_price", label: "Maior preço" },
];

export interface Props {
  /**
   * @title Items per page
   * @description number of products per page to display
   */
  count: number;
}

/**
 * @title Algolia Integration
 * @description Product Listing Page loader
 */
const searchLoader = async (
  props: Props,
  req: Request,
  ctx: AppContext,
): Promise<ProductListingPage | null> => {
  // get url from params
  const url = new URL(req.url);
  const { client } = ctx;

  const term = url.searchParams.get("q");

  const response = await client.search([{
    query: term!,
    indexName: "PROD_pwa_ecom_ui_template_products",
  }]);

  const products: Product[] = response.results[0].hits.map((
    hit,
  ): Product => {
    return {
      "@type": "Product",
      productID: hit.sku,
      sku: hit.sku,
      name: hit.name,
      description: hit.description,
      image: hit.image_urls.map((url) => ({ url, alternateName: "" })),
      offers: {
        "@type": "AggregateOffer",
        highPrice: hit.price.value,
        lowPrice: hit.price.value,
        offerCount: 1,
        offers: [
          {
            "@type": "Offer",
            price: hit.price.value,
            availability: "https://schema.org/InStock",
            inventoryLevel: {
              value: 20,
            },
            priceSpecification: [
              {
                "@type": "UnitPriceSpecification",
                "price": hit.price.value,
                "priceType": "https://schema.org/SalePrice",
              },
            ],
          },
        ],
      },
    };
  });

  return {
    "@type": "ProductListingPage",
    seo: undefined,
    // TODO: Find out what's the right breadcrumb on vnda
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [],
      numberOfItems: 0,
    },
    filters: [],
    products: products,
    pageInfo: {
      nextPage: undefined,
      previousPage: undefined,
      currentPage: 0, // page,
      records: 0, // pagination.total_count,
      recordPerPage: 0, // count,
    },
    sortOptions: [],
  };
};

export default searchLoader;
