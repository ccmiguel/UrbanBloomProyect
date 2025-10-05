import pandas as pd

url = "https://raw.githubusercontent.com/Francovg18/Datos/main/Leaf_Photosynthesis_Traits.csv"

data = pd.read_csv(url, encoding="latin1")
data
# Datos ..
print("dmensiones del dataset")
print(data.shape)

print("\ndatos:")
print(data.dtypes)

print("\nfilas:")
print(data.head())

print("\nvalores nulos")
print(data.isnull().sum())
print((data.isnull().sum() / len(data) * 100).round(2))


duplicados = data.duplicated().sum()
print(f"\nduplicadas: {duplicados}")

print("\nunicos:")
print(data.nunique())

print("\nobs:")
print(data.describe())

v_inv = (data == -9999.99).sum()
print("\nvalores 'inválidos' (-9999.99) por columna:")
print(v_inv[v_inv > 0])

print("\nℹ-------------************------------")
data.info()

# convertir a valores NaN
data = data.replace(-9999.99, pd.NA)

import matplotlib.pyplot as plt
import seaborn as sns


# valores faltantes
faltantes = (data.isna().sum() / len(data)) * 100
faltantes = faltantes[faltantes > 0].sort_values(ascending=False)
print("\nvalores faltantes:")
print(faltantes)

plt.figure(figsize=(10,5))
sns.barplot(x=faltantes.values, y=faltantes.index)
plt.title("Porcentaje de valores faltantes por columna")
plt.xlabel("% de valores faltantes")
plt.ylabel("Columna")
plt.show()


plt.figure(figsize=(6,4))
sns.heatmap(data.select_dtypes("number").corr(), annot=True, fmt=".2f", cmap="coolwarm")
plt.title("correlación entre variables numéricas")
plt.show()

cols_eliminar = ['Author', 'Notes', 'Photosynthetic_reference', 'Kinetic_reference', 'Wj_reference', 'J_reference', 'J_flag']
data = data.drop(columns=cols_eliminar)

faltantes = data.isna().sum()
print("valores faltantes por columna:")
print(faltantes[faltantes > 0])
data = data.fillna(data.mean(numeric_only=True))
print("\ndatos limpios -> no nulos", data.isna().sum().sum() == 0)

import seaborn as sns
import matplotlib.pyplot as plt

plt.figure(figsize=(10,8))
sns.heatmap(data.select_dtypes('number').corr(), cmap='viridis', annot=True)
plt.title('triz de correlación de variables numéricas')
plt.show()

plt.figure(figsize=(10,5))
sns.histplot(data['Vcmax_25C'], kde=True, color='green')
plt.title('Distribución de Vcmax_25C (capacidad fotosintética a 25°C)')
plt.xlabel('Vcmax_25C')
plt.show()

print(data.columns.tolist())
data.columns = data.columns.str.strip()

data.columns = data.columns.str.strip()
variables = ['Latitude', 'Longitude', 'Elevation', 'Jmax_25C', 'Leaf_N', 'Leaf_P', 'SLA']

data_limpia = data[variables + ['Vcmax_25C']].apply(pd.to_numeric, errors='coerce')
data_limpia = data_limpia.dropna()

X = data_limpia[variables]
y = data_limpia['Vcmax_25C']

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

modelo = LinearRegression()
modelo.fit(X_train, y_train)

y_pred = modelo.predict(X_test)

mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print("RESULTADOS DEL MODELO:")
print(f"Error cuadrático medio (MSE): {mse:.2f}")
print(f"Coeficiente de determinación (R²): {r2:.2f}")

coeficientes = pd.DataFrame({
    'Variable': variables,
    'Coeficiente': modelo.coef_
})
print("\nInfluencia de cada variable:")
print(coeficientes)

import matplotlib.pyplot as plt

plt.figure(figsize=(8,6))
plt.scatter(y_test, y_pred, color='green')
plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'r--', linewidth=2)
plt.xlabel('Valores reales Vcmax_25C')
plt.ylabel('Predicciones Vcmax_25C')
plt.title('Predicciones vs Valores reales')
plt.show()

residuos = y_test - y_pred
plt.figure(figsize=(8,6))
plt.scatter(y_pred, residuos, color='blue')
plt.hlines(0, xmin=y_pred.min(), xmax=y_pred.max(), colors='red', linestyles='dashed')
plt.xlabel('Predicciones')
plt.ylabel('Residuos')
plt.title('Residuos del modelo')
plt.show()

from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score

modelo_rf = RandomForestRegressor(n_estimators=200, random_state=42)
modelo_rf.fit(X_train, y_train)

y_pred_rf = modelo_rf.predict(X_test)
mse_rf = mean_squared_error(y_test, y_pred_rf)
r2_rf = r2_score(y_test, y_pred_rf)

print("RESULTADOS RANDOM FOREST:")
print(f"Error cuadrático medio (MSE): {mse_rf:.2f}")
print(f"Coeficiente de determinación (R²): {r2_rf:.2f}")

