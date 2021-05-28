import React, { useState } from 'react';
import {
  Text,
  Button,
  Spacer,
  Row,
  Col,
  Modal,
  Input,
  Textarea
} from '@geist-ui/react';

export default props => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <Modal width="35rem" {...props.bindings}>
      <Modal.Title>
        <Text h2>New Note</Text>
      </Modal.Title>
      <Spacer y={1} />
      <Modal.Content>
        <Text h5>Title</Text>
        <Input
          placeholder="Note title"
          width="100%"
          onChange={e => {
            setTitle(e.target.value);
          }}
        />
        <Spacer y={1} />
        <Text h5>Content</Text>
        <Textarea
          placeholder="Enter Content"
          width="100%"
          onChange={e => {
            setContent(e.target.value);
          }}
        />
        <Spacer y={3} />
        <Row justify="space-between" gap={0}>
          <Col>
            <Button auto ghost onClick={() => setVisible(false)}>
              Cancel
            </Button>
          </Col>
          <Col style={{ width: 'auto' }}>
            {loading ? (
              <Button type="success" loading>
                Add Note
              </Button>
            ) : (
              <Button
                type="success"
                onClick={async () => {
                  setLoading(true);
                  await props.handleAdd(title, content);
                  setTitle('');
                  setContent('');
                  setLoading(false);
                }}
              >
                Add Note
              </Button>
            )}
          </Col>
        </Row>
      </Modal.Content>
    </Modal>
  );
};
