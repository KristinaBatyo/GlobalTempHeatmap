export function parseBinaryData(data: ArrayBuffer): number[][] {
  const arrayBuffer = new Uint8Array(data);
  const rows = 17999; // Кількість рядків у вихідному масиві
  const cols = 36000; // Кількість стовпців у вихідному масиві
  const parsedData: number[][] = [];

  for (let i = 0; i < rows; i++) {
    const row: number[] = [];

    for (let j = 0; j < cols; j++) {
      const index = i * cols + j;
      const value = arrayBuffer[index];
      row.push(value);
    }

    parsedData.push(row);
  }

  return parsedData;
}
