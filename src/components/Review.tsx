import React from 'react';
import { Card } from 'antd';

import { IObservation, ITopic } from '@/interfaces/Global';

interface IProps {
  topics: Array<ITopic>,
  observations?: Array<IObservation>,
}

function Review({ topics, observations }: IProps) {
  return (
    <React.Fragment>
      <Card title='Pontos' size='default'>
        {topics.map((topic, key) => (
          <p key={key}>
            <b>{topic.title}: </b> {topic.description}
          </p>
        ))}
      </Card>
      {observations && observations.length >= 1 && (
        <Card title='Observações' size='default' style={{ marginTop: 10, marginBottom: 10 }}>
          {observations.map((topic, key) => (
            <p key={key}>
              <b>{key + 1} - </b> {topic.description}
            </p>
          ))}
        </Card>
      )}
    </React.Fragment>
  );
}

export default Review;
