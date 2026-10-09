"""Extrae un guion de diálogos (.docx) a JSON por escenas, sin alterar los textos.

Cada «Lugar: …» abre una escena; las demás líneas tienen la forma «Nombre: texto».

Uso: python3 -I scripts/extraer_dialogo.py <guion.docx> <salida.json>
"""
import html
import json
import re
import sys
import zipfile


def main():
    origen, destino = sys.argv[1:3]
    xml = zipfile.ZipFile(origen).read("word/document.xml").decode("utf-8")
    escenas = []
    for p in re.findall(r"<w:p[ >].*?</w:p>", xml, flags=re.S):
        t = html.unescape("".join(re.findall(r"<w:t[^>]*>([^<]*)</w:t>", p))).strip()
        if not t:
            continue
        voz, _, texto = t.partition(":")
        if voz.strip() == "Lugar":
            escenas.append({"lugar": texto.strip(), "lineas": []})
        else:
            escenas[-1]["lineas"].append({"voz": voz.strip(), "texto": texto.strip()})
    with open(destino, "w", encoding="utf-8") as f:
        json.dump(escenas, f, ensure_ascii=False, indent=1)
    print(len(escenas), "escenas,", sum(len(e["lineas"]) for e in escenas), "líneas")


if __name__ == "__main__":
    main()
