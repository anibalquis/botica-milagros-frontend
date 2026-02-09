import { normalizeCategoryName } from "./categories";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getCategoriesWithProducts() {
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

export async function getProducts() {
  const categories = await getCategoriesWithProducts();

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

export async function getProductById(id) {
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
      }
    };
  } catch (error) {
    console.error({ error });
    return [];
  }
}
