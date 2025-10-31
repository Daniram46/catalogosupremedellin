// 🧩 Script: Verificador y reparador básico de rutas de imágenes SUPREMEDELLIN
document.addEventListener("DOMContentLoaded", () => {
  const imagenes = document.querySelectorAll("img");
  const posiblesCarpetas = ["imagenes", "IMAGENES", "Images", "IMAGES"];

  imagenes.forEach(img => {
    const rutaOriginal = img.getAttribute("src");

    img.addEventListener("error", async () => {
      console.warn(`❌ Imagen no encontrada: ${rutaOriginal}`);

      // Intentar autocorrección (carpetas mayúsculas/minúsculas)
      for (const carpeta of posiblesCarpetas) {
        if (rutaOriginal.includes("/")) {
          const nuevaRuta = rutaOriginal.replace(/^(IMAGENES|imagenes|Images|IMAGES)/, carpeta);
          const existe = await verificarRuta(nuevaRuta);
          if (existe) {
            console.log(`🔄 Ruta corregida: ${nuevaRuta}`);
            img.src = nuevaRuta;
            return;
          }
        }
      }

      // Si no se logra cargar
      img.alt = "(Imagen no encontrada)";
      img.classList.add("error-img");
    });

    img.addEventListener("load", () => {
      console.log(`✅ Imagen cargada correctamente: ${rutaOriginal}`);
    });
  });
});

// Función auxiliar para verificar si una ruta de imagen existe
async function verificarRuta(url) {
  try {
    const respuesta = await fetch(url, { method: "HEAD" });
    return respuesta.ok;
  } catch {
    return false;
  }
}
