# Skills Apple: notas para el rediseño de la web

Instaladas el 13 oct 2026 a partir de la guía de Notion "Make Claude Design to Apple's Standard". Copias fijas (snapshot), sin actualización automática.

## Rutas y nombres

| Nombre final | Ruta | Origen (commit) |
| --- | --- | --- |
| `apple-motion` | `~/.claude/skills/apple-motion/SKILL.md` (un solo archivo) | `emilkowalski/skills`, carpeta `skills/apple-design` (2d22863) |
| `apple-look` | `~/.claude/skills/apple-look/` (`SKILL.md` + `references/`, 126 .md) | `dickwu/apple-design-skill` (904b0ee) |

Ambos repos declaraban `name: apple-design`; se renombró solo esa línea. El resto del contenido es idéntico al original, salvo dos caracteres invisibles (U+200B) que se quitaron de `references/hig/icons.md`.

## Cuál usar para esta web

- **apple-motion es la que aplica.** Está pensada para web (CSS, Pointer Events, Motion/Framer Motion).
- **apple-look es para apps** (iOS, macOS, Flutter, Electron...). Ella misma lo dice: en una web solo aplican sus principios y fundamentos (accesibilidad, color, tipografía, layout, escritura), no las convenciones de plataforma (tab bars, menu bar, sheets). Úsala como revisora de jerarquía, contraste y copy, no como guía de componentes.

## Reglas concretas para la web de marketing

### Consola animada con pestañas (apple-motion)
- Cambio de pestaña interrumpible: si el usuario pulsa otra pestaña a mitad de animación, la nueva animación arranca desde el valor que hay en pantalla en ese momento (transform real), nunca desde el destino lógico. Nada de bloquear clics durante la transición.
- Springs en vez de duraciones fijas para el indicador de pestaña activa: por defecto amortiguación crítica (`type: 'spring', bounce: 0, duration: 0.3-0.4` en Motion). Sin rebote: el rebote se reserva para gestos con inercia (un flick, un arrastre), no para un clic.
- Feedback en `pointerdown`, no en `click`: la pestaña se marca al presionar.
- Consistencia espacial: si el contenido entra deslizando hacia un lado, sale por el mismo camino. El indicador nace de la pestaña pulsada.
- Si el auto-play de la consola rota pestañas solo, la interacción del usuario manda y lo para (Agency: el usuario controla).
- Evitar bucles lentos a pantalla completa (cerca de 0,2 Hz, un ciclo cada 5 s): son los que marean.

### Botones (apple-motion + apple-look)
- `:active { transform: scale(0.97); transition: transform 100ms ease-out; }`: respuesta instantánea al presionar.
- Auditar latencias en el camino del input: debounces, timers artificiales, esperas de transición.
- Etiquetas que dicen lo que pasa ("Reservar llamada", no "Enviar"), y la acción mantiene su nombre en todo el flujo (apple-look, Lens 5).
- Objetivo táctil mínimo: 44 x 44 pt en móvil, con espacio entre controles (apple-look, Lens 1).
- Contraste: texto hasta 17 pt necesita 4,5:1; 18 pt o más, o negrita, 3:1. Calcular con valores hex reales. Ojo con texto cyan `#22d3ee` sobre blanco: no llega a 4,5:1, usarlo como acento o sobre fondo oscuro.

### Revelados al hacer scroll (apple-motion)
- Animar solo `transform` y `opacity`; `will-change` solo cuando el movimiento es inminente.
- "Hint in the direction": el movimiento intermedio apunta al estado final (el elemento entra desde donde tiene sentido, no interpola a ciegas).
- Con `prefers-reduced-motion: reduce`, sustituir deslizamientos y springs por un fundido corto de opacidad. Reducir movimiento no significa quitar el feedback.
- Con `prefers-reduced-transparency: reduce`, superficies con blur pasan a sólidas; con `prefers-contrast: more`, fondos casi sólidos y borde definido.
- Superficies translúcidas (nav sticky): `backdrop-filter` con el contenido pasando por debajo, nunca una capa translúcida clara sobre otra. Al aparecer, animar blur y escala juntos, no solo opacidad.
- En vez de un borde de 1 px bajo el header sticky, un pequeño degradado o máscara donde el contenido toca la barra.

### Tipografía (las dos skills coinciden)
- Tracking según tamaño: titulares grandes con tracking negativo (en torno a `-0.02em`), cuerpo cerca de 0. Nunca un `letter-spacing` único.
- Interlineado inverso al tamaño: titulares ajustados (~1.05), cuerpo cómodo (~1.5).
- Jerarquía con peso + tamaño + interlineado juntos, no solo tamaño. Espaciado en `rem` para que escale con el tamaño de texto del usuario.

### Craft (apple-look, aplicable a web)
- Una sola pieza "firma" por página y lo demás en calma. La consola animada es la candidata natural.
- Comprobar que no cae en las tres plantillas de diseño generado que señala la skill: crema + serif + terracota; casi negro + un acento ácido; retícula de filetes finos sin radio. Tampoco hero de "número grande sobre etiqueta con degradado" ni marcadores 01/02/03 en contenido que no es una secuencia.
- Ejercicio final: quitar un accesorio y ver si se pierde algo.

## Riesgos detectados

- **Seguridad: limpio.** Ninguna de las dos descarga contenido remoto en tiempo de ejecución, ejecuta scripts ni pide credenciales. apple-motion es un único Markdown. apple-look: se revisaron los 126 archivos de referencia (escaneo de inyección de prompts, comandos, credenciales, comentarios HTML, base64, Unicode invisible); solo texto de Apple. Dominios externos: Apple, W3C (WCAG), github.com/apple y un ejemplo de RR Donnelley en app-clips.md.
- **No se copió `scripts/pull-hig.mjs`** de apple-look: es el script que descarga de nuevo las páginas de developer.apple.com. La skill no lo necesita para revisar y así nada puede reescribir las referencias.
- **Solapamiento con `apple-hig`:** la skill `~/.claude/skills/apple-hig/` es solo una ficha de catálogo (un SKILL.md que apunta al repo `raintree-technology/apple-hig-skills`, sin referencias propias). Cubre el mismo terreno que apple-look pero sin contenido. Se recomienda archivarla para que no compita en la activación. No se ha tocado.
- **Solapamiento parcial con otras skills ya instaladas** (`impeccable`, `make-interfaces-feel-better`, `gsap-*`): las reglas de motion de apple-motion pueden chocar con defaults de GSAP basados en easing y duración. Para elementos interactivos, prevalece apple-motion (springs, interrumpible); GSAP sigue siendo válido para secuencias puramente narrativas en scroll.
- **apple-motion tiene una "Initial Response"**: si se invoca sin pregunta, contesta solo con una frase de presentación. Invocarla siempre con la tarea concreta.
- Los SKILL.md originales contienen rayas largas. No afecta al uso, pero no copiar su texto literal en archivos del proyecto.
