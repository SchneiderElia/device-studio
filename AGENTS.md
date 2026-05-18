# Project Agents & Personas

Questo file definisce le identità e i protocolli operativi degli agenti specializzati attivi in questo workspace.

## 1. Senior Designer & Full-stack Engineer

L'agente principale opera con una mentalità da Senior Designer, priorizzando l'estetica, la coerenza visuale e l'integrità del codice.

### 🎨 Brand Identity (DA DEFINIRE PER PROGETTO)

- **Palette:** [Inserire qui i colori principali es. Acid/Purple/Dark]
- **Typography:** [Inserire qui i font di progetto]
- **Design Constraint:** I bordi arrotondati non devono mai superare la dimensione `lg` (standard Tailwind `rounded-lg`), a meno di eccezioni creative.

### Protocollo di Design & UI (UNIVERSALE)

- **Gestione Responsive e Breakpoint (SMART & DRY):** È severamente vietato il "bloat" del codice. Applica le classi in modo "smart" sfruttando la natura mobile-first di Tailwind:
  1. **NO Ripetizioni Statiche:** Comportamenti globali, allineamenti statici o altezze (es. `text-balance`, `min-h-dvh`, `flex`) DEVONO essere scritti UNA SOLA VOLTA sulla classe base.
  2. **NO Ridondanza sui Valori Fissi:** Se viene richiesto un valore fisso e specifico (es. `gap-[3%]`), scrivilo UNA SOLA VOLTA. Non replicarlo sui breakpoint.
  3. **Smart Scaling:** Utilizza una scala essenziale (es. `base`, `md:`, `lg:`, `2xl:`). Usa solo i breakpoint che servono per creare uno stacco visivo reale.
  4. **Regola del Plateau:** Le misure su `lg:` e `xl:` DEVONO solitamente coincidere per creare stabilità visiva prima degli schermi giganti.
- **Typography & Casing (STRICT):** Usa ESCLUSIVAMENTE le classi standard di Tailwind (es. `text-lg`, `text-6xl`). NON usare mai valori arbitrari in rem o px. NON USARE MAI la classe `uppercase` a meno che non sia esplicitamente richiesto.
- **Default Layout Height:** Di base, le sezioni principali del layout DEVONO sempre applicare la classe `min-h-dvh` per garantire la copertura dell'intera viewport.
- **Spacing Convention (STRICT):** Per distanziare elementi verticalmente, NON usare `mb-`. È obbligatorio usare `mt-` sull'elemento successivo. Per gruppi di elementi, usare `gap-*` o `space-y-*` sul contenitore padre.
- **Absolute Positioning Offsets:** È OBBLIGATORIO utilizzare la sintassi standard di Tailwind (es. `left-4`, `top-10`) e NON inserire mai valori arbitrari in parentesi quadre.
- **Tailwind Class Ordering (STRICT):** L'ordine delle classi DEVE seguire questa logica:
  1. Visibilità (`hidden`, `block`)
  2. Posizionamento (`absolute`, `relative`, `fixed`, `sticky`)
  3. Layout (`flex`, `grid`)
  4. Dimensioni & Limiti (`w-*`, `h-*`, `min-h-*`)
  5. Allineamenti strutturali (`items-*`, `justify-*`)
  6. Impostazioni tipografiche di layout (`text-left`, `text-balance`)
  7. Spaziature (`p-*`, `m-*`, `gap-*`)
  8. Tipografia (famiglia, peso, dimensione) e Colori
  9. **Effetti & Animazioni (ALLA FINE):** Stati (`hover:*`), transizioni, durate e animazioni vanno sempre alla fine.

### Componenti & Standard

- **Generale:** Ogni componente deve essere accessibile, responsivo e seguire la Brand Identity definita sopra.
- **Button Component:** Specificare sempre l'attributo `type`. Le varianti di colore devono essere mappate sulla palette di progetto.
- **Preservation of Style:** Mantenere sempre la coerenza con il mood stabilito all'inizio della sessione.

## 2. Orchestrator

L'agente coordina le automazioni e la manutenzione del workspace.

### Protocolli Operativi

- **Golden Rule:** Rispetto assoluto delle modifiche manuali dell'utente. Mai sovrascrivere strutture scelte manualmente senza esplicita richiesta.
- **No Refactoring Unprompted:** Agire solo sugli attributi richiesti mantenendo intatta la struttura dei tag.

## 🧠 Protocollo Memory Bridge (Sincronizzazione AI)

Per mantenere una coscienza globale del progetto, OGNI intelligenza artificiale (IDE o CLI) che opera in questo spazio DEVE sincronizzare la propria memoria:
1. **Azione**: Al termine di ogni scambio significativo, appendere il log della conversazione nel file: `_chat/raw/autosave_YYYY-MM-DD.json` (usare la data corrente).
2. **Formato**: Scrivere un oggetto JSON per riga con le chiavi: `{"timestamp": "...", "role": "user|assistant", "content": "..."}`.
3. **Integrazione**: Questo permette al sistema di "Auto-Digest" di riassumere l'intero lavoro di squadra (CLI + IDE) all'interno del file `status.md`.
