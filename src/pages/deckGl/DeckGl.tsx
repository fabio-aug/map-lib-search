import React from 'react';

import { Review } from '@/components';

function DeckGl() {
  return (
    <React.Fragment>
      <Review
        topics={[
          { title: 'Dificuldade de implementação', description: 'Média/Alta (Muitos módulos);' },
          { title: 'Tempo estimado', description: '--' },
          { title: 'Preço', description: 'Gratuito (open source);' },
          { title: 'Robustez', description: 'Muitas funcionalidades e formas de renderização;' },
          { title: 'Documentação', description: 'Mediana / Completa;' },
          { title: 'Última atualização', description: 'v8.9.19 (Junho de 2023);' },
          { title: 'Possibilidade de adicionar instrumentos em coordenadas', description: 'Sim;' },
          { title: 'Licença', description: 'MIT.' }
        ]}
        observations={[
          { description: 'Biblioteca modular;' },
          { description: 'Suporte a TypeScript;' },
          { description: 'Empacotamento para React JS;' },
          { description: 'Diversas integração com bibliotecas;' },
          { description: 'Além da documentação oficial, possui pouco conteúdo na internet;' },
          { description: 'Exemplo Mapa de Relevo 1: https://deck.gl/examples/terrain-layer;' },
          { description: 'Exemplo Mapa de Relevo 2: https://deck.gl/examples/terrain-extension;' },
          { description: 'Possui integração com outros sistemas de layers como ArcGis, MapBox e Google Maps;' },
          { description: 'Exemplo Modelo 3D: https://deck.gl/docs/api-reference/mesh-layers/simple-mesh-layer.' },
        ]}
      />
    </React.Fragment>
  );
}

export default DeckGl;
