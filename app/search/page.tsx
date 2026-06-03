"use client";

import { useState } from "react";
import { addBook } from "@/lib/library";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedShelf, setSelectedShelf] = useState("Классика");
  const [message, setMessage] = useState("");

  const shelves = [
    "Классика",
    "Фэнтези",
    "Фантастика",
    "Детективы",
    "Нон-фикшн",
    "Романы",
  ];

  const searchBooks = async () => {
    if (!query.trim()) return;

    setLoading(true);

    try {
      const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
        query
      )}`;

      const res = await fetch(url);
      const data = await res.json();

      setBooks(data.docs || []);
    } catch (err) {
      console.error("SEARCH ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = (b: any) => {
    const result = addBook({
      id: String(b.key || b.cover_i || Math.random()),
      title: b.title,
      authors: b.author_name || [],
      cover: b.cover_i
        ? `https://covers.openlibrary.org/b/id/${b.cover_i}-M.jpg`
        : "",
      shelf: selectedShelf,
    });

    setMessage(result.message);

    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#F6F1E8",
        padding: "40px",
        fontFamily: "Georgia, serif",
        color: "#2B2B2B",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Заголовок */}
        <h1 style={{ color: "#3E2723", fontSize: "42px" }}>
          🔎 Поиск книг
        </h1>

        <p style={{ color: "#7A6B5D" }}>
          Open Library API — бесплатный поиск книг
        </p>

        {/* сообщение */}
        {message && (
          <p style={{ marginTop: 10, color: "#3E2723" }}>
            {message}
          </p>
        )}

        {/* выбор шкафа */}
        <div style={{ marginTop: 20 }}>
          <p style={{ fontWeight: "bold", color: "#3E2723" }}>
            Выбери шкаф:
          </p>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {shelves.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedShelf(s)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "10px",
                  border:
                    selectedShelf === s
                      ? "2px solid #3E2723"
                      : "1px solid #ccc",
                  background:
                    selectedShelf === s ? "#3E2723" : "#fff",
                  color:
                    selectedShelf === s ? "#fff" : "#2B2B2B",
                  cursor: "pointer",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Поиск */}
        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Например: Anna Karenina / Dostoevsky / Harry Potter"
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "12px",
              border: "1px solid #ccc",
              fontSize: "16px",
              background: "#fff",
              color: "#2B2B2B",
            }}
          />

          <button
            onClick={searchBooks}
            style={{
              padding: "12px 18px",
              background: "#3E2723",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
            }}
          >
            Найти
          </button>
        </div>

        {/* loading */}
        {loading && (
          <p style={{ marginTop: 20, color: "#7A6B5D" }}>
            Поиск книг...
          </p>
        )}

        {/* РЕЗУЛЬТАТЫ */}
        <div
          style={{
            marginTop: "30px",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {books.map((b, i) => {
            const title = b.title;
            const author =
              b.author_name?.join(", ") || "Автор неизвестен";

            const cover = b.cover_i
              ? `https://covers.openlibrary.org/b/id/${b.cover_i}-M.jpg`
              : null;

            return (
              <div
                key={i}
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  padding: "14px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {/* обложка */}
                {cover && (
                  <img
                    src={cover}
                    alt={title}
                    style={{
                      width: "120px",
                      height: "170px",
                      borderRadius: "10px",
                      objectFit: "cover",
                      margin: "0 auto",
                    }}
                  />
                )}

                {/* название */}
                <h3 style={{ fontSize: "16px", color: "#3E2723" }}>
                  {title}
                </h3>

                {/* автор */}
                <p style={{ fontSize: "13px", color: "#7A6B5D" }}>
                  {author}
                </p>

                {/* кнопка */}
                <button
                  onClick={() => handleAdd(b)}
                  style={{
                    marginTop: "auto",
                    padding: "10px",
                    background: "#6D4C41",
                    color: "#fff",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                >
                  ➕ Добавить в библиотеку
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}