import React, { useState } from 'react';
import { Card, ListGroup, Dropdown } from 'react-bootstrap';

const Complaints = () => {
  const [messages, setMessages] = useState([
    {
      studentID: '123',
      studentName: 'John Doe',
      hostel: 'Hostel A',
      roomNumber: '101',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      date: '2023-11-10',
      type: 'message', // 'message' or 'complaint'
    },
    // Add more messages as needed
  ]);

  const [complaints, setComplaints] = useState([
    {
      studentID: '456',
      studentName: 'Jane Doe',
      hostel: 'Hostel B',
      roomNumber: '202',
      content: 'Laundry machine not working properly.',
      date: '2023-11-09',
      type: 'complaint', // 'message' or 'complaint'
    },
    // Add more complaints as needed
  ]);

  const [selectedDate, setSelectedDate] = useState('');

  const allItems = [...messages, ...complaints];
  const sortedItems = allItems.sort((a, b) => new Date(b.date) - new Date(a.date));

  const renderItems = () => {
    const filteredItems =
      selectedDate === ''
        ? sortedItems
        : sortedItems.filter((item) => item.date === selectedDate);

    return filteredItems.map((item, index) => (
      <ListGroup.Item key={index} className={item.type === 'message' ? 'message-item' : 'complaint-item'}>
        <Card>
          <Card.Body>
            <Card.Title>
              {item.studentName} (ID: {item.studentID})
            </Card.Title>
            <Card.Text>{item.content}</Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted">
            Posted on {item.date} at {item.hostel}, Room {item.roomNumber}
          </Card.Footer>
        </Card>
      </ListGroup.Item>
    ));
  };

  const handleDateFilter = (date) => {
    setSelectedDate(date);
  };

  const renderDateFilterDropdown = () => {
    const uniqueDates = [...new Set(allItems.map((item) => item.date))];

    return (
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {selectedDate ? `Filtering by ${selectedDate}` : 'Filter by Date'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {uniqueDates.map((date, index) => (
            <Dropdown.Item key={index} onClick={() => handleDateFilter(date)}>
              {date}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  return (
    <div>
      <header>
        {/* Blank header */}
        <div style={{ height: '50px' }}></div>
      </header>

      {/* Display messages and complaints sorted by most recent with date filtering */}
      <div className="container mt-5">
        <h2>Student Messages and Complaints</h2>
        {renderDateFilterDropdown()}
        <ListGroup>{renderItems()}</ListGroup>
      </div>
    </div>
  );
};

export default Complaints;
