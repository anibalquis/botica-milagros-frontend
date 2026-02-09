import { normalizeCategoryName } from "../helpers/normalizeCategoryName";
import { API_BASE_URL, CATEGORY_ICONS } from "../constants";

export async function getCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/categorias`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.map((category) => {
      const normalizedName = normalizeCategoryName(category.nombreCategoria);

      return {
        id: normalizedName,
        name: category.nombreCategoria,
        icon: CATEGORY_ICONS[normalizedName] ?? "fa-box",
        path: `/productos/${normalizedName}`,
      };
    });
  } catch (error) {
    console.error({ error });
    return [];
  }
}

export async function getCategoryById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/categorias/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const category = await response.json();
    return category;
  } catch (error) {
    console.error({ error });
    return {};
  }
}

export async function getRelatedMedicinesByCategoryId(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/categorias/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const category = await response.json();

    const relatedMedicines = category.medicamentos.map((med) => ({
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
    }));

    return relatedMedicines;
  } catch (error) {
    console.error({ error });
    return [];
  }
}
