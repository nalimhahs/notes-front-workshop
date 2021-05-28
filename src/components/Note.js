import React, { useState } from 'react';
import { Card, Text, Button, Spacer, Row, Col } from '@geist-ui/react';

export default props => {
  const [loading, setLoading] = useState(false);

  return (
    <Card shadow style={{ padding: '0.5rem' }}>
      <Text h4>{props.heading}</Text>
      <Text p>{props.content}</Text>
      <Spacer y={1} />
      <Row justify="end">
        <Col style={{ width: 'auto' }}>
          {loading ? (
            <Button type="error" auto ghost loading>
              Delete
            </Button>
          ) : (
            <Button
              type="error"
              auto
              ghost
              onClick={async () => {
                setLoading(true);
                await props.onDelete(props.id);
                setLoading(false);
              }}
            >
              Delete
            </Button>
          )}
        </Col>
      </Row>
    </Card>
  );
};
