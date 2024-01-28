import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export const useGetProductsQuery = () => {
  const { data, error, isLoading } = useSWR("/api/products", fetcher);

  return {
    data,
    error,
    isLoading,
  };
};
