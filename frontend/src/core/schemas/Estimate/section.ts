import z from "zod";


export const SectionSchema = z.object({
  id: z.number(),
  estimateId: z.number(),
  title: z.string(),
  sortIndex: z.number(),
});

export type SectionSchemaType = z.infer<typeof SectionSchema>;

export const CreateSectionSchema = z.object({
  title: z.string().optional(),
  estimateId: z.number(),
});

export type CreateSectionSchemaType = z.infer<typeof CreateSectionSchema>;
