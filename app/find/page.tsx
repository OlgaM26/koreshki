"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getLibrary } from "@/lib/library";

export default function FindPage() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    setBooks(getLibrary());
  }, []);

  const filteredBooks = books.filter((book) => {
    const search = query.toLowerCase();

    return (
      book.title?.toLowerCase().includes(search) ||
      book.authors?.join(", ").toLowerCase().includes(search)
    );
  });

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#F6F1E8",
        padding: "40px",
        fontFamily: "Georgia, serif",
      }}
    >
      <Link href="/">
        <button
          style={{
            marginBottom: "20px",
            padding: "10px 16px",
            borderRadius: "10px",
            border: "none",
            background: "#6D4C41",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          ← На главную
        </button>
      </Link>

      <h1 style={{ color: "#3E2723" }}>
        🔎 Поиск по шкафам
      </h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Название книги или автор"
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "20px",
          borderRadius: "12px",
          border: "2px solid #8D6E63",
          background: "#fff",
          color: "#2B2B2B",
          fontSize: "16px",
        }}
      />

      <div
        style={{
          marginTop: "30px",
          display: "grid",
          gap: "16px",
        }}
      >
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            style={{
              background: "#fff",
              borderRadius: "14px",
              padding: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <h3
              style={{
                margin: 0,
                color: "#3E2723",
              }}
            >
              {book.title}
            </h3>

            <p
              style={{
                color: "#6D4C41",
                marginTop: "6px",
              }}
            >
              {book.authors?.join(", ")}
            </p>

            <p
              style={{
                color: "#7A6B5D",
                fontSize: "14px",
              }}
            >
              Шкаф: {book.shelf}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}