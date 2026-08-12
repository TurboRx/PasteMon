import LZString from "lz-string";

export interface PasteData {
  title: string;
  author: string;
  format: string;
  content: string;
  createdAt?: string;
}

export function encodePaste(data: PasteData): string {
  const payload = JSON.stringify({
    t: data.title || "Untitled Team",
    a: data.author || "Anonymous",
    f: data.format || "gen9",
    c: data.content || "",
    d: data.createdAt || new Date().toISOString(),
  });
  return LZString.compressToEncodedURIComponent(payload);
}

export function decodePaste(encoded: string): PasteData | null {
  try {
    const decompressed = LZString.decompressFromEncodedURIComponent(encoded);
    if (!decompressed) return null;
    const raw = JSON.parse(decompressed);
    return {
      title: raw.t || "Untitled Team",
      author: raw.a || "Anonymous",
      format: raw.f || "gen9",
      content: raw.c || "",
      createdAt: raw.d || new Date().toISOString(),
    };
  } catch (err) {
    console.error("Failed to decode paste from URL:", err);
    return null;
  }
}

export async function getShortLink(longUrl: string): Promise<string> {
  try {
    const res = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
    if (res.ok) {
      const text = await res.text();
      if (text && text.startsWith("http")) {
        return text.trim();
      }
    }
  } catch (err) {
    console.error("TinyURL generation fallback:", err);
  }
  return longUrl;
}
