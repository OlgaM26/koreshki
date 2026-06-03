"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const books = {
  1: {
    title: "Война и мир",
    author: "Лев Толстой",
    cover: "/covers/voina i mir.jpg",
    description: "Эпический роман о войне 1812 года и судьбах людей.",
    rating: 5,
    status: "Прочитана",
  },

  2: {
    title: "Анна Каренина",
    author: "Лев Толстой",
    cover: "/covers/karenina.jpg",
    description: "Трагическая история любви и общества.",
    rating: 5,
    status: "Прочитана",
  },

  3: {
    title: "Мастер и Маргарита",
    author: "Михаил Булгаков",
    cover: "/covers/master.jpg",
    description: "Мистический роман о добре и зле.",
    rating: 5,
    status: "Прочитана",
  },

  4: {
    title: "Идиот",
    author: "Фёдор Достоевский",
    cover: "/covers/idiot.jpg",
    description: "История князя Мышкина — человека доброты.",
    rating: 5,
    status: "Прочитана",
  },

  5: {
    title: "Братья Карамазовы",
    author: "Фёдор Достоевский",
    cover: "/covers/karamasov.jpg",
    description: "Философский роман о вере и морали.",
    rating: 5,
    status: "Прочитана",
  },

  6: {
    title: "Преступление и наказание",
    author: "Фёдор Достоевский",
    cover: "/covers/prestuplenie.jpg",
    description: "История Раскольникова и его наказания.",
    rating: 5,
    status: "Прочитана",
  },
};

const statusList = ["Прочитана", "В процессе", "Хочу прочитать"];

export default function BookPage() {
  const params = useParams();
  const id = Number(params.id);

  const book = books[id as keyof typeof books];

  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState("В процессе");
  const [review, setReview] = useState("");
  const [saved, setSaved] = useState(false);

  // 📥 загрузка данных
  useEffect(() => {
    if (!id) return;

    const savedReview = localStorage.getItem(`book-${id}-review`);
    const savedRating = localStorage.getItem(`book-${id}-rating`);
    const savedStatus = localStorage.getItem(`book-${id}-status`);

    if (savedReview) setReview(savedReview);
    if (savedRating) setRating(Number(savedRating));
    if (savedStatus) setStatus(savedStatus);
  }, [id]);

  // 💾 сохранение
  const handleSave = () => {
    localStorage.setItem(`book-${id}-review`, review);
    localStorage.setItem(`book-${id}-rating`, String(rating));
    localStorage.setItem(`book-${id}-status`, status);

    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  if (!book) {
    return (
      <main style={{ padding: "40px", fontFamily: "Georgia, serif" }}>
        Книга не найдена
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#F6F1E8",
        color: "#2B2B2B",
        padding: "40px",
        fontFamily: "Georgia, serif",
        lineHeight: 1.6,
      }}
    >
      {/* назад */}
      <button
        onClick={() => window.history.back()}
        style={{
          marginBottom: "20px",
          background: "transparent",
          border: "none",
          color: "#6D4C41",
          cursor: "pointer",
        }}
      >
        ← назад
      </button>

      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
        {/* обложка */}
        <div
          style={{
            width: "160px",
            height: "240px",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            background: "#fff",
          }}
        >
          <Image
            src={book.cover}
            alt={book.title}
            width={160}
            height={240}
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* инфо */}
        <div
          style={{
            maxWidth: "600px",
            padding: "20px",
            background: "rgba(255,255,255,0.85)",
            borderRadius: "12px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <h1 style={{ fontSize: "36px", color: "#3E2723" }}>
            {book.title}
          </h1>

          <p style={{ color: "#6D4C41" }}>{book.author}</p>

          <p style={{ marginTop: "10px" }}>
            {book.description}
          </p>

          {/* ⭐ рейтинг */}
          <div style={{ marginTop: "20px" }}>
            <p>Рейтинг:</p>

            <div style={{ display: "flex", gap: "6px" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  style={{
                    fontSize: "24px",
                    cursor: "pointer",
                    color: star <= rating ? "#f5a623" : "#ccc",
                  }}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* 📌 статус */}
          <div style={{ marginTop: "20px" }}>
            <p>Статус:</p>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {statusList.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "10px",
                    border:
                      status === s
                        ? "2px solid #3E2723"
                        : "1px solid #ccc",
                    background: status === s ? "#3E2723" : "white",
                    color: status === s ? "white" : "#333",
                    cursor: "pointer",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* 📝 отзыв */}
          <div style={{ marginTop: "20px" }}>
            <p>Мой отзыв:</p>

            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Напиши своё мнение о книге..."
              style={{
                width: "100%",
                minHeight: "120px",
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                fontFamily: "Georgia, serif",
                resize: "vertical",
              }}
            />

            <button
              onClick={handleSave}
              style={{
                marginTop: "10px",
                background: "#3E2723",
                color: "white",
                padding: "10px 14px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Сохранить
            </button>

            {saved && (
              <p style={{ color: "green", marginTop: "8px" }}>
                ✔ Сохранено
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}