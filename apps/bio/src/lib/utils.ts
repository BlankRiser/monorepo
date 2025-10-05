import type { ResumeData } from "../features/resume/data";

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

export function getDateDifference(input: string): string {
  const parsedDate = parseDate(input)
  const currentDate = new Date();

  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date format. Use 'MMM yyyy' like 'Oct 2024'.");
  }

  let yearDiff = currentDate.getFullYear() - parsedDate.getFullYear();
  let monthDiff = currentDate.getMonth() - parsedDate.getMonth();

  let totalMonths = yearDiff * 12 + monthDiff;

  // If input date is in the future, invert the sign
  const isFuture = totalMonths < 0;
  totalMonths = Math.abs(totalMonths);

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  let result = "";
  if (years > 0) {
    result += `${years} year${years > 1 ? "s" : ""}`;
  }
  if (months > 0) {
    if (result) result += " ";
    result += `${months} month${months > 1 ? "s" : ""}`;
  }

  // If zero months and years, say "0 months"
  if (!result) result = "0 months";

  return isFuture ? `in ${result}` : result;
}

export function formatExperienceDuration(totalMonths: number): string {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years && months) return `${years} year${years > 1 ? 's' : ''} ${months} month${months > 1 ? 's' : ''}`;
  if (years) return `${years} year${years > 1 ? 's' : ''}`;
  if (months) return `${months} month${months > 1 ? 's' : ''}`;
  return '0 months';
}

/**
 * Parses a date string in "MMM yyyy" format or "Present" to a Date object.
 */
export function parseDate(dateStr: string): Date {
  if (dateStr.toLowerCase() === 'present') {
    return new Date();
  }
  return new Date(`${dateStr} 01`);
}

export function parseMonthYear(dateStr: string): Date {
  const months: { [key: string]: number } = {
    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
    jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
  };

  const parts = dateStr.trim().toLowerCase().split(' ');
  const month = months[parts[0]];
  const year = parseInt(parts[1]);

  return new Date(year, month, 1);
}

export function formatExperience(totalMonths: number): string {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years === 0) {
    return months === 1 ? "1 month" : `${months} months`;
  }

  if (months === 0) {
    return years === 1 ? "1 year" : `${years} years`;
  }

  const yearStr = years === 1 ? "1 year" : `${years} years`;
  const monthStr = months === 1 ? "1 month" : `${months} months`;

  return `${yearStr} ${monthStr}`;
}

export function calculateTotalExperience(experiences: (typeof ResumeData)["experience"]): string {
  let totalMonths = 0;
  const now = new Date();

  for (const exp of experiences) {
    const startDate = parseMonthYear(exp.company.startDate);
    let endDate: Date;

    if (exp.company.endDate.toLowerCase() === "present") {
      endDate = now;
    } else {
      endDate = parseMonthYear(exp.company.endDate);
    }

    // Calculate months difference
    const monthsDiff =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth());

    // Add at least 1 month if the difference is 0 or negative (handle edge cases)
    totalMonths += Math.max(monthsDiff, 0);
  }

  return formatExperience(totalMonths);
}
