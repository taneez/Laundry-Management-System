import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPortal = () => {
  const [laundryData, setLaundryData] = useState([
    {
      hostelName: "Hostel A",
      dateReceived: "2023-11-10",
      bagsReceived: 5,
      status: "Received",
      submissions: [
        {
          name: "John Doe",
          email: "john@example.com",
          phoneNumber: "123-456-7890",
          clothesCount: 10,
        },
        // Add more submissions as needed
      ],
    },
    {
      hostelName: "Hostel B",
      dateReceived: "2023-11-09",
      bagsReceived: 8,
      status: "Washing",
      submissions: [
        {
          name: "Jane Doe",
          email: "jane@example.com",
          phoneNumber: "987-654-3210",
          clothesCount: 15,
        },
        // Add more submissions as needed
      ],
    },
    // Add more data as needed
  ]);

  const [filterHostel, setFilterHostel] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [sortBy, setSortBy] = useState(""); // 'hostel', 'date', 'status'
  const [sortOrder, setSortOrder] = useState(""); // 'asc', 'desc'

  const [messageHostel, setMessageHostel] = useState("");
  const [adminMessage, setAdminMessage] = useState("");

  const handleEditStatus = (index, newStatus) => {
    const updatedLaundryData = [...laundryData];
    updatedLaundryData[index].status = newStatus;
    setLaundryData(updatedLaundryData);
    toast.success(
      `Status updated for ${updatedLaundryData[index].hostelName}`,
      {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          fontSize: "18px",
          padding: "20px",
        },
      }
    );
  };

  const handleSendMessage = () => {
    if (!messageHostel || !adminMessage) {
      toast.error("Please select a hostel and enter a message!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          fontSize: "18px",
          padding: "20px",
        },
      });
      return;
    }

    // Code to send a message to the selected hostel
    toast.success(`Message sent to ${messageHostel}: ${adminMessage}`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        fontSize: "18px",
        padding: "20px",
      },
    });

    // Clear message input fields after sending
    setMessageHostel("");
    setAdminMessage("");
  };

  const renderLaundryTable = () => {
    // Apply filters to the data
    let filteredData = [...laundryData];

    if (filterHostel) {
      filteredData = filteredData.filter(
        (entry) => entry.hostelName === filterHostel
      );
    }

    if (filterDate) {
      filteredData = filteredData.filter(
        (entry) => entry.dateReceived === filterDate
      );
    }

    if (filterStatus) {
      filteredData = filteredData.filter(
        (entry) => entry.status === filterStatus
      );
    }

    // Apply sorting
    if (sortBy && sortOrder) {
      filteredData = filteredData.sort((a, b) => {
        const valueA = a[sortBy];
        const valueB = b[sortBy];

        if (sortOrder === "asc") {
          return valueA.localeCompare(valueB, undefined, { numeric: true });
        } else {
          return valueB.localeCompare(valueA, undefined, { numeric: true });
        }
      });
    }

    return (
      <div className="row mt-3">
        <div className="col-md-9">
          <h3>Laundry Information from Each Hostel</h3>
          {/* Filter dropdowns */}
          <div className="mb-3">
            <label className="mr-2">Filter by Hostel:</label>
            <select
              className="form-select"
              onChange={(e) => setFilterHostel(e.target.value)}
              value={filterHostel}
            >
              <option value="">All Hostels</option>
              {/* Add hostel options dynamically based on available hostels */}
              {Array.from(
                new Set(laundryData.map((entry) => entry.hostelName))
              ).map((hostel, index) => (
                <option key={index} value={hostel}>
                  {hostel}
                </option>
              ))}
            </select>

            <label className="mx-2">Filter by Date:</label>
            <select
              className="form-select"
              onChange={(e) => setFilterDate(e.target.value)}
              value={filterDate}
            >
              <option value="">All Dates</option>
              {/* Add date options dynamically based on available dates */}
              {Array.from(
                new Set(laundryData.map((entry) => entry.dateReceived))
              ).map((date, index) => (
                <option key={index} value={date}>
                  {date}
                </option>
              ))}
            </select>

            <label className="mx-2">Filter by Status:</label>
            <select
              className="form-select"
              onChange={(e) => setFilterStatus(e.target.value)}
              value={filterStatus}
            >
              <option value="">All Statuses</option>
              {/* Add status options dynamically based on available statuses */}
              {Array.from(
                new Set(laundryData.map((entry) => entry.status))
              ).map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Sort options */}
          <div className="mb-3">
            <label className="mr-2">Sort By:</label>
            <select
              className="form-select"
              onChange={(e) => handleSort(e.target.value)}
              value={sortBy}
            >
              <option value="">None</option>
              <option value="hostel">Hostel</option>
              <option value="date">Date</option>
              <option value="status">Status</option>
            </select>

            <label className="mx-2">Sort Order:</label>
            <select
              className="form-select"
              onChange={(e) => setSortOrder(e.target.value)}
              value={sortOrder}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Hostel Name</th>
                <th>Date Received</th>
                <th>Bags Received</th>
                <th>Status</th>
                <th>Edit Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.hostelName}</td>
                  <td>{entry.dateReceived}</td>
                  <td
                    onClick={() => handleViewDetails(index)}
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    {entry.bagsReceived}
                  </td>
                  <td style={{ backgroundColor: getStatusColor(entry.status) }}>
                    {entry.status}
                  </td>
                  <td>
                    <div className="input-group">
                      <select
                        className="form-select"
                        onChange={(e) =>
                          handleEditStatus(index, e.target.value)
                        }
                        value={entry.status}
                      >
                        <option value="Received">Received</option>
                        <option value="Washing">Washing</option>
                        <option value="Drying">Drying</option>
                        <option value="Ready to Collect">
                          Ready to Collect
                        </option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-3">
          {/* Message Box */}
          <div className="card">
            <div className="card-body">
              <h4>Send Message to Hostel</h4>
              <div className="form-group">
                <label htmlFor="messageHostel">Hostel:</label>
                <select
                  className="form-control"
                  id="messageHostel"
                  onChange={(e) => setMessageHostel(e.target.value)}
                  value={messageHostel}
                >
                  <option value="">Select Hostel</option>
                  {Array.from(
                    new Set(laundryData.map((entry) => entry.hostelName))
                  ).map((hostel, index) => (
                    <option key={index} value={hostel}>
                      {hostel}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="adminMessage">Message:</label>
                <textarea
                  className="form-control"
                  id="adminMessage"
                  rows="3"
                  value={adminMessage}
                  onChange={(e) => setAdminMessage(e.target.value)}
                ></textarea>
              </div>
              <button className="btn btn-info" onClick={handleSendMessage}>
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Received":
        return "lightblue";
      case "Washing":
        return "lightorange";
      case "Drying":
        return "lightyellow";
      case "Ready to Collect":
        return "lightgreen";
      default:
        return "white";
    }
  };

  const handleSort = (field) => {
    // Sort by the specified field
    if (field === sortBy) {
      // If already sorting by this field, toggle the sort order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If sorting by a new field, set the sort field and order
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handleViewDetails = (index) => {
    const hostelName = laundryData[index].hostelName;
    const details = laundryData[index].submissions.map((submission, idx) => (
      <tr key={idx}>
        <td>{submission.name}</td>
        <td>{submission.email}</td>
        <td>{submission.phoneNumber}</td>
        <td>{submission.clothesCount}</td>
      </tr>
    ));

    // Show details in a new table
    toast.info(
      <div>
        <h3>Details for Submissions from {hostelName}</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Number of Clothes</th>
            </tr>
          </thead>
          <tbody>{details}</tbody>
        </table>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          fontSize: "18px",
          padding: "20px",
        },
      }
    );
  };

  return (
    <div>
      <header>
        {/* Blank header */}
        <div style={{ height: "50px" }}></div>
      </header>
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-12">{renderLaundryTable()}</div>
          </div>
        </div>
        {/* ToastContainer for notifications */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default AdminPortal;
