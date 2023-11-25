import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentPortal = () => {
  const [clothesCount, setClothesCount] = useState(0);
  const [laundryHistory, setLaundryHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [complaint, setComplaint] = useState("");

  const handleClothesSubmit = () => {
    // Check if the number of clothes is greater than 0
    if (clothesCount <= 0) {
      toast.error("Please enter a valid number of clothes (greater than 0)!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        style: {
          fontSize: "18px",
          padding: "20px",
        },
      });
      return;
    }

    // Simulating submission of clothes count
    const submissionDate = new Date().toLocaleDateString();
    const newLaundryStatus = {
      givenClothes: clothesCount,
      status: "Received bag",
      submissionDate: submissionDate,
    };

    setLaundryHistory([newLaundryStatus, ...laundryHistory]);

    // Clear the text box after submission
    setClothesCount(0);

    // Show laundry submission notification
    toast.success("Your laundry has been submitted!", {
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
  };

  const handleComplaintSubmit = async () => {
    // Simulating submission of complaint
    if (complaint.trim() !== "") {
      try {
        const response = await fetch("http://localhost:3001/submitComplaint", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ complaintText: complaint }),
        });

        if (response.ok) {
          toast.info("Your complaint has been submitted!", {
            position: "top-center",
            autoClose: 1000,
            pauseOnFocusLoss: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            style: {
              fontSize: "18px",
              padding: "20px",
            },
          });

          // Clear the complaint text box after submission
          setComplaint("");
        } else {
          toast.error("Failed to submit complaint. Please try again later.", {
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
        }
      } catch (error) {
        console.error("Error during complaint submission:", error);
        toast.error(
          "Error during complaint submission. Please try again later.",
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
      }
    } else {
      toast.error("Please enter a valid complaint!", {
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
    }
  };

  const handleRemoveEntry = (index) => {
    const updatedHistory = [...laundryHistory];
    updatedHistory.splice(index, 1);
    setLaundryHistory(updatedHistory);
  };

  // const handleSortByDate = () => {
  //   const sortedHistory = [...laundryHistory].sort(
  //     (a, b) => new Date(b.submissionDate) - new Date(a.submissionDate)
  //   );
  //   setFilteredHistory(sortedHistory);
  // };

  const handleFilterByDate = (date) => {
    setSelectedDate(date);
    const filtered = laundryHistory.filter(
      (entry) => entry.submissionDate === date
    );
    setFilteredHistory(filtered);
  };

  const renderDateFilterDropdown = () => {
    const uniqueDates = [
      ...new Set(laundryHistory.map((entry) => entry.submissionDate)),
    ];
    return (
      <div className="form-group">
        <label htmlFor="dateFilter">Filter by Date:</label>
        <select
          className="form-control"
          id="dateFilter"
          onChange={(e) => handleFilterByDate(e.target.value)}
          value={selectedDate}
        >
          <option value="">All Dates</option>
          {uniqueDates.map((date, index) => (
            <option key={index} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const renderLaundryHistoryTable = () => {
    if (laundryHistory.length === 0) {
      return null; // Don't render anything if no entries
    }
    const historyToDisplay = selectedDate ? filteredHistory : laundryHistory;
    return (
      <div className="container mt-3">
        <h3>Laundry Submission History</h3>
        {renderDateFilterDropdown()}
        <table className="table">
          <thead>
            <tr>
              <th>Date of Submission</th>
              <th>Number of Clothes</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {historyToDisplay.map((entry, index) => (
              <tr key={index}>
                <td>{entry.submissionDate}</td>
                <td>{entry.givenClothes}</td>
                <td style={{ color: getStatusColor(entry.status) }}>
                  {entry.status}
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveEntry(index)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Received bag":
        return "blue";
      case "Washing clothes":
        return "green";
      case "Drying clothes":
        return "orange";
      case "Ready to collect":
        return "purple";
      default:
        return "black";
    }
  };

  return (
    <div>
      <header>
        {/* Blank header */}
        <div style={{ height: "50px" }}></div>
      </header>
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-8">
            <h2>Give your Laundry!</h2>
            <div className="form-group">
              <label htmlFor="clothesCount">
                Number of Clothes to be Given:
              </label>
              <input
                type="number"
                className="form-control"
                id="clothesCount"
                value={clothesCount}
                onChange={(e) => setClothesCount(parseInt(e.target.value))}
                style={{ marginTop: 10, marginBottom: 10 }}
              />
            </div>
            <button className="btn btn-primary" onClick={handleClothesSubmit}>
              Submit
            </button>

            {/* Laundry Submission History Table */}
            {renderLaundryHistoryTable()}
          </div>

          {/* Raise Complaint Section */}
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h4>Raise Complaint</h4>
                <div className="form-group">
                  <label htmlFor="complaint">Enter Your Complaint:</label>
                  <textarea
                    className="form-control"
                    id="complaint"
                    rows="3"
                    value={complaint}
                    onChange={(e) => setComplaint(e.target.value)}
                    style={{ marginTop: 10, marginBottom: 10 }}
                  ></textarea>
                </div>
                <button
                  className="btn btn-info"
                  onClick={handleComplaintSubmit}
                >
                  Submit Complaint
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* ToastContainer for notifications */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default StudentPortal;
