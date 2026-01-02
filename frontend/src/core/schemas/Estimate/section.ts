import z from "zod";


export const SectionSchema = z.object({
  id: z.number(),
  estimateId: z.number(),
  title: z.string(),
  sortIndex: z.number(),
});

export type SectionSchemaType = z.infer<typeof SectionSchema>;

export const UpdateSectionSchema = z.object({
  title: z.string().optional(),
  sorIndex: z.number().optional(),
});

export type UpdateSectionSchemaType = z.infer<typeof UpdateSectionSchema>;
