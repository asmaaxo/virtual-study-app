// src/pages/DashboardPage.jsx
import React, { useEffect, useState } from 'react'
import API from '../services/api'
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

export default function Dashboard() {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          <Card className="shadow-lg">
            <Card.Body>
              <Card.Title as="h2" className="text-center mb-4">
                Welcome to StudyGroups
              </Card.Title>
              <Card.Text as="div" className="fs-5">
                <p>
                  <strong>StudyGroups</strong> is your all-in-one platform designed to revolutionize the way you organize and participate in study groups. Whether you're a student seeking collaborative learning opportunities or an educator aiming to facilitate effective study sessions, StudyGroups offers intuitive tools to meet your needs. Easily create and manage groups based on your preferred subjects, invite peers to join, and schedule study sessions that fit your busy schedule. Our seamless interface allows you to track upcoming sessions, share essential resources, and communicate effortlessly with group members through integrated messaging features. Additionally, StudyGroups provides insightful analytics to help you monitor your progress and optimize your study strategies. With robust security measures in place, your data and interactions are always protected. Empower your academic journey with StudyGroup’s comprehensive functionalities, fostering a collaborative and productive learning environment for everyone involved.
                </p>
                <hr />
                <h4>Key Features:</h4>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Group Management:</strong> Create, edit, and delete study groups tailored to specific subjects or interests.
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Session Scheduling:</strong> Organize one-time or recurring study sessions with customizable time slots.
                  </ListGroup.Item>
                 
                  <ListGroup.Item>
                    <strong>Secure Environment:</strong> Benefit from top-notch security protocols ensuring your data and communications remain confidential.
                  </ListGroup.Item>
                </ListGroup>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
