import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Fragment, useEffect, useState } from "react";
import Footer from "./components/footer/Footer";
import Main from "./components/main/Main";
import Modal from "./components/modal/Modal";

function App() {
  const [userNameInput, setUserNameInput] = useState(null);
  const [userName, setUserName] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    !userName && setShowModal(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnModalClose = () => {
    setUserName(userNameInput);
    setShowModal(false);
  };

  return (
    <Fragment>
      <Navbar userName={userName} changeName={() => setShowModal(true)} />
      <Main userName={userName} />
      <Footer />
      <Modal title="Add Post" onClose={handleOnModalClose} show={showModal}>
        <div className="form">
          <label>Type what you think to post</label>
          <input
            onChange={(e) => setUserNameInput(e.target.value)}
            className="username"
          />
          <button onClick={handleOnModalClose} className="saveBtn">
            Save
          </button>
        </div>
      </Modal>
    </Fragment>
  );
}

export default App;
