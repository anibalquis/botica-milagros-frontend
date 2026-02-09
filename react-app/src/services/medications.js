import { normalizeCategoryName } from "../helpers/normalizeCategoryName";
import { API_BASE_URL } from "../constants";

export async function getAllMedicines() {
  const response = await fetch(`${API_BASE_URL}/medicamentos`);

  if (!response.ok) {
    throw new Error("Error fetching medicines");
  }

  return response.json();
}

export async function getMedicinesById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/medicamentos/${id}`);

    if (!response.ok) {
      throw new Error("Error fetching product");
    }

    const med = await response.json();
    return {
      id: med.idMedicamento,
      name: med.nombre,
      price: med.precioUnitario,
      stock: med.stockActual,
      image: med.urlImg,
      envase: med.tipoEnvase,
      precauciones: med.precauciones,
      composicion: med.composicion,
      recomendaciones: med.recomendaciones,
      volumen: med.volumen,
      categoria: {
        id: med.categoria.id,
        nombre: med.categoria.nombre,
      },
    };
  } catch (error) {
    console.error({ error });
    return [];
  }
}

export async function getCategoriesWithMedicines() {
  try {
    const response = await fetch(`${API_BASE_URL}/categorias`);

    if (!response.ok) {
      throw new Error("Error fetching categories with products");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error({ error });
    return [];
  }
}

export async function getNormalizedMedicines() {
  const categories = await getCategoriesWithMedicines();

  return categories.flatMap((cat) =>
    cat.medicamentos.map((med) => ({
      id: med.idMedicamento,
      name: med.nombre,
      price: med.precioUnitario,
      stock: med.stockActual,
      image: med.urlImg,
      volumen: med.volumen,
      categoria: normalizeCategoryName(cat.nombreCategoria),
      categoriaLabel: cat.nombreCategoria,
    })),
  );
}
