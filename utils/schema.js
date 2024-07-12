import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockAI=pgTable('mockai',{
    id:serial('id').primaryKey(),
    jsonMockResp:text('jsonMockResp').notNull(),
    jobPosition:varchar('jobposition').notNull(),
    jobDesciption:varchar('jobDescription').notNull(),
    jobExperience:varchar('jobExperience').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt'),
    mockId:varchar('mockId').notNull(),
})