"""Extrae un guion de video (.docx) a JSON por segmentos, sin alterar el texto.

Formato esperado: encabezados «[TÍTULO - m:ss a m:ss]», líneas «NOMBRE: (acotación)» y,
entre paréntesis en su propio párrafo, lo que aparece en pantalla.

Uso: python3 -I scripts/extraer_guion.py <guion.docx> <salida.json>
"""
import html
import json
import re
import sys
import zipfile


def parrafos(ruta):
    xml = zipfile.ZipFile(ruta).read("word/document.xml").decode("utf-8")
    for p in re.findall(r"<w:p[ >].*?</w:p>", xml, flags=re.S):
        texto = html.unescape("".join(re.findall(r"<w:t[^>]*>([^<]*)</w:t>", p))).strip()
        if texto:
            yield texto


def main():
    origen, destino = sys.argv[1:3]
    segmentos = []
    for t in parrafos(origen):
        cab = re.fullmatch(r"\[(.+?)\s*-\s*(\d+:\d{2})\s*a\s*(\d+:\d{2})\]", t)
        if cab:
            segmentos.append({"titulo": cab[1].strip(), "inicio": cab[2], "fin": cab[3], "voz": None, "acotacion": None, "parrafos": [], "enPantalla": None})
            continue
        seg = segmentos[-1]
        voz = re.fullmatch(r"([A-ZÁÉÍÓÚÑ]+):\s*(?:\((.+)\))?", t)
        if voz:
            seg["voz"], seg["acotacion"] = voz[1], voz[2]
        elif t.startswith("(") and t.endswith(")"):
            seg["enPantalla"] = t[1:-1]
        else:
            seg["parrafos"].append(t)
    # Las comillas que abren y cierran el parlamento completo se muestran como formato de diálogo.
    for seg in segmentos:
        if seg["parrafos"]:
            seg["parrafos"][0] = seg["parrafos"][0].removeprefix('"')
            seg["parrafos"][-1] = seg["parrafos"][-1].removesuffix('"')
    with open(destino, "w", encoding="utf-8") as f:
        json.dump(segmentos, f, ensure_ascii=False, indent=1)
    print(len(segmentos), "segmentos")


if __name__ == "__main__":
    main()
