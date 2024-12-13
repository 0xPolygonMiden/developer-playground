export async function getNoteScriptExample(item: string) {
  try {
    const response = await fetch(
      `https://raw.githubusercontent.com/0xPolygonMiden/miden-base/main/miden-lib/asm/note_scripts/${item}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:");
    console.error("Full error object:", error);
    throw error;
  }
}

export const truncateText = (text: string, length = 8) => {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
};
