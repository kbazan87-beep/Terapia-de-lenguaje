"""Extrae una ficha de protocolo por rangos de edad (.docx) a JSON, sin alterar los textos.

Estructura esperada: párrafos de rango («0–3 MESES») seguidos de una tabla cuya primera
columna contiene «CÓDIGO  Conducta.  (Situación breve)».

Uso: python3 -I scripts/extraer_protocolo.py <ficha.docx> <salida.json>
"""
import html
import json
import re
import sys
import zipfile


def texto(xml):
    return html.unescape("".join(re.findall(r"<w:t[^>]*>([^<]*)</w:t>", xml)))


def main():
    origen, destino = sys.argv[1:3]
    xml = zipfile.ZipFile(origen).read("word/document.xml").decode("utf-8")
    cuerpo = xml[xml.find("<w:body>"):]
    parrafos, rangos, actual = [], [], None
    for m in re.finditer(r"<w:tbl>.*?</w:tbl>|<w:p[ >].*?</w:p>", cuerpo, flags=re.S):
        bloque = m.group(0)
        if bloque.startswith("<w:tbl>"):
            filas = re.findall(r"<w:tr[ >].*?</w:tr>", bloque, flags=re.S)[1:]  # sin encabezado
            for fila in filas:
                celda = re.findall(r"<w:tc>.*?</w:tc>", fila, flags=re.S)[0]
                t = " ".join(texto(p) for p in re.findall(r"<w:p[ >].*?</w:p>", celda, flags=re.S)).strip()
                cod = re.match(r"([A-Z]\d+)\s+(.*)$", t, flags=re.S)
                cuerpo_item = cod[2].strip()
                sit = re.search(r"\(([^()]*)\)\s*$", cuerpo_item)
                actual["items"].append({
                    "codigo": cod[1],
                    "conducta": cuerpo_item[: sit.start()].strip() if sit else cuerpo_item,
                    "situacion": sit[1].strip() if sit else None,
                })
        else:
            t = texto(bloque).strip()
            if not t:
                continue
            if re.fullmatch(r"\d+\s*[–-]\s*\d+\s+MESES", t):
                actual = {"rango": t, "items": []}
                rangos.append(actual)
            else:
                parrafos.append(t)
    datos = {"parrafos": parrafos, "rangos": rangos}
    with open(destino, "w", encoding="utf-8") as f:
        json.dump(datos, f, ensure_ascii=False, indent=1)
    print(len(rangos), "rangos,", sum(len(r["items"]) for r in rangos), "ítems,", len(parrafos), "párrafos")


if __name__ == "__main__":
    main()
