/**
 * Extracts the 5 most prominent colors from an image without libraries.
 * @param image URL string or HTMLImageElement
 * @returns Promise resolving to array of RGB tuples [r, g, b]
 */
export async function getProminentColors(image: HTMLImageElement | string): Promise<[number, number, number][]> {
  return new Promise((resolve, reject) => {
    const img = typeof image === "string" ? new Image() : image;

    if (typeof image === "string") {
      img.crossOrigin = "Anonymous"; // handle CORS if loading from another domain
      img.src = image;
    }

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("Canvas not supported");

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      const { data } = ctx.getImageData(0, 0, img.width, img.height);

      const colorCount: Record<string, number> = {};
      const step = 4 * 10; // sample every 10th pixel for speed

      for (let i = 0; i < data.length; i += step) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const key = `${r},${g},${b}`;
        colorCount[key] = (colorCount[key] || 0) + 1;
      }

      const sortedColors: [number, number, number][] = Object.entries(colorCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([key]) => {
          const [r, g, b] = key.split(",").map(Number);
          return [r, g, b] as [number, number, number];
        });

      resolve(sortedColors);
    };

    img.onerror = (err) => reject(err);
  });
}

/**
 * Converts an RGB array [r,g,b] to a hex color string.
 * @param rgb Array containing [r,g,b]
 * @returns Hex color string (e.g. "#ff0000")
 */
export function rgbToHex(rgb: [number, number, number]): string {
  const [r, g, b] = rgb;

  return (
    "#" +
    [r, g, b]
      .map((value) => {
        const hex = value.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}
