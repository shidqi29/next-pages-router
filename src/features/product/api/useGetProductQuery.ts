import useSWR from "swr";

import { fetcher } from "@/utils/fetcher";

export const useGetProductQuery = (id: string) => {
  const { data, error, isLoading } = useSWR(`/api/products/${id}`, fetcher);

  return {
    data,
    error,
    isLoading,
  };
};
