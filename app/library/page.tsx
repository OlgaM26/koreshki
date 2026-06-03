"use client";

import { useEffect, useState } from "react";
import {
  getLibrary,
  deleteBook,
  moveBook,
} from "@/lib/library";

const shelves = [
  "Классика",
  "Фэнтези",
  "Фантастика",
  "Детективы",
  "Нон-фикшн",
  "Романы",
];

export default function LibraryPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [filter, setFilter] = useState("Все");

  useEffect(() => {
    setBooks(getLibrary());
  }, []);

  const handleDelete = (id: string) => {
    const updated = deleteBook(id);
    setBooks(updated);
  };

  const handleMove = (id: string, shelf: string) => {
    const updated = moveBook(id, shelf);
    setBooks(updated);
  };

  const filteredBooks =
    filter === "Все"
      ? books
      : books.filter((b) => b.shelf === filter);

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
          📚 Моя библиотека
        </h1>

        <p style={{ color: "#7A6B5D" }}>
          Все добавленные книги хранятся здесь
        </p>

        {/* ФИЛЬТР */}
        <div style={{ marginTop: 20 }}>
          <p style={{ fontWeight: "bold" }}>Фильтр по шкафу:</p>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              onClick={() => setFilter("Все")}
              style={{
                padding: "8px 12px",
                borderRadius: "10px",
                border: filter === "Все" ? "2px solid #3E2723" : "1px solid #ccc",
                background: filter === "Все" ? "#3E2723" : "#fff",
                color: filter === "Все" ? "#fff" : "#2B2B2B",
              }}
            >
              Все
            </button>

            {shelves.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "10px",
                  border: filter === s ? "2px solid #3E2723" : "1px solid #ccc",
                  background: filter === s ? "#3E2723" : "#fff",
                  color: filter === s ? "#fff" : "#2B2B2B",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* ПУСТО */}
        {filteredBooks.length === 0 && (
          <p style={{ marginTop: 40, color: "#7A6B5D" }}>
            Здесь пока нет книг 📖
          </p>
        )}

        {/* СПИСОК КНИГ */}
        <div
          style={{
            marginTop: 30,
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              style={{
                background: "#fff",
                padding: "14px",
                borderRadius: "16px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {/* обложка */}
              {book.cover && (
                <img
                  src={book.cover}
                  alt={book.title}
                  style={{
                    width: "120px",
                    height: "170px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    margin: "0 auto",
                  }}
                />
              )}

              {/* название */}
              <h3 style={{ fontSize: "16px", color: "#3E2723" }}>
                {book.title}
              </h3>

              {/* шкаф */}
              <p style={{ fontSize: "13px", color: "#7A6B5D" }}>
                📁 {book.shelf}
              </p>

              {/* ПЕРЕНОС */}
              <select
                value={book.shelf}
                onChange={(e) =>
                  handleMove(book.id, e.target.value)
                }
                style={{
                  padding: "8px",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                }}
              >
                {shelves.map((s) => (
                  <option key={s} value={s}>
                    Перенести в: {s}
                  </option>
                ))}
              </select>

              {/* кнопка удалить */}
              <button
                onClick={() => handleDelete(book.id)}
                style={{
                  marginTop: "auto",
                  padding: "10px",
                  background: "#8B3A3A",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                🗑 Удалить
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}