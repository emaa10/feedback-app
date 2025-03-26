import json
import pandas as pd

# Lade den JSON-Output aus einer Datei (hier "ratings.json")
with open("ratings.json", "r", encoding="utf-8") as f:
    ratings = json.load(f)

# Erstelle ein DataFrame aus den JSON-Daten.
# Das DataFrame enthält alle Spalten, die in den Bewertungen vorhanden sind (z. B. beverage, timestamp, Fragen und Bewertungen)
df = pd.DataFrame(ratings)

# Optional: Reihenfolge der Spalten anpassen oder Spalten umbenennen, wenn nötig
# Beispiel:
# df = df[['beverage', 'timestamp', 'intensiv', 'suesse', 'optik', 'alkohol', 'gesamt', 'kommentar']]

# Speichere das DataFrame als Excel-Datei
excel_datei = "ratings.xlsx"
df.to_excel(excel_datei, index=False)

print(f"Excel-Datei '{excel_datei}' wurde erfolgreich erstellt.")

