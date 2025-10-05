# app.py
from flask import Flask, request, jsonify
import pandas as pd
import joblib
import traceback
import os
import requests
from utils import friendly_to_model, FEATURES
from flask_cors import CORS

# =====================================================
# Inicializar app
# =====================================================
app = Flask(__name__)
CORS(app)

# =====================================================
# Cargar modelos
# =====================================================
try:
    model_lr = joblib.load('models/model_lr.pkl')
    print("✅ Modelo Linear Regression cargado correctamente.")
except:
    model_lr = None
    print("⚠️ No se pudo cargar model_lr.pkl")

try:
    model_rf = joblib.load('models/model_rf.pkl')
    print("✅ Modelo Random Forest cargado correctamente.")
except:
    model_rf = None
    print("⚠️ No se pudo cargar model_rf.pkl")

# =====================================================
# Cargar o generar dataset climático NASA
# =====================================================
CSV_PATH = "datos_climaticos_la_paz.csv"

def obtener_datos_climaticos():
    """Descarga los datos si no existen"""
    coordenadas = [
        (-16.5, -68.15),   # Centro
        (-16.51, -68.14),  # Sopocachi
        (-16.52, -68.12),  # Obrajes
        (-16.48, -68.12),  # Miraflores
        (-16.49, -68.16)   # Achumani
    ]

    start, end = "20250101", "20250131"
    dfs = []

    print("🌤️ Descargando datos climáticos desde NASA POWER...")
    for lat, lon in coordenadas:
        url = f"https://power.larc.nasa.gov/api/temporal/daily/point?parameters=T2M,PRECTOTCORR,WS2M&start={start}&end={end}&latitude={lat}&longitude={lon}&community=ag&format=JSON"
        response = requests.get(url)
        data = response.json()

        df = pd.DataFrame(data["properties"]["parameter"])
        df.index = pd.to_datetime(df.index, format="%Y%m%d")
        df["lat"] = lat
        df["lon"] = lon
        dfs.append(df)

    df_total = pd.concat(dfs)
    df_total.reset_index(inplace=True)
    df_total.rename(columns={"index": "fecha"}, inplace=True)
    df_total.to_csv(CSV_PATH, index=False)
    print("✅ Datos guardados en", CSV_PATH)
    return df_total

# Cargar o descargar datos
if os.path.exists(CSV_PATH):
    df_total = pd.read_csv(CSV_PATH)
    print("✅ Datos climáticos cargados desde CSV.")
else:
    df_total = obtener_datos_climaticos()

# =====================================================
# Procesamiento climático y floración simulada
# =====================================================
df_total["floracion_simulada"] = ((df_total["T2M"] > 9) & (df_total["PRECTOTCORR"] > 5)).astype(int)

def clasificar_floracion(row):
    if 8 <= row["T2M"] <= 12 and 1 <= row["PRECTOTCORR"] <= 10 and row["WS2M"] < 4:
        return "Ideal para plantar"
    elif 5 <= row["T2M"] < 8 or 10 < row["PRECTOTCORR"] <= 15:
        return "Precaución"
    else:
        return "No recomendable"

df_total["condiciones"] = df_total.apply(clasificar_floracion, axis=1)

ubicaciones = {
    (-16.50, -68.15): "Centro",
    (-16.51, -68.14): "Sopocachi",
    (-16.52, -68.12): "Obrajes",
    (-16.48, -68.12): "Miraflores",
    (-16.49, -68.16): "Achumani"
}

df_total["ubicacion"] = df_total.apply(
    lambda x: ubicaciones.get((round(x["lat"], 2), round(x["lon"], 2)), "Desconocida"), axis=1
)

# =====================================================
# ENDPOINTS DE PREDICCIÓN
# =====================================================
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        df = pd.DataFrame([data])
        df = df[FEATURES]

        df = df.apply(pd.to_numeric, errors='coerce')
        if df.isnull().any().any():
            return jsonify({
                'error': 'Input tiene valores no numéricos o faltantes',
                'details': df.isnull().sum().to_dict()
            }), 400

        model = model_rf if model_rf is not None else model_lr
        pred = model.predict(df)[0]
        return jsonify({'Vcmax_25C': float(pred)})

    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500


@app.route('/predict_friendly', methods=['POST'])
def predict_friendly():
    try:
        payload = request.get_json()
        df = friendly_to_model(payload)

        model = model_rf if model_rf is not None else model_lr
        pred = model.predict(df)[0]
        pred_val = float(pred)

        if pred_val < 40:
            estado = '🌱 Baja capacidad fotosintética'
            consejo = 'Revisa fertilización y exposición a la luz solar.'
        elif pred_val < 70:
            estado = '🌿 Capacidad media'
            consejo = 'Mantén riego y controla iluminación.'
        else:
            estado = '☀️ Alta capacidad fotosintética'
            consejo = 'Condiciones óptimas. Mantén las prácticas actuales.'

        return jsonify({
            'Vcmax_25C': pred_val,
            'estado': estado,
            'consejo': consejo
        })

    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500


# =====================================================
# ENDPOINTS CLIMÁTICOS
# =====================================================
@app.route('/api/fechas')
def listar_fechas():
    fechas = sorted(df_total["fecha"].unique().tolist())
    return jsonify(fechas)

@app.route('/api/condiciones')
def obtener_condiciones():
    fecha = request.args.get("fecha", "2025-01-03")
    datos_dia = df_total[df_total["fecha"] == fecha]
    resultado = datos_dia[["lat", "lon", "ubicacion", "T2M", "PRECTOTCORR", "WS2M", "condiciones"]].to_dict(orient="records")
    return jsonify(resultado)

@app.route('/api/recomendaciones')
def recomendaciones():
    fecha = request.args.get("fecha", "2025-01-03")
    datos_dia = df_total[(df_total["fecha"] == fecha) & (df_total["condiciones"] == "Ideal para plantar")]
    resultado = datos_dia[["lat", "lon", "ubicacion", "condiciones"]].to_dict(orient="records")
    return jsonify(resultado)

@app.route('/')
def index():
    return jsonify({
        'mensaje': 'API Flask funcionando ✅',
        'rutas': {
            '/predict': 'Predicción con modelo',
            '/predict_friendly': 'Predicción amigable',
            '/api/fechas': 'Lista de fechas disponibles',
            '/api/condiciones?fecha=YYYY-MM-DD': 'Condiciones por día',
            '/api/recomendaciones?fecha=YYYY-MM-DD': 'Ubicaciones ideales'
        }
    })

# =====================================================
# MAIN
# =====================================================
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
