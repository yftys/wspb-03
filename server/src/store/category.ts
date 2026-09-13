// server/src/store/category.ts
import { randomUUID } from "node:crypto";
import type { Category, NewCategory } from "../types/category.js";

// In-memory storage: resets whenever the server restarts. Seeded with a
// couple of sample categories so the app has something to show on first run.
const categories: Category[] = [
    { id: randomUUID(), name: "Groceries" },
    { id: randomUUID(), name: "Transport" },
];

export function getCategories(): Category[] {
    // TODO: return the categories array.
    // Reference: getExpenses() in store/expense.ts.
}

export function addCategory(newCategory: NewCategory): Category {
    // TODO: build a Category by generating an id and spreading newCategory,
    // push it onto the array, and return it.
    // Reference: addExpense().
}

// Returns the updated category, or null if no category has this id.
export function updateCategory(
    id: string,
    update: NewCategory,
): Category | null {
    // TODO: find the category by id; if none, return null;
    // otherwise Object.assign the update onto it and return it.
    // Reference: updateExpense().
}

// Returns true if a category was removed, false if no category has this id.
export function deleteCategory(id: string): boolean {
    // TODO: find the index by id; if -1, return false;
    // otherwise splice it out and return true.
    // Reference: deleteExpense().
}
