"""Compara la ficha PICT-24 (semana 5) con su versión revisada (semana 7), sin alterar los textos.

Empareja los ítems de cada rango de edad por semejanza de redacción; si en un rango queda un
solo ítem revisado y un solo ítem original sin pareja, los empareja entre sí. Un ítem revisado
sin pareja se marca como nuevo y uno original sin pareja como retirado.

Uso: python3 -I scripts/comparar_tamizaje.py <pict24.json> <revisado.docx> <salida.json>
"""
import difflib
import html
import json
import re
import sys
import zipfile


def texto(xml):
    return html.unescape("".join(re.findall(r"<w:t[^>]*>([^<]*)</w:t>", xml)))


def limpio(t):
    return re.sub(r"\s+", " ", t).strip()


def revisado(origen):
    xml = zipfile.ZipFile(origen).read("word/document.xml").decode("utf-8")
    cuerpo = xml[xml.find("<w:body>"):]
    parrafos, rangos, actual = [], [], None
    for m in re.finditer(r"<w:tbl>.*?</w:tbl>|<w:p[ >].*?</w:p>", cuerpo, flags=re.S):
        bloque = m.group(0)
        if bloque.startswith("<w:tbl>"):
            filas = re.findall(r"<w:tr[ >].*?</w:tr>", bloque, flags=re.S)
            encabezado = [limpio(texto(c)) for c in re.findall(r"<w:tc>.*?</w:tc>", filas[0], flags=re.S)]
            for fila in filas[1:]:
                celdas = re.findall(r"<w:tc>.*?</w:tc>", fila, flags=re.S)
                item = limpio(" ".join(texto(p) for p in re.findall(r"<w:p[ >].*?</w:p>", celdas[0], flags=re.S)))
                respuesta = limpio(texto(celdas[1]))
                actual["items"].append(item)
            actual["encabezado"], actual["respuesta"] = encabezado, respuesta
        else:
            t = limpio(texto(bloque))
            if not t or t == ".":
                continue
            if re.fullmatch(r"\d+\s*[–-]\s*\d+\s+MESES", t):
                actual = {"rango": t, "items": []}
                rangos.append(actual)
            else:
                parrafos.append(t)
    return parrafos, rangos


def main():
    pict, docx, destino = sys.argv[1:4]
    original = json.load(open(pict, encoding="utf-8"))
    parrafos, rangos = revisado(docx)
    comparacion = []
    for ro, rr in zip(original["rangos"], rangos):
        assert ro["rango"] == rr["rango"], (ro["rango"], rr["rango"])
        textos_o = [i["conducta"] + (f" ({i['situacion']})" if i["situacion"] else "") for i in ro["items"]]
        libres = set(range(len(textos_o)))
        pares = []
        for t in rr["items"]:
            puntajes = [(difflib.SequenceMatcher(None, textos_o[j].lower(), t.lower()).ratio(), j) for j in libres]
            mejor = max(puntajes, default=(0, None))
            if mejor[0] >= 0.5:
                libres.discard(mejor[1])
                o = ro["items"][mejor[1]]
                igual = limpio(textos_o[mejor[1]]).rstrip(".") == t.rstrip(".")
                pares.append({"original": o, "revisado": t, "cambio": "sin cambios" if igual else "reformulado"})
            else:
                pares.append({"original": None, "revisado": t, "cambio": "nuevo"})
        # Si en el rango queda un solo ítem nuevo y un solo ítem sin pareja, se leen como reformulación.
        nuevos = [p for p in pares if p["cambio"] == "nuevo"]
        if len(nuevos) == 1 and len(libres) == 1:
            nuevos[0].update(original=ro["items"][libres.pop()], cambio="reformulado")
        for j in sorted(libres):
            pares.append({"original": ro["items"][j], "revisado": None, "cambio": "retirado"})
        comparacion.append({"rango": rr["rango"], "pares": pares})
    datos = {
        "original": {"parrafos": original["parrafos"]},
        "revisado": {"parrafos": parrafos, "encabezado": rangos[0]["encabezado"], "respuesta": rangos[0]["respuesta"]},
        "rangos": comparacion,
    }
    with open(destino, "w", encoding="utf-8") as f:
        json.dump(datos, f, ensure_ascii=False, indent=1)
    cuenta = {}
    for r in comparacion:
        for p in r["pares"]:
            cuenta[p["cambio"]] = cuenta.get(p["cambio"], 0) + 1
    print(cuenta)


if __name__ == "__main__":
    main()
