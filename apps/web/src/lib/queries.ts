import { useQuery } from "@tanstack/react-query";
import { api, type PaginatedResponse } from "./api";

// Assuming types from your schema loosely translate to these interfaces:
export interface Business {
	id: string;
	name: string;
	slug: string;
	description: string | null;
	image: string | null;
	phone: string | null;
	email: string | null;
	addressLine: string | null;
	areaId: string | null;
	area: { id: string; name: string; cityId: string } | null;
	category: { id: string; name: string };
	deals: Deal[];
	featured?: boolean;
	hours?: {
		dayOfWeek: number;
		openTime: string;
		closeTime: string;
		isClosed: boolean;
	}[];
	_count?: {
		deals: number;
		reviews: number;
	};
}

export interface Deal {
	id: string;
	title: string;
	slug: string;
	description: string | null;
	originalPrice: number;
	discountedPrice: number;
	discount: number;
	image: string | null;
	highlights: string[];
	finePrint: string[];
	soldCount?: number;
	expiresAt?: string;
	category: { id: string; name: string };
	featured?: boolean;
	business: {
		id: string;
		name: string;
		description?: string | null;
		area?: { name: string };
		hours?: {
			dayOfWeek: number;
			openTime: string;
			closeTime: string;
			isClosed: boolean;
		}[];
	};
}

// --- Hooks ---

export const useBusinesses = (params?: {
	category?: string;
	limits?: number;
}) => {
	return useQuery({
		queryKey: ["businesses", params],
		queryFn: async () => {
			const { data } = await api.get<PaginatedResponse<Business>>(
				"/businesses",
				{
					params: {
						limit: params?.limits || 20,
						category: params?.category,
					},
				},
			);
			return data;
		},
	});
};

export const useMyBusinesses = () => {
	return useQuery({
		queryKey: ["my-businesses"],
		queryFn: async () => {
			const { data } = await api.get<Business[]>("/businesses/me");
			return data;
		},
	});
};

export const useDeals = (params?: {
	category?: string;
	limits?: number;
	businessId?: string;
}) => {
	return useQuery({
		queryKey: ["deals", params],
		queryFn: async () => {
			const { data } = await api.get<PaginatedResponse<Deal>>("/deals", {
				params: {
					limit: params?.limits || 20,
					category: params?.category,
					businessId: params?.businessId,
				},
			});
			return data;
		},
	});
};

export const useBusiness = (id: string) => {
	return useQuery({
		queryKey: ["business", id],
		queryFn: async () => {
			const { data } = await api.get<Business>(`/businesses/${id}`);
			return data;
		},
		enabled: !!id,
	});
};

export const useDeal = (id: string) => {
	return useQuery({
		queryKey: ["deal", id],
		queryFn: async () => {
			const { data } = await api.get<Deal>(`/deals/${id}`);
			return data;
		},
		enabled: !!id,
	});
};

export const useBusinessCategories = () => {
	return useQuery({
		queryKey: ["categories"],
		queryFn: async () => {
			try {
				const { data } =
					await api.get<
						{ id: string; name: string; icon: string; slug: string }[]
					>("/categories");
				return data;
			} catch (_err) {
				return [];
			}
		},
	});
};
