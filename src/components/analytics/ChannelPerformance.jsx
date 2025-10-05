import React, { useEffect, useState } from "react";
import { VictoryPie, VictoryLabel, VictoryTooltip } from "victory";

const ChannelPerformance = () => {
  const [data, setData] = useState([]);
  
  // Simulación de datos, puedes reemplazarlo con datos obtenidos de tu backend
  const channelData = [
    { name: "Tipo A", value: 400 },
    { name: "Tipo B", value: 300 },
    { name: "Tipo C", value: 200 },
  ];

  // Para tu backend, puedes cargar los datos aquí.
  useEffect(() => {
    // Aquí obtienes los datos de tu backend (reemplaza con tu código de fetch)
    setData(channelData);
  }, []);

  return (
    <div style={{ width: "100%", height: 400, margin: "0 auto" }}>
      <h2 style={{ color: "white", textAlign: "center" }}>Distribución por Tipo de Operador</h2>
      <VictoryPie
        data={data}
        x="name"
        y="value"
        animate={{
          duration: 2000,
          onExit: {
            duration: 500,
            before: () => ({
              _y: 0
            })
          }
        }}
        colorScale={["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE", "#00C49F"]}
        labels={({ datum }) => `${datum.name} (${datum.value})`}
        labelComponent={
          <VictoryTooltip
            style={{ fill: "white" }}
            flyoutStyle={{ fill: "rgba(31, 41, 55, 0.8)" }}
          />
        }
        style={{
          labels: { fill: "white", fontSize: 16, fontWeight: "bold" },
        }}
        innerRadius={60}
        labelRadius={110}
        cornerRadius={25}
        events={[
          {
            target: "data",
            eventHandlers: {
              onMouseOver: () => {
                return [{ childName: "labels", mutation: () => ({ text: "¡Hovered!" }) }];
              },
              onMouseOut: () => {
                return [{ childName: "labels", mutation: () => null }];
              }
            }
          }
        ]}
      />
    </div>
  );
};

export default ChannelPerformance;
