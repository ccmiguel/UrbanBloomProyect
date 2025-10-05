# utils.py
import pandas as pd

FEATURES = ['Latitude', 'Longitude', 'Elevation', 'Jmax_25C', 'Leaf_N', 'Leaf_P', 'SLA']

# Mapeos para inputs "amigables" (frontend -> valores numéricos)
CIUDADES = {
    'La Paz': (-16.5, -68.14, 3600),
    'Santa Cruz': (-17.78, -63.18, 400),
    'Cochabamba': (-17.38, -66.15, 2500)
}

HORAS_SOL_MAP = {
    'Pocas (1-3 h)': 80,
    'Moderadas (4-6 h)': 110,
    'Muchas (7+ h)': 140
}

COLOR_HOJA_MAP = {
    'Verdes oscuras': 3.0,
    'Verdes claras': 2.0,
    'Amarillentas': 1.5
}

RIEGO_MAP = {
    'Sí': 0.1,
    'No': 0.05
}


def friendly_to_model(respuestas: dict):
    """Convierte un JSON amigable del frontend a DataFrame con FEATURES."""
    ciudad = respuestas.get('ciudad', 'La Paz')
    lat, lon, elev = CIUDADES.get(ciudad, CIUDADES['La Paz'])

    jmax = HORAS_SOL_MAP.get(respuestas.get('horas_sol', 'Moderadas (4-6 h)'), 110)
    leaf_n = COLOR_HOJA_MAP.get(respuestas.get('color_hojas', 'Verdes claras'), 2.0)
    leaf_p = RIEGO_MAP.get(respuestas.get('frecuencia_riego', 'Sí'), 0.1)
    sla = float(respuestas.get('SLA', 0.015))

    df = pd.DataFrame([{
        'Latitude': lat,
        'Longitude': lon,
        'Elevation': elev,
        'Jmax_25C': jmax,
        'Leaf_N': leaf_n,
        'Leaf_P': leaf_p,
        'SLA': sla
    }])

    return df
