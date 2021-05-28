import React, { useState, useEffect } from 'react';
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
  useModal,
  Loading
} from '@geist-ui/react';
import axios from 'axios';

import Note from './components/Note.js';
import AddNote from './components/AddNote.js';

const BASE_URL = 'https://todo-acm.herokuapp.com/';

export default function App() {
  const { visible, setVisible, bindings } = useModal();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNotes = async () => {
    const res = await axios.get(BASE_URL);
    return res.data;
  };

  const updateNotes = async () => {
    setLoading(true);
    const data = await getNotes();
    setNotes(data);
    setLoading(false);
  };

  const handleDelete = async id => {
    const res = await axios.delete(BASE_URL + id + '/');
    updateNotes();
  };

  const handleAdd = async (title, content) => {
    const res = await axios.post(BASE_URL, {
      title: title,
      content: content,
      end_date: new Date()
    });
    updateNotes();
    setVisible(false);
  };

  useEffect(() => {
    getNotes().then(data => {
      setLoading(true);
      setNotes(data);
      setLoading(false);
    });
  }, []);

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
              You have {notes?.length} notes!
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
        {loading ? (
          <Row style={{ padding: '10px 0' }}>
            <Loading size="large" />
          </Row>
        ) : (
          <Grid.Container gap={2} justify="left">
            {notes?.map(note => {
              return (
                <Grid xs={24} sm={12} md={8} alignItems="baseline">
                  <Note
                    key={note.id}
                    id={note.id}
                    heading={note.title}
                    content={note.content}
                    onDelete={() => handleDelete(note.id)}
                  />
                </Grid>
              );
            })}
          </Grid.Container>
        )}
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
