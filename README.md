# 2YOU Agency static website

Sito statico premium per 2YOU Agency, pronto per pubblicazione come Static Site su Render.

## Struttura

- `site/index.html`: homepage.
- `site/lavori/index.html`: archivio completo dei lavori.
- `site/styles.css`: design system, responsive layout e animazioni.
- `site/script.js`: menu mobile, risultati in home, lightbox, reveal, counter e copia handle.
- `site/archive.js`: archivio lavori, filtri e lightbox della pagina `lavori/`.
- `site/content/results-feed.json`: dati della sezione risultati.
- `site/assets/tdash/pages/`: pagine WebP usate dal viewer brochure TDash. Il PDF non va pubblicato nella cartella statica.
- `site/assets/screens/`: screen ottimizzati in WebP.
- `site/assets/brand/`: logo, favicon e touch icon.
- `render.yaml`: configurazione Blueprint per Render.

## Avvio locale

```bash
python -m http.server 4173 -d site
```

Poi apri `http://localhost:4173`.

Il sito può anche aprirsi direttamente da `site/index.html`; in quel caso il feed JSON può essere bloccato dal browser e verrà usato il fallback integrato in `script.js`.

## Deploy su Render

Puoi usare il file `render.yaml` come Blueprint. In alternativa, crea un nuovo Static Site nel dashboard Render con:

- Build command: `echo "Static site ready"`
- Publish directory: `site`

## Aggiornare i risultati

Per aggiungere nuovi contenuti, inserisci lo screen in `site/assets/screens/` e aggiungi una voce in `site/content/results-feed.json`.

Un aggiornamento automatico diretto da Instagram richiede API/token o un piccolo job di build che aggiorni questo JSON prima del deploy. La pagina è già pronta per leggere quel file senza cambiare il markup.

## Aggiornare la brochure TDash

Rigenera le immagini in `site/assets/tdash/pages/` mantenendo il nome `tdash-page-01.webp`, `tdash-page-02.webp`, ecc. Non inserire il PDF originale dentro `site/`, così non viene esposto come download pubblico.
