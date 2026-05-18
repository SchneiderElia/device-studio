# Configurazione Locale Gemini 🧠

Questa cartella permette di personalizzare il comportamento di Gemini specificamente per questo progetto.

## Parametri di Generazione (Temperature)

La temperatura controlla la creatività e la precisione del modello. Puoi modificarla nel file `settings.json` in questa cartella.

### Scala della Temperatura:
- **0.0 - 0.2 (Preciso/Codice)**: Massima precisione, ideale per programmazione, bug fixing e logica pura. Riduce le allucinazioni. [Default attuale: 0.2]
- **0.3 - 0.6 (Bilanciato)**: Ideale per scrittura di documentazione o email tecniche. Equilibrio tra precisione e fluidità.
- **0.7 - 1.0 (Creativo)**: Ottimo per brainstorming, generazione di contenuti creativi o esplorazione di idee "fuori dagli schemi".

## Come cambiare la temperatura:
Apri `.gemini/settings.json` e modifica il valore sotto:
`modelConfigs` -> `overrides` -> `modelConfig` -> `generateContentConfig` -> `temperature`
