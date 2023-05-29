export function parseBinaryData(
  data: ArrayBuffer,
  width: number,
  height: number
): number[][] {
  // Отримання бітового масиву даних
  const buffer = new Uint8Array(data);

  // Розпарсування бінарних даних у двовимірний масив
  const binaryData: number[][] = [];
  let row: number[] = [];
  for (let i = 0; i < buffer.length; i++) {
    const value = buffer[i];
    row.push(value);

    if (row.length === width) {
      binaryData.push(row);
      row = [];
    }
  }

  if (binaryData.length !== height) {
    throw new Error(
      "The provided height does not match the actual height of the binary data."
    );
  }

  return binaryData;
}

export function getColor(
  value: number,
  minValue: number,
  maxValue: number
): string {
  // Normalize the value between 0 and 1
  const normalizedValue = (value - minValue) / (maxValue - minValue);

  // Define the color range from blue to red
  const startColor = [0, 0, 255]; // Blue
  const endColor = [255, 0, 0]; // Red

  // Interpolate the color based on the normalized value
  const interpolatedColor = startColor.map((start, index) => {
    const end = endColor[index];
    const delta = end - start;
    return Math.round(start + delta * normalizedValue);
  });

  // Convert the interpolated color to CSS color string
  const color = `rgb(${interpolatedColor.join(",")})`;

  return color;
}
