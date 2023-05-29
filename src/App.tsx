import React, { useState } from "react";
import Heatmap from "../heatmap/src/Heatmap";
import { parseBinaryData, getColor } from "../heatmap/src/utils";

const App: React.FC = () => {
  const [binaryData, setBinaryData] = useState<number[][]>([]);

const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const files = event.target.files;
  if (files && files.length > 0) {
    const file = files[0];

    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target && e.target.result) {
        // Отримання бінарних даних з файлу
        const data = e.target.result as ArrayBuffer;
        // Розпарсити бінарні дані і оновити стан binaryData
        const parsedData = parseBinaryData(data, 36000, 17999); // Застосувати розміри width і height
        setBinaryData(parsedData);
      }
    };

    reader.readAsArrayBuffer(file);
  }
};
  return (
    <div>
      <input type="file" accept=".grid" onChange={handleFileUpload} />
      {binaryData.length > 0 && (
        <>
          <img src="../images/emptyMap.jpeg" alt="map" />
          <Heatmap
            binaryData={binaryData}
            minValue={0}
            maxValue={255}
            getColor={getColor}
            height={binaryData.length}
          />
        </>
      )}
    </div>
  );
};

export default App;
