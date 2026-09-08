# Marca Edrai Solutions — símbolo «Corte» (4b)

Estado: **en migración**. Decidido el 2026-09-08 sobre la colección de rondas de
diseño de Ricardo (artefacto `71ba9dd4-b0a3-458f-b89d-84265fbd578b`).

## Qué se eligió

**Ronda 4, opción 4b «Corte»**: el cuadrado del favicon anterior seccionado en
diagonal y desplazado. Sin letra — es la forma más abstracta y la única que
aguanta reducirse a 16 px sin perder nada.

## Reglas de uso

| Regla | Detalle |
|---|---|
| **Versal «AI» solo en el logo** | El wordmark del logo es `EdrAI`. El nombre legal, el dominio, los metadatos y **todo el texto corrido** siguen siendo «Edrai Solutions». No cambiar copy por esto. |
| **Cian solo en el símbolo y en «AI»** | `#22D3EE` sobre blanco da 1,7:1 — ilegible en texto corrido. |
| **Composición horizontal como principal** | Símbolo a la izquierda, `EdrAI` sobre la regla cian + `SOLUTIONS`. |
| **Tagline fuera del logo** | «Evolution Driven by AI» es frase de marca, no va soldada al lockup. |
| **El hueco del corte es transparente** | Deja ver el fondo. Por eso hay dos variantes de la mitad inferior. |

### Paleta

| | Hex | Uso |
|---|---|---|
| Navy | `#0D1B2A` | Mitad inferior del símbolo sobre fondos claros; `theme-color` |
| Cian | `#22D3EE` | Mitad superior del símbolo, «AI», regla |
| Gris | `#5B6B7C` | Texto secundario en soportes de marca |

> El fondo de la web sigue siendo `#030712`, distinto del navy de marca. Unificar
> la paleta del sitio es una decisión aparte, no forma parte de esta migración.

## Archivos

| Archivo | Cuándo |
|---|---|
| `public/static/logo-mark.svg` | Símbolo cian + navy. **Fondos claros**: documentos, facturas, presentaciones. |
| `public/static/logo-mark-inverse.svg` | Símbolo cian + blanco. **Fondos oscuros**: toda la web. |
| `public/static/favicon.svg` | Favicon adaptativo (navy en pestañas claras, blanco en oscuras). |
| `public/static/favicon.ico` | Fallback legacy, 16/32/48 px. |
| `public/static/favicon-48x48.png`, `apple-touch-icon.png` | Iconos raster del navegador y iOS. |
| `public/static/logo-mark-512.png` / `-inverse-512.png` / `logo-mark-1024.png` | Avatares y subidas a plataformas externas. |
| `components/Logo.tsx` | `<Logo size="nav" \| "footer" />` y `<LogoMark variant="inverse" \| "primary" />`. |

Los PNG y el `.ico` se generan desde la misma geometría con:

```bash
node scripts/build-logo-raster.mjs
```

## Pendiente

- [ ] **Vector definitivo de Ricardo.** Lo que hay en el repo es una
      reconstrucción fiel del render de 4b, no el archivo fuente. Cuando llegue
      el original (con el wordmark en **Archivo** trazado a curvas) se sustituyen
      `logo-mark*.svg` y se regeneran los raster.
- [ ] **Wordmark tipográfico.** Ahora mismo `EdrAI` se compone en vivo con Inter
      900, que es la fuente que ya carga el sitio. La marca especifica Archivo.
- [ ] **`og-image.jpg`** todavía lleva la identidad anterior.

## Checklist de plataformas

- [x] **Web edraisolutions.es** — nav, footer, favicons, apple-touch-icon, theme-color
- [ ] `og-image.jpg` / Twitter card
- [ ] Instagram [@edraisolutions](https://www.instagram.com/edraisolutions/) — avatar
- [ ] LinkedIn — página de empresa y/o perfil de Ricardo
- [ ] GitHub — avatar de la organización / `alepm03`
- [ ] Firma de correo (`@edraisolutions.es`)
- [ ] WhatsApp Business — foto de perfil
- [ ] Plantillas de propuesta y factura
- [ ] Widget de chat embebido en clientes (Mercado del Barranco)
