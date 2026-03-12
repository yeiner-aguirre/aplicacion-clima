import "./StatusView.css";

const StatusView = ({ message, title }) => (
  <section className="status-view panel">
    <span className="status-view__spinner" />
    <h2>{title}</h2>
    <p>{message}</p>
  </section>
);

export default StatusView;
