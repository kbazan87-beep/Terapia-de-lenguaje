"""Extrae una hoja de ficha temática (Definición, Características, Actividades) a JSON sin alterar los textos.

Estructura esperada: «Definición:» y «Características:» en la columna A con su texto en B;
después de «Actividades:», cada actividad es un título seguido de su descripción en la siguiente celda con texto.

Uso: python3 -I scripts/extraer_ficha.py <archivo.xlsx> <hoja> <salida.json>
"""
import json
import sys

import openpyxl


def main():
    archivo, nombre_hoja, salida = sys.argv[1:4]
    ws = openpyxl.load_workbook(archivo, data_only=True)[nombre_hoja]
    celdas = [
        {"ref": c.coordinate, "valor": str(c.value)}
        for fila in ws.iter_rows()
        for c in fila
        if c.value is not None and str(c.value).strip()
    ]
    valores = [c["valor"] for c in celdas]

    def tras(etiqueta):
        i = next(i for i, v in enumerate(valores) if v.strip().lower().startswith(etiqueta))
        return i, valores[i + 1].strip()

    _, definicion = tras("definición")
    _, caracteristicas = tras("características")
    inicio = next(i for i, v in enumerate(valores) if v.strip().lower().startswith("actividades")) + 1
    resto = valores[inicio:]
    actividades = [
        {"titulo": resto[i].strip(), "descripcion": resto[i + 1].strip()} for i in range(0, len(resto) - 1, 2)
    ]
    datos = {
        "hoja": nombre_hoja,
        "definicion": definicion,
        "caracteristicas": caracteristicas,
        "actividades": actividades,
        "celdas": celdas,
    }
    with open(salida, "w", encoding="utf-8") as f:
        json.dump(datos, f, ensure_ascii=False, indent=1)
    print(nombre_hoja, len(actividades), "actividades,", len(celdas), "celdas")


if __name__ == "__main__":
    main()
