function FavoritesList({ favorites, onSearch }) {
  if (!favorites || favorites.length === 0) {
    return null;
  }

  return (
    <div className="panel">
      <h2>Favoritos</h2>
      <div className="chip-list">
        {favorites.map((fav) => (
          <button
            key={fav.key}
            type="button"
            className="chip"
            onClick={() => onSearch(fav.name)}
          >
            {fav.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FavoritesList;
