import { drizzle } from 'drizzle-orm/postgres-js';
import { users_summary } from './schema.js';
import { eq } from 'drizzle-orm';
const db = drizzle(process.env.DB_URI ?? "");
export const getUserSummary = async (id) => {
    const result = await db.select()
        .from(users_summary)
        .where(eq(users_summary.id, id));
    return result[0] ?? null;
};
export const addUserSummary = async (summaryData) => {
    const result = await db.insert(users_summary)
        .values(summaryData)
        .returning();
    return result[0] ?? null;
};
export const updateUserSummary = async (id, dataToUpdate) => {
    if (Object.keys(dataToUpdate).length === 0) {
        return null;
    }
    const result = await db.update(users_summary)
        .set(dataToUpdate)
        .where(eq(users_summary.id, id))
        .returning();
    return result[0] ?? null;
};