comparacion = pd.DataFrame({
    'Modelo': ['Regresión Lineal', 'Random Forest'],
    'MSE': [mse, mse_rf],
    'R2': [r2, r2_rf]
})
print(comparacion)
nueva_muestra = pd.DataFrame({
    'Latitude': [16.5],
    'Longitude': [-68.2],
    'Elevation': [3800],
    'Jmax_25C': [120],
    'Leaf_N': [2.5],
    'Leaf_P': [0.1],
    'SLA': [0.015]
})

prediccion = modelo.predict(nueva_muestra)
print(f"🌾 Predicción de Vcmax_25C: {prediccion[0]:.2f}")
# PREDICCIÓN DE CAPACIDAD FOTOSINTÉTICA (Vcmax_25C)
# Este bloque representa cómo un usuario (investigador o agricultor)
# ingresaría las condiciones de la planta o del entorno.
# Luego el modelo predice su eficiencia fotosintética (Vcmax_25C).

import pandas as pd

nueva_muestra = pd.DataFrame({
    'Latitude': [16.5],       # Latitud de la ubicación de la planta 
    'Longitude': [-68.2],     # Longitud de la ubicación 
    'Elevation': [3800],      # Altitud del sitio en metros sobre el nivel del mar
    'Jmax_25C': [120],        # Capacidad máxima de transporte de electrones a 25°C
    'Leaf_N': [2.5],          # Contenido de nitrógeno en la hoja 
    'Leaf_P': [0.1],          # Contenido de fósforo en la hoja 
    'SLA': [0.015]            # Área foliar específica 
})

prediccion = modelo.predict(nueva_muestra)
valor_predicho = prediccion[0]

print("🌿 RESULTADO DE PREDICCIÓN")
print(f"🌾 Predicción de Vcmax_25C: {valor_predicho:.2f} µmol m⁻² s⁻¹")

if valor_predicho < 40:
    print("📉 Capacidad fotosintética baja: la planta podría tener estrés o deficiencia nutricional.")
elif 40 <= valor_predicho < 70:
    print("⚖️ Capacidad fotosintética media: condiciones aceptables, pero mejorables.")
else:
    print("🌞 Alta capacidad fotosintética: la planta muestra un excelente rendimiento potencial.")

print("\n💡 Sugerencia:")
if valor_predicho < 40:
    print("👉 Revisa el nivel de nitrógeno y fósforo en las hojas.")
elif 40 <= valor_predicho < 70:
    print("👉 Considera optimizar la exposición a la luz o ajustar fertilización.")
else:
    print("✅ Mantén las condiciones actuales; el desarrollo es óptimo.")
# PREDICCIÓN DE SALUD DE LA PLANT
import pandas as pd

respuestas_usuario = {
    "ciudad": "La Paz",
    "horas_sol": "Moderadas (4-6 h)",
    "color_hojas": "Verdes claras",
    "frecuencia_riego": "Sí"
}

def convertir_respuestas_a_valores(respuestas):
    ciudad = respuestas["ciudad"]
    if ciudad == "La Paz":
        lat, lon, elev = -16.5, -68.1, 3600
    elif ciudad == "Santa Cruz":
        lat, lon, elev = -17.8, -63.2, 400
    else:
        lat, lon, elev = -17.4, -66.2, 2600

    sol_map = {"Pocas (1-3 h)": 80, "Moderadas (4-6 h)": 110, "Muchas (7+ h)": 140}
    hojas_map = {"Verdes oscuras": 3.0, "Verdes claras": 2.0, "Amarillentas": 1.5}
    riego_map = {"Sí": 0.1, "No": 0.05}

    return pd.DataFrame({
        'Latitude': [lat],
        'Longitude': [lon],
        'Elevation': [elev],
        'Jmax_25C': [sol_map[respuestas["horas_sol"]]],
        'Leaf_N': [hojas_map[respuestas["color_hojas"]]],
        'Leaf_P': [riego_map[respuestas["frecuencia_riego"]]],
        'SLA': [0.015]
    })

nueva_muestra = convertir_respuestas_a_valores(respuestas_usuario)
prediccion = modelo.predict(nueva_muestra)
valor_predicho = prediccion[0]

print("🌿 RESULTADO DE TU PLANTA")
print(f"Predicción de salud fotosintética: {valor_predicho:.2f} µmol m⁻² s⁻¹")

if valor_predicho < 40:
    print("📉 Tu planta podría estar débil o con poca energía. Revísala con más cuidado.")
    print("💡 Consejo: asegúrate de que reciba suficiente luz y algo de fertilizante.")
elif 40 <= valor_predicho < 70:
    print("⚖️ Tu planta está saludable, aunque podría mejorar un poco.")
    print("💡 Consejo: mantén el riego regular y procura buena iluminación.")
else:
    print("🌞 ¡Excelente! Tu planta está en condiciones ideales.")
    print("💡 Consejo: sigue con los mismos cuidados.")
