"""Extrae las hojas de evidencia del Excel de la semana 1 a JSON sin alterar los valores.

Uso: python3 -I scripts/extraer_excel.py <archivo.xlsx> <carpeta_salida>
"""
import json
import sys
from pathlib import Path

import openpyxl


def celda(v):
    if v is None:
        return None
    if isinstance(v, float) and v.is_integer():
        return str(int(v))
    return str(v)


def hoja(ws):
    filas = []
    for r in ws.iter_rows(values_only=True):
        valores = [celda(v) for v in r]
        if any(v is not None and v.strip() for v in valores):
            filas.append(valores)
    ancho = max(
        max((i + 1 for i, v in enumerate(f) if v is not None), default=0) for f in filas
    )
    return [f[:ancho] for f in filas]


def main():
    origen, destino = Path(sys.argv[1]), Path(sys.argv[2])
    wb = openpyxl.load_workbook(origen, data_only=True)
    salida = {
        "lugares.json": hoja(wb["LUGARES DE ATENCIÓN"]),
        "instrumentos.json": hoja(wb["INSTRUMENTOS"]),
    }
    for nombre, filas in salida.items():
        (destino / nombre).write_text(
            json.dumps(filas, ensure_ascii=False, indent=1), encoding="utf-8"
        )
        print(nombre, len(filas), "filas")


if __name__ == "__main__":
    main()
