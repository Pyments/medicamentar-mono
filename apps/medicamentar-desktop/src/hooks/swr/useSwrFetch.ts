import useSWR from "swr";
import { useLocalStorage } from "@hooks/UseLocalStorage";
import axiosInstance from "@utils/axiosInstance";

interface User {
  token: {
    data: string;
  };
}

interface FetcherOptions {
  page?: number;
  size?: number;
  additionalParams?: Record<string, any>;
}

const fetcher = async (url: string, options: FetcherOptions = {}) => {
  const storedUser = localStorage.getItem("user");
  const user: User | null = storedUser ? JSON.parse(storedUser) : null;
  const token = user?.token.data;

  if (!token) {
    throw new Error("No authentication token found");
  }

  const { page = 0, size = 9, additionalParams = {} } = options;

  const queryParams = new URLSearchParams();
  queryParams.append("page", page.toString());
  queryParams.append("size", size.toString());

  Object.entries(additionalParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, value.toString());
    }
  });

  const queryString = queryParams.toString();
  const fullUrl = `${url}${queryString ? `?${queryString}` : ""}`;

  try {
    const response = await axiosInstance.get(fullUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export function useSwrFetch(
  url: string,
  options: FetcherOptions = {},
  swrOptions = {}
) {
  const [user] = useLocalStorage<User | null>("user", null);
  const token = user?.token.data;
  const shouldFetch = !!token;

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    shouldFetch ? [url, options] : null,
    ([url, options]) => fetcher(url, options),
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      dedupingInterval: 5000,
      ...swrOptions,
    }
  );

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
}
