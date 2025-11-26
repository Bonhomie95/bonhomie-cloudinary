/**
 * Compute SHA-1 hash (browser-side)
 */
export default async function hashBrowser(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-1', arrayBuffer);

    // Convert ArrayBuffer → hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    return { success: true, hash: hashHex };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
