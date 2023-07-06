import React, { useEffect } from 'react';
import { Card } from 'antd';
import * as THREE from 'three';
import TrimbleMaps from '@trimblemaps/trimblemaps-js';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';

import { Review } from '@/components';
import Model from './file/building_04.dae';

function TrimbleMapsComponent() {
  useEffect(() => {
    // Para pegar um novo token.
    // https://developer.trimblemaps.com/get-an-api-key/na/.
    TrimbleMaps.APIKey = '0AC3665B9C018F428FBD6DF1A63139B9';

    const myMap = new TrimbleMaps.Map({
      container: 'myMap',
      style: TrimbleMaps.Common.Style.TERRAIN,
      zoom: 16,
      center: [-122.34929, 47.6216],
      pitch: 60,
      antialias: true, // create the gl context with MSAA antialiasing, so custom layers are antialiased
    });

    // configuration of the custom layer for a 3D model per the CustomLayerInterface
    const customLayer = {
      id: '3d-model',
      type: 'custom',
      renderingMode: '3d',
      onAdd: function (map: any, gl: any) {
        const scene = new THREE.Scene();
        // use the three.js Collada loader to add the 3D model to the three.js scene
        const loader = new ColladaLoader();
        // './data/space_needle.dae'
        loader.load(Model, function (dae: any) {
          scene.add(dae.scene);
        }.bind(this));

        // create three.js lights to illuminate the model
        const directionalLight = new THREE.DirectionalLight(0x999999);
        directionalLight.position.set(0, -70, 100).normalize();
        scene.add(directionalLight);

        const directionalLight2 = new THREE.DirectionalLight(0x999999);
        directionalLight2.position.set(0, 70, 100).normalize();
        scene.add(directionalLight2);

        const light = new THREE.AmbientLight(0x666666); // soft white light
        scene.add(light);
        this.scene = scene;

        // use the GL JS map canvas for three.js
        const renderer = new THREE.WebGLRenderer({
          canvas: map.getCanvas(),
          context: gl,
          antialias: true,
        });

        renderer.autoClear = false;
        this.renderer = renderer;
      },
      render: function (gl: any, matrix: any) {
        // parameters to ensure the model is georeferenced correctly on the map
        const modelAltitude = 0;
        const modelOrigin = [-122.34929, 47.6204];
        const modelRotate = [Math.PI / 2, 0, 0];
        const modelAsMercatorCoordinate = TrimbleMaps.MercatorCoordinate.fromLngLat(
          modelOrigin,
          modelAltitude
        );
        // transformation parameters to position, rotate and scale the 3D model onto the map
        const modelTransform = {
          translateX: modelAsMercatorCoordinate.x,
          translateY: modelAsMercatorCoordinate.y,
          translateZ: modelAsMercatorCoordinate.z,
          rotateX: modelRotate[0],
          rotateY: modelRotate[1],
          rotateZ: modelRotate[2],
          /* Since our 3D model is in real world meters, a scale transform needs to be
           * applied since the CustomLayerInterface expects units in MercatorCoordinates.
           */
          scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits(),
        };

        const rotationX = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(1, 0, 0),
          modelTransform.rotateX
        );
        const rotationY = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 1, 0),
          modelTransform.rotateY
        );
        const rotationZ = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 0, 1),
          modelTransform.rotateZ
        );
        const m = new THREE.Matrix4().fromArray(matrix);
        const l = new THREE.Matrix4()
          .makeTranslation(modelTransform.translateX, modelTransform.translateY, modelTransform.translateZ)
          .scale(new THREE.Vector3(modelTransform.scale, -modelTransform.scale, modelTransform.scale))
          .multiply(rotationX)
          .multiply(rotationY)
          .multiply(rotationZ);

        const camera = new THREE.Camera();
        camera.projectionMatrix = m.multiply(l);
        this.renderer.resetState();
        this.renderer.render(this.scene, camera);
      },
    };

    myMap.on('style.load', function () {
      if (myMap.getLayer(customLayer.id) == null) {
        myMap.addLayer(customLayer);
      }
    });
  }, []);

  return (
    <React.Fragment>
      <Review
        topics={[
          { title: 'Dificuldade de implementação', description: 'Baixa (Estrutura e sintaxe semelhante a do leaflet puro).' },
          { title: 'Tempo estimado', description: 'Por volta de 2-3 meses.' },
          { title: 'Preço', description: 'Aproximadamente $200 por mês (R$968,20).' },
          { title: 'Robustez', description: 'Possui bastante funcionalidades voltadas a rotas.' },
          { title: 'Documentação', description: 'Simples / Mediana.' },
          { title: 'Última atualização', description: 'v3.10.0 (Junho de 2023).' },
          { title: 'Possibilidade de adicionar instrumentos em coordenadas', description: 'Sim.' }
        ]}
        observations={[
          { description: 'TrimbleMaps + Three JS.' },
          { description: 'Biblioteca relativamente nova.' },
          { description: 'Baixa integração com TypeScript.' },
          { description: 'Suporte a diferentes formatos de modelos 3D.' },
          { description: 'Além da documentação oficial, possui pouco conteúdo na internet.' },
          { description: 'Não possui integração com outros sistemas de layers como arcgis (usado no momento) e mapbox.' },
        ]}
      />
      <Card title="Mapa" style={full}>
        <div id='myMap' style={full}>
          .
        </div>
      </Card>
    </React.Fragment>
  );
}

export default TrimbleMapsComponent;

const full: React.CSSProperties = {
  height: '100%', width: '100%'
};
