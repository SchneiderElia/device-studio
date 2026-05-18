# Project Instructions (GEMINI.md)

## 0. Avvio Sessione (MANDATORY SEQUENCE)
All'avvio di ogni sessione, l'agente DEVE leggere automaticamente i seguenti file nel rigoroso ordine indicato per garantire allineamento su regole e stato:
1. `AGENTS.md` — Regole generali del progetto (Identità, UI, Standard Tecnici).
2. `status.md` — Aggiornamenti, progressi e stato corrente del lavoro.

> [!CAUTION]
> **GOLDEN RULE: NEVER OVERWRITE MANUAL CHANGES**
> Prima di ogni operazione di scrittura (replace/write_file), DEVI eseguire un `read_file` del file di destinazione. Se trovi valori, strutture o tag diversi, assumi che l'utente li abbia modificati intenzionalmente. NON ripristinare mai vecchie versioni.

## 1. Core Mandates
- **Preservation of User Changes (STRICT):** Se l'utente effettua una modifica manuale, quella scelta è LEGGE.
- **Agent Personas:** In questo progetto, Gemini agisce come Senior Designer e Lead Developer. Fai riferimento a `AGENTS.md` per i protocolli di design.
- **[MANDATORY] Strict Execution & Double-Check:** Fare riferimento esclusivo al protocollo "Zero Initiative" per ogni modifica al codice. Vietato operare approssimativamente.

### 🛡️ Pre-flight Checklist (MANDATORY)
Prima di ogni risposta o modifica, verifica:
1. **Verifica Manuale:** Ho eseguito `read_file` per controllare modifiche manuali?
2. **Golden Rule:** Rispetto la struttura attuale scelta dall'utente?
3. **Check AGENTS.md:** Sto rispettando l'ordine Tailwind e le convenzioni di spacing?

## 2. Automazione & Manutenzione
- **Project Status Management:** Utilizzare la skill `status-md` per gestire, aggiornare e archiviare i log in `status.md`.
- **OBJECTIVE:** [Definire qui l'obiettivo specifico di questo progetto]
