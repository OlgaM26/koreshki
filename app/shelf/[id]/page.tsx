"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getLibrary, updateBook } from "@/lib/library";

export default function ShelfPage() {
  const params = useParams();
  const shelfId = Number(params.id);

  const [books, setBooks] = useState<any[]>([]);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  const shelves = [
    { id: 1, name: "Классика" },
    { id: 2, name: "Фэнтези" },
    { id: 3, name: "Фантастика" },
    { id: 4, name: "Детективы" },
    { id: 5, name: "Нон-фикшн" },
    { id: 6, name: "Романы" },
  ];

  const shelf = shelves.find((s) => s.id === shelfId);

  const loadBooks = () => {
    const all = getLibrary();
    const filtered = all.filter((b: any) => b.shelf === shelf?.name);
    setBooks(filtered);
  };

  useEffect(() => {
    loadBooks();
  }, [shelfId]);

  const saveReview = (id: string) => {
    updateBook(id, {
      review: drafts[id] || "",
    });

    setSaved((prev) => ({ ...prev, [id]: true }));

    setTimeout(() => {
      setSaved((prev) => ({ ...prev, [id]: false }));
    }, 1500);

    loadBooks();
  };

  const saveBook = (id: string, data: any) => {
    updateBook(id, data);
    loadBooks();
  };

  if (!shelf) {
    return <div style={{ padding: 40 }}>Шкаф не найден</div>;
  }

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
      {/* назад */}
      <button
        onClick={() => window.history.back()}
        style={{
          background: "transparent",
          border: "none",
          color: "#6D4C41",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        ← назад
      </button>

      <h1 style={{ fontSize: "42px", color: "#3E2723" }}>
        {shelf.name}
      </h1>

      {/* ПОЛКА */}
      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          background: "#4E342E",
          borderRadius: "14px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            alignItems: "flex-end",
            minHeight: "260px",
          }}
        >
          {books.length === 0 && (
            <p style={{ color: "#D7CCC8" }}>
              На этой полке пока пусто 📭
            </p>
          )}

          {books.map((book) => (
            <div
              key={book.id}
              style={{
                width: "160px",
                background: "#fff",
                borderRadius: "10px",
                padding: "10px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
              }}
            >
              {/* обложка */}
              {book.cover && (
                <img
                  src={book.cover}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
              )}

              <h4 style={{ fontSize: "13px", margin: "6px 0" }}>
                {book.title}
              </h4>

              <p style={{ fontSize: "11px", color: "#7A6B5D" }}>
                {book.authors?.join(", ")}
              </p>

              {/* ⭐ рейтинг */}
              <div style={{ fontSize: "14px" }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <span
                    key={s}
                    onClick={() =>
                      saveBook(book.id, { rating: s })
                    }
                    style={{
                      cursor: "pointer",
                      color:
                        s <= (book.rating || 0)
                          ? "#f5a623"
                          : "#ccc",
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* 📌 статус */}
              <select
                value={book.status || "Хочу прочитать"}
                onChange={(e) =>
                  saveBook(book.id, {
                    status: e.target.value,
                  })
                }
                style={{
                  width: "100%",
                  fontSize: "11px",
                  marginTop: "6px",
                }}
              >
                <option>Хочу прочитать</option>
                <option>В процессе</option>
                <option>Прочитана</option>
              </select>

              {/* 📝 отзыв */}
              <textarea
                defaultValue={book.review || ""}
                onChange={(e) =>
                  setDrafts({
                    ...drafts,
                    [book.id]: e.target.value,
                  })
                }
                placeholder="Напиши отзыв..."
                style={{
                  width: "100%",
                  fontSize: "11px",
                  marginTop: "6px",
                  minHeight: "70px",

                  // 💥 КОНТРАСТ
                  background: "#FFFDF8",
                  border: "2px solid #3E2723",
                  borderRadius: "10px",
                  padding: "6px",
                  color: "#2B2B2B",
                  outline: "none",
                }}
              />

              {/* 💾 кнопка сохранения */}
              <button
                onClick={() => saveReview(book.id)}
                style={{
                  marginTop: "6px",
                  width: "100%",
                  fontSize: "11px",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px",
                  cursor: "pointer",

                  background: saved[book.id]
                    ? "#2E7D32"
                    : "#3E2723",
                  color: "#fff",
                  transition: "0.2s",
                }}
              >
                {saved[book.id]
                  ? "Сохранено ✓"
                  : "Сохранить отзыв"}
              </button>
            </div>
          ))}
        </div>

        {/* полка */}
        <div
          style={{
            marginTop: "10px",
            height: "12px",
            background: "#8D6E63",
            borderRadius: "4px",
          }}
        />
      </div>
    </main>
  );
}