import React, { useEffect } from 'react';
import { Card } from 'antd';

import { Map, MercatorCoordinate, LngLatLike, CustomLayerInterface } from 'maplibre-gl';
import { Camera, Scene, WebGLRenderer, Matrix4, DirectionalLight, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

import { Review } from '@/components';

function MapLibre() {

  useEffect(() => {
    const apiKey = 'AAPKcb32275c39b14b7aa87f37ed1d46ccfe_lnjHiBq3nVM-jf50YWEAnyCcL12rOmFpSp9vZ2Y48MwtiMQtwkrWhVXKFSNVW6q';
    const basemapEnum = 'ArcGIS:Streets';

    const map = new Map({
      container: 'myMap',
      center: [-43.838766414016355, -19.869726408563047],
      style: `https://basemaps-api.arcgis.com/arcgis/rest/services/styles/${basemapEnum}?type=style&token=${apiKey}`,
      zoom: 18,
      pitch: 60,
      antialias: true
    });

    const modelOrigin: LngLatLike = [-43.838766414016355, -19.869726408563047];
    const modelAltitude = 0;
    const modelRotate = [Math.PI / 2, 0, 0];

    const modelAsMercatorCoordinate = MercatorCoordinate.fromLngLat(
      modelOrigin,
      modelAltitude
    );

    const modelTransform = {
      translateX: modelAsMercatorCoordinate.x,
      translateY: modelAsMercatorCoordinate.y,
      translateZ: modelAsMercatorCoordinate.z,
      rotateX: modelRotate[0],
      rotateY: modelRotate[1],
      rotateZ: modelRotate[2],
      scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
    };

    const customLayer: CustomLayerInterface = {
      id: '3d-model',
      type: 'custom',
      renderingMode: '3d',
      onAdd: function (map: Map, gl: WebGLRenderingContext | WebGL2RenderingContext) {
        this.camera = new Camera();
        this.scene = new Scene();

        const directionalLight = new DirectionalLight(0xffffff);
        directionalLight.position.set(0, -70, 100).normalize();
        this.scene.add(directionalLight);

        const directionalLight2 = new DirectionalLight(0xffffff);
        directionalLight2.position.set(0, 70, 100).normalize();
        this.scene.add(directionalLight2);

        const loader = new GLTFLoader();
        loader.load(
          'https://maplibre.org/maplibre-gl-js-docs/assets/34M_17/34M_17.gltf',
          function (gltf) {
            this.scene.add(gltf.scene);
          }.bind(this)
        );
        this.map = map;

        this.renderer = new WebGLRenderer({
          canvas: map.getCanvas(),
          context: gl,
          antialias: true
        });

        this.renderer.autoClear = false;
      },
      render: function (gl, matrix) {
        const rotationX = new Matrix4().makeRotationAxis(
          new Vector3(1, 0, 0),
          modelTransform.rotateX
        );
        const rotationY = new Matrix4().makeRotationAxis(
          new Vector3(0, 1, 0),
          modelTransform.rotateY
        );
        const rotationZ = new Matrix4().makeRotationAxis(
          new Vector3(0, 0, 1),
          modelTransform.rotateZ
        );

        const m = new Matrix4().fromArray(matrix);
        const l = new Matrix4()
          .makeTranslation(
            modelTransform.translateX,
            modelTransform.translateY,
            modelTransform.translateZ
          )
          .scale(
            new THREE.Vector3(
              modelTransform.scale,
              -modelTransform.scale,
              modelTransform.scale
            )
          )
          .multiply(rotationX)
          .multiply(rotationY)
          .multiply(rotationZ);

        this.camera.projectionMatrix = m.multiply(l);
        this.renderer.resetState();
        this.renderer.render(this.scene, this.camera);
        this.map.triggerRepaint();
      }
    };

    map.on('style.load', function () {
      map.addLayer(customLayer);
    });
  }, []);


  return (
    <React.Fragment>
      <Review
        topics={[
          { title: 'Dificuldade de implementação', description: 'Baixa / Média (Estrutura e sintaxe semelhante a do leaflet puro);' },
          { title: 'Tempo estimado', description: 'Por volta de 2-3 meses;' },
          { title: 'Preço', description: 'Gratuito (open source);' },
          { title: 'Robustez', description: 'Muitas funcionalidades e integrações;' },
          { title: 'Documentação', description: 'Mediana / Completa (Um pouco confusa na organização);' },
          { title: 'Última atualização', description: 'v3.1.0 (Junho de 2023);' },
          { title: 'Possibilidade de adicionar instrumentos em coordenadas', description: 'Sim;' },
          { title: 'Licença', description: '3-Clause BSD license (Permissiva. necessário manter o copyright).' }
        ]}
        observations={[
          { description: 'Suporte ao TypeScript;' },
          { description: 'MapLibre + (Three JS ou Babylon JS);' },
          { description: 'Além da documentação oficial, bastante conteúdo na internet;' },
          { description: 'Possui integração com outros sistemas de layers como ArcGis, MapBox e Google Maps;' },
          { description: 'Exemplo Mapa de Relevo: https://maplibre.org/maplibre-gl-js-docs/example/3d-terrain/;' },
          { description: 'Possui uma página só de plugins que complementam a biblioteca (PDF, Acessibilidade, Linguagem).' },
        ]}
      />

      <Card title='Mapa' style={full}>
        <div id='myMap' style={full}>
          .
        </div>
      </Card>
    </React.Fragment>
  );
}

export default MapLibre;

const full: React.CSSProperties = {
  height: '100%', width: '100%'
};
