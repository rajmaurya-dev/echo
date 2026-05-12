import axios from "axios";

// Default local backend URL for the API (Hono/Cloudflare)
// You can override this using environment variables.
const API_BASE_URL =
	import.meta.env.VITE_API_URL || "http://localhost:8787/api";

export const api = axios.create({
	baseURL: API_BASE_URL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

export interface Meta {
	total: number;
	average?: number;
	page: number;
	limit: number;
}

export interface PaginatedResponse<T> {
	data: T[];
	meta: Meta;
}
