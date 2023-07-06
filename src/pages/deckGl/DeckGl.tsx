import React from 'react';

import { Review } from '@/components';

function DeckGl() {
  return (
    <React.Fragment>
      <Review
        topics={[
          { title: 'Dificuldade de implementação', description: 'Média/Alta (Muitos módulos).' },
          { title: 'Tempo estimado', description: '--' },
          { title: 'Preço', description: 'Gratuito.' },
          { title: 'Robustez', description: 'Muitas funcionalidades e complementos.' },
          { title: 'Documentação', description: 'Mediana / Completa.' },
          { title: 'Última atualização', description: 'v8.9.19 (Junho de 2023).' },
          { title: 'Possibilidade de adicionar instrumentos em coordenadas', description: 'Sim.' }
        ]}
        observations={[
          { description: 'Biblioteca modular.' },
          { description: 'Suporte a TypeScript.' },
          { description: 'Empacotamento para React JS.' },
          { description: 'Diversas integração com bibliotecas.' },
          { description: 'Suporte a várias bases de mapa (Google, Mapbox, ArcGis).' },
          { description: 'Além da documentação oficial, possui pouco conteúdo na internet.' },
          { description: 'Exemplo Mapa de Relevo 1: https://deck.gl/examples/terrain-layer' },
          { description: 'Exemplo Mapa de Relevo 2: https://deck.gl/examples/terrain-extension' },
          { description: 'Exemplo Modelo 3D: https://deck.gl/docs/api-reference/mesh-layers/simple-mesh-layer' },
        ]}
      />
    </React.Fragment>
  );
}

export default DeckGl;
