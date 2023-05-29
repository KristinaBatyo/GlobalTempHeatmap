import React, { useEffect, useRef } from "react";

interface HeatmapProps {
  binaryData: number[][];
  minValue: number;
  maxValue: number;
  getColor: (value: number, minValue: number, maxValue: number) => string;
  height: number;
}

const Heatmap: React.FC<HeatmapProps> = ({
  binaryData,
  minValue,
  maxValue,
  getColor,
  height,
}) => {
  const heatmapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heatmapContainerRef.current) {
      const container = heatmapContainerRef.current;

      // Очищення попередньої теплової карти (якщо вона була створена)
      container.innerHTML = "";

      // Створення нового елемента canvas для відображення теплової карти
      const canvas = document.createElement("canvas");
      container.appendChild(canvas);

      // Отримання контексту 2D для малювання на canvas
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Отримання розмірів даних
        const width = binaryData[0].length;

        // Встановлення розмірів canvas
        canvas.width = width;
        canvas.height = height;

        // Малювання теплової карти
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const value = binaryData[y][x];
            const color = getColor(value, minValue, maxValue);

            ctx.fillStyle = color;
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }
    }
  }, [binaryData, minValue, maxValue, getColor, height]);

  return <div ref={heatmapContainerRef}></div>;
};

export default Heatmap;
