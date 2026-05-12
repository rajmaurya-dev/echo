import { z } from "@hono/zod-openapi";

// Accepts both string (from JSON) and Date (from Prisma)
const DateField = z.union([z.string(), z.date()]);

// ============================================
// City Schemas
// ============================================

export const CitySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  state: z.string(),
  country: z.string(),
  isActive: z.boolean(),
  createdAt: DateField,
  updatedAt: DateField,
}).openapi("City");

export const CityWithAreasSchema = CitySchema.extend({
  areas: z.array(z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
  })),
}).openapi("CityWithAreas");

export const CreateCitySchema = z.object({
  name: z.string().min(2).max(100),
  state: z.string().min(2).max(100),
  country: z.string().default("IN"),
}).openapi("CreateCity");

// ============================================
// Area Schemas
// ============================================

export const AreaSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  cityId: z.string(),
  isActive: z.boolean(),
  createdAt: DateField,
  updatedAt: DateField,
}).openapi("Area");

export const AreaWithPincodesSchema = AreaSchema.extend({
  pincodes: z.array(z.object({
    id: z.string(),
    code: z.string(),
  })),
}).openapi("AreaWithPincodes");

export const CreateAreaSchema = z.object({
  name: z.string().min(2).max(100),
  cityId: z.string(),
}).openapi("CreateArea");

// ============================================
// Pincode Schemas
// ============================================

export const PincodeSchema = z.object({
  id: z.string(),
  code: z.string(),
  areaId: z.string(),
  isActive: z.boolean(),
  createdAt: DateField,
  updatedAt: DateField,
}).openapi("Pincode");

export const CreatePincodeSchema = z.object({
  code: z.string().length(6),
  areaId: z.string(),
}).openapi("CreatePincode");

// ============================================
// Category Schemas
// ============================================

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  icon: z.string().nullable(),
  createdAt: DateField,
  updatedAt: DateField,
}).openapi("Category");

export const CreateCategorySchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().max(500).optional(),
  icon: z.string().optional(),
}).openapi("CreateCategory");

export const UpdateCategorySchema = CreateCategorySchema.partial().openapi("UpdateCategory");

// ============================================
// Business Schemas
// ============================================

export const BusinessSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  image: z.string().nullable(),
  images: z.array(z.string()),
  phone: z.string().nullable(),
  email: z.string().nullable(),
  website: z.string().nullable(),
  addressLine: z.string().nullable(),
  block: z.string().nullable(),
  areaId: z.string().nullable(),
  pincodeId: z.string().nullable(),
  categoryId: z.string(),
  ownerId: z.string(),
  featured: z.boolean(),
  verified: z.boolean(),
  isActive: z.boolean(),
  createdAt: DateField,
  updatedAt: DateField,
}).openapi("Business");

export const BusinessWithDetailsSchema = BusinessSchema.extend({
  category: CategorySchema,
  area: AreaSchema.nullable(),
  pincode: PincodeSchema.nullable(),
  _count: z.object({
    deals: z.number(),
    reviews: z.number(),
  }).optional(),
}).openapi("BusinessWithDetails");

export const CreateBusinessSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(1000).optional().or(z.literal('')),
  image: z.string().max(500).optional().or(z.literal('')),
  images: z.array(z.string()).optional().default([]),
  phone: z.string().optional().or(z.literal('')),
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email').optional().or(z.literal('')),
  website: z.string().max(200).optional().or(z.literal('')),
  addressLine: z.string().max(200).optional().or(z.literal('')),
  block: z.string().max(50).optional().or(z.literal('')),
  areaId: z.string().optional().or(z.literal('')),
  pincodeId: z.string().optional().or(z.literal('')),
  categoryId: z.string(),
}).openapi("CreateBusiness");

export const UpdateBusinessSchema = CreateBusinessSchema.partial().openapi("UpdateBusiness");

// ============================================
// Deal Schemas
// ============================================

export const DealSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  image: z.string().nullable(),
  images: z.array(z.string()),
  originalPrice: z.number(),
  discountedPrice: z.number(),
  discount: z.number(),
  highlights: z.array(z.string()),
  finePrint: z.array(z.string()),
  soldCount: z.number(),
  maxRedemptions: z.number().nullable(),
  expiresAt: DateField.nullable(),
  featured: z.boolean(),
  isActive: z.boolean(),
  businessId: z.string(),
  categoryId: z.string(),
  createdAt: DateField,
  updatedAt: DateField,
}).openapi("Deal");

export const DealWithBusinessSchema = DealSchema.extend({
  business: z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    image: z.string().nullable(),
    area: z.object({
      name: z.string(),
      city: z.object({ name: z.string() }),
    }).nullable(),
  }),
  category: CategorySchema,
}).openapi("DealWithBusiness");

export const CreateDealSchema = z.object({
  title: z.string().min(5).max(200),
  description: z.string().max(2000).optional(),
  image: z.string().max(500).optional(),
  images: z.array(z.string()).optional().default([]),
  originalPrice: z.number().positive(),
  discountedPrice: z.number().positive(),
  highlights: z.array(z.string()).optional(),
  finePrint: z.array(z.string()).optional(),
  maxRedemptions: z.number().positive().optional(),
  expiresAt: z.string().datetime().optional(),
  businessId: z.string(),
  categoryId: z.string(),
}).openapi("CreateDeal");

export const UpdateDealSchema = CreateDealSchema.partial().openapi("UpdateDeal");

// ============================================
// Review Schemas
// ============================================

export const ReviewSchema = z.object({
  id: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().nullable(),
  businessId: z.string(),
  userId: z.string(),
  createdAt: DateField,
  updatedAt: DateField,
}).openapi("Review");

export const ReviewWithUserSchema = ReviewSchema.extend({
  user: z.object({
    id: z.string(),
    name: z.string(),
    image: z.string().nullable(),
  }),
}).openapi("ReviewWithUser");

export const CreateReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().max(1000).optional(),
  businessId: z.string(),
}).openapi("CreateReview");

export const UpdateReviewSchema = z.object({
  rating: z.number().min(1).max(5).optional(),
  comment: z.string().max(1000).optional(),
}).openapi("UpdateReview");

// ============================================
// Common Schemas
// ============================================

export const PaginationQuerySchema = z.object({
  page: z.string().optional().default("1"),
  limit: z.string().optional().default("20"),
});

export const ErrorSchema = z.object({
  error: z.string(),
  message: z.string().optional(),
}).openapi("Error");

export const SuccessSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
}).openapi("Success");
