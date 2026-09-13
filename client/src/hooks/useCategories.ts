import { useEffect, useState } from "react";
import * as categoriesApi from "../api/categories";
import type { Category, NewCategory } from "../types/category";

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        categoriesApi.fetchCategories().then(setCategories);
    }, []);

    async function addCategory(category: NewCategory) {
        const created = await categoriesApi.createCategory(category);
        setCategories((prev) => [...prev, created]);
    }

    async function editCategory(id: string, category: NewCategory) {
        const updated = await categoriesApi.updateCategory(id, category);
        setCategories((prev) =>
            prev.map((c) => (c.id === id ? updated : c)),
        );
    }

    async function removeCategory(id: string) {
        await categoriesApi.deleteCategory(id);
        setCategories((prev) => prev.filter((c) => c.id !== id));
    }

    return { categories, addCategory, editCategory, removeCategory };
}
