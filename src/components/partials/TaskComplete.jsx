import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import GaugeChart from "react-gauge-chart";
const TaskComplete = ({ message, links, title, analytics }) => {
  const navigate = useNavigate();
  const { missed, incorrect, hits, total, difficultKeys } = analytics;
  const accuracy = useRef((total / hits).toFixed(2));
  // console.log(analytics);
  return (
    <div className="flex-center">
      <Modal message={message}></Modal>
      {/* <div>{`missed ${missed.length} incorrect ${
        incorrect.size
      } total ${total} keyhits: ${hits} accuracy ${(total / hits).toFixed(
        2
      )}% difficultKeys ${Array.from(difficultKeys).toString()}`}</div> */}
      {links && Object.keys(links).length > 0 ? (
        <div className="x-flex-center">
          <button className="btn m-0" onClick={() => navigate(links.prev)}>
            {title.prev}
          </button>
          <button className="btn m-0" onClick={() => navigate(links.next)}>
            {title.next}
          </button>
        </div>
      ) : (
        <div className="x-flex-center">
          <button className="btn m-0" onClick={() => navigate("/course")}>
            Go to course
          </button>
          <button className="btn m-0" onClick={() => navigate(0)}>
            Try again
          </button>
        </div>
      )}
      <div
        className="flex-center horizontal-center m-0"
        style={{ width: "400px" }}
      >
        <GaugeChart
          id="chart-accuracy"
          style={{ fontWeight: "bold" }}
          animate={false}
          colors={["#F20C41", "#F7F863", "#F2540C", "#009600"]}
          textColor="black"
          nrOfLevels={20}
          needleColor="#4D736D"
          percent={Number(accuracy.current)}
        ></GaugeChart>
        <span className="result-subheading"> Accuracy </span>
      </div>
      {difficultKeys.size > 0 && (
        <div className="difficult-keys">
          <span className="result-subheading">Difficult Keys:</span>
          {Array.from(difficultKeys).map(
            (key, k) =>
              key !== " " &&
              k <= 10 && (
                <div key={k} className="key key-shape">
                  {key}
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default TaskComplete;
