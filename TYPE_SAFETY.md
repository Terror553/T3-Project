# Type Safety Improvements

## Required Changes

1. Update apiHandler.ts

```typescript
// Add Zod validation support
type ApiHandlerOptions<T, S> = {
  handler: () => Promise<T>;
  errorMessage?: string;
  responseSchema?: z.ZodType<S>;
};

type ApiResponse<T> = {
  data?: T;
  error?: string;
};
```

2. Update API Routes

- Use Zod schemas for validation
- Update return types to use ApiResponse type
- Example:

```typescript
export async function GET() {
  return apiHandler({
    handler: getCategories,
    errorMessage: "Failed to fetch forum categories",
    responseSchema: z.array(forumCategorySchema),
  });
}
```

3. Component Updates

- Use type imports from schema files
- Add proper prop types
- Example:

```typescript
type ForumCategoryItemProps = {
  category: z.infer<typeof forumCategorySchema>;
};
```

4. Type Generation

- Run `npx prisma generate` to update Prisma client types
- Update permissions on node_modules to allow type generation

5. Data Access Layer

- Add type safety to database queries
- Use Prisma's type-safe query builders
- Add Zod validation at data layer boundaries

6. API Response Handling

- Update API client functions to handle typed responses
- Add error type definitions
- Use discriminated unions for error handling

## Files to Update

1. API Routes:

- src/app/api/forum/route.ts
- src/app/api/forum/topic/[id]/route.ts
- All other API routes under src/app/api/

2. Components:

- src/components/forum/ForumCategoryItem.tsx
- src/components/forum/ForumSubcategoryItem.tsx
- Other components using database types

3. Utils:

- src/utils/apiHandler.ts
- Add new validation utilities

4. Types:

- src/server/types/forum.ts
- Other type definition files
- Add Zod schemas for all models

## Next Steps

1. Update API handler with validation support
2. Generate Prisma client types
3. Update component prop types with schema types
4. Add error boundaries and type-safe error handling
5. Run type checks and fix any issues
