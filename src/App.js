import React, { useState } from 'react';
import { GeistProvider, CssBaseline } from '@geist-ui/react';
import {
  Page,
  Row,
  Text,
  Col,
  Button,
  Spacer,
  Grid,
  Divider,
  Code,
  useModal
} from '@geist-ui/react';

import Note from './components/Note.js';
import AddNote from './components/AddNote.js';

export default function App() {
  const { visible, setVisible, bindings } = useModal();
  const [notes, setNotes] = useState([]);

  const handleDelete = async id => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    var temp = [...notes];
    temp = temp.filter(note => {
      return note.id !== id;
    });
    setNotes(temp);
    console.log('Deleted: ', id);
  };

  const handleAdd = async (title, content) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setNotes([
      ...notes,
      {
        title: title,
        content: content,
        id: (notes[notes.length - 1]?.id + 1) | 0
      }
    ]);
    setVisible(false);
  };

  return (
    <GeistProvider>
      <CssBaseline />
      <Page size="large">
        <Spacer y={4} />
        <Row>
          <Text h1>My Notes.</Text>
        </Row>
        <Spacer y={3} />
        <Row justify="space-between" align="middle">
          <Col>
            <Code size="1.35rem" block width="11rem">
              You have {notes.length} notes!
            </Code>
          </Col>
          <Col style={{ float: 'right' }}>
            <Row justify="end">
              <Button
                type="secondary"
                size="large"
                shadow
                onClick={() => setVisible(true)}
              >
                Add Note
              </Button>
            </Row>
          </Col>
        </Row>
        <Spacer y={3} />
        <Divider />
        <Spacer y={6} />
        <Grid.Container gap={2} justify="left">
          {notes?.map(note => {
            return (
              <Grid xs={24} sm={12} md={8} alignItems="baseline">
                <Note
                  id={note.id}
                  heading={note.title}
                  content={note.content}
                  onDelete={() => handleDelete(note.id)}
                />
              </Grid>
            );
          })}
        </Grid.Container>
      </Page>
      <AddNote
        bindings={bindings}
        visible={visible}
        setVisible={setVisible}
        handleAdd={handleAdd}
      />
    </GeistProvider>
  );
}
