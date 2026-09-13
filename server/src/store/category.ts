// server/src/store/category.ts
import { randomUUID } from "node:crypto";
import type { Category, NewCategory } from "../types/category.js";

const categories: Category[] = [
    { id: randomUUID(), name: "Groceries" },
    { id: randomUUID(), name: "Transport" },
];

export function getCategories(): Category[] {
    return categories;
}

export function addCategory(newCategory: NewCategory): Category {
    const category: Category = { id: randomUUID(), ...newCategory };
    categories.push(category);
    return category;
}

export function updateCategory(
    id: string,
    update: NewCategory,
): Category | null {
    const category = categories.find((c) => c.id === id);
    if (!category) return null;
    Object.assign(category, update);
    return category;
}

export function deleteCategory(id: string): boolean {
    const index = categories.findIndex((c) => c.id === id);
    if (index === -1) return false;
    categories.splice(index, 1);
    return true;
}
