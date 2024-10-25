# React VLibras Plugin

**React VLibras Plugin** integra o widget de acessibilidade VLibras em aplicações React, traduzindo conteúdo para Língua Brasileira de Sinais (Libras).

## Instalação

Instale com npm:

```bash
npm install voicecapture-react
```

## Uso

### 1. Importe o Componente

```javascript
import VoiceCapture from 'voicecapture-react';
```

### 2. Adicione o Componente ao JSX

```jsx
<VoiceCapture />
```

### Propriedades

- **`position`**: Posição do widget (`left`, `right`, `top`, `bottom`, `bottom-left`, `top-left`, `bottom-right`, `top-right`). Padrão: `left`.

  Exemplo:
  ```jsx
  <VoiceCapture position="right" />
  ```

- **`avatar`**: Avatar do widget (`icaro`, `hosana`, `guga`, `random`). Padrão: `random`.

  Exemplo:
  ```jsx
  <VoiceCapture avatar="guga" />
  ```

- **`opacity`**: Opacidade do widget (`0` a `1`). Padrão: `1`.

  Exemplo:
  ```jsx
  <VoiceCapture opacity={0.8} />
  ```