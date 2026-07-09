function HistoryList({ history, onSearch }) {
  if (!history || history.length === 0) {
    return null;
  }

  return (
    <div className="panel">
      <h2>Búsquedas recientes</h2>
      <div className="chip-list">
        {history.map((city) => (
          <button
            key={city}
            type="button"
            className="chip secondary"
            onClick={() => onSearch(city)}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}

export default HistoryList;
