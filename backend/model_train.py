import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
import joblib
import os

# URL del dataset
URL = "https://raw.githubusercontent.com/Francovg18/Datos/main/Leaf_Photosynthesis_Traits.csv"

# Variables
FEATURES = ['Latitude', 'Longitude', 'Elevation', 'Jmax_25C', 'Leaf_N', 'Leaf_P', 'SLA']
TARGET = 'Vcmax_25C'

# Crear carpeta para guardar los modelos
os.makedirs('models', exist_ok=True)


def load_prepare():
    print("Cargando y preparando datos...")
    df = pd.read_csv(URL, encoding='latin1')
    df = df.replace(-9999.99, pd.NA)

    # Eliminar columnas innecesarias
    drop_cols = [
        'Author', 'Notes', 'Photosynthetic_reference', 'Kinetic_reference',
        'Wj_reference', 'J_reference', 'J_flag'
    ]
    df = df.drop(columns=[c for c in drop_cols if c in df.columns], errors='ignore')

    # Limpiar columnas y convertir a numéricas
    df.columns = df.columns.str.strip()
    df = df[FEATURES + [TARGET]].copy()
    df = df.apply(pd.to_numeric, errors='coerce')
    df = df.dropna()

    print(f"Datos listos: {df.shape[0]} filas y {df.shape[1]} columnas.")
    return df


def train_and_save():
    df = load_prepare()

    X = df[FEATURES]
    y = df[TARGET]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    print("\nEntrenando modelos...")

    # Modelo de Regresión Lineal
    lr = LinearRegression()
    lr.fit(X_train, y_train)
    y_pred = lr.predict(X_test)
    mse_lr = mean_squared_error(y_test, y_pred)
    r2_lr = r2_score(y_test, y_pred)
    print(f"Regresión Lineal - MSE: {mse_lr:.2f} | R²: {r2_lr:.2f}")
    joblib.dump(lr, 'models/model_lr.pkl')

    # Modelo de Random Forest
    rf = RandomForestRegressor(n_estimators=200, random_state=42)
    rf.fit(X_train, y_train)
    y_pred_rf = rf.predict(X_test)
    mse_rf = mean_squared_error(y_test, y_pred_rf)
    r2_rf = r2_score(y_test, y_pred_rf)
    print(f"Random Forest - MSE: {mse_rf:.2f} | R²: {r2_rf:.2f}")
    joblib.dump(rf, 'models/model_rf.pkl')

    print("\nModelos guardados en la carpeta 'models/' con éxito.")


if __name__ == '__main__':
    train_and_save()
