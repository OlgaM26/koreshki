"use client";

import { useParams } from "next/navigation";
import Image from "next/image";

const books = {
  1: {
    title: "Война и мир",
    author: "Лев Толстой",
    cover: "/covers/voina i mir.jpg",
    description:
      "Эпический роман о судьбах дворянских семей на фоне войны 1812 года.",
    review:
      "Один из самых масштабных и глубоких романов о человеке и истории. Медленно, но очень мощно раскрывает персонажей.",
    rating: 5,
    status: "Прочитана",
    year: "2023",
  },

  2: {
    title: "Анна Каренина",
    author: "Лев Толстой",
    cover: "/covers/karenina.jpg",
    description:
      "История любви, семейных конфликтов и трагического выбора.",
    review:
      "Очень сильная психологическая драма. Читается эмоционально тяжело, но красиво.",
    rating: 5,
    status: "Прочитана",
    year: "2023",
  },

  3: {
    title: "Мастер и Маргарита",
    author: "Михаил Булгаков",
    cover: "/covers/master.jpg",
    description:
      "Мистический роман о добре, зле и свободе.",
    review:
      "Атмосферная, странная и гениальная книга, которая раскрывается не сразу.",
    rating: 5,
    status: "Прочитана",
    year: "2024",
  },

  4: {
    title: "Идиот",
    author: "Фёдор Достоевский",
    cover: "/covers/idiot.jpg",
    description:
      "История князя Мышкина — человека абсолютной доброты.",
    review:
      "Очень эмоционально тяжёлый роман о столкновении добра и реальности.",
    rating: 5,
    status: "Прочитана",
    year: "2022",
  },

  5: {
    title: "Братья Карамазовы",
    author: "Фёдор Достоевский",
    cover: "/covers/karamasov.jpg",
    description:
      "Философский роман о вере, свободе и ответственности.",
    review:
      "Глубокий текст о природе человека, морали и выборе.",
    rating: 5,
    status: "Прочитана",
    year: "2024",
  },

  6: {
    title: "Преступление и наказание",
    author: "Фёдор Достоевский",
    cover: "/covers/prestuplenie.jpg",
    description:
      "История Раскольникова и его морального падения.",
    review:
      "Психологически тяжёлый роман о вине и искуплении.",
    rating: 5,
    status: "Прочитана",
    year: "2021",
  },
};

export default function BookPage() {
  const params = useParams();
  const id = Number(params.id);

  const book = books[id as keyof typeof books];

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
        background: "linear-gradient(180deg, #F6F1E8, #E8DDCF)",
        fontFamily: "Georgia, serif",
        padding: "40px",
      }}
    >
      {/* назад */}
      <button
        onClick={() => window.history.back()}
        style={{
          background: "transparent",
          border: "none",
          color: "#6D4C41",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ← назад
      </button>

      {/* книга */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "#FDF6EC",
          borderRadius: "18px",
          boxShadow: "0 30px 80px rgba(0,0,0,0.2)",
          display: "flex",
          overflow: "hidden",
        }}
      >
        {/* обложка (как было — НЕ режется) */}
        <div
          style={{
            width: "260px",
            position: "relative",
            background: "#ddd",
          }}
        >
          <Image
            src={book.cover}
            alt={book.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* текст */}
        <div style={{ padding: "30px", flex: 1 }}>
          <h1
            style={{
              margin: 0,
              fontSize: "32px",
              color: "#3E2723",
            }}
          >
            {book.title}
          </h1>

          <p style={{ color: "#7A6B5D" }}>{book.author}</p>

          {/* статус + год */}
          <div
            style={{
              display: "inline-block",
              marginTop: "8px",
              padding: "6px 10px",
              borderRadius: "8px",
              background: "#EFE3D3",
              fontSize: "12px",
              color: "#3E2723",
            }}
          >
            {book.status} • {book.year}
          </div>

          {/* рейтинг */}
          <div style={{ marginTop: "16px", fontSize: "18px" }}>
            {"⭐".repeat(book.rating)}{" "}
            <span style={{ color: "#7A6B5D", fontSize: "14px" }}>
              ({book.rating}/5)
            </span>
          </div>

          {/* описание */}
          <p
            style={{
              marginTop: "18px",
              lineHeight: "1.6",
              color: "#4E342E",
            }}
          >
            {book.description}
          </p>

          {/* рецензия */}
          <div
            style={{
              marginTop: "20px",
              padding: "14px",
              borderLeft: "4px solid #6D4C41",
              background: "#FAF3E8",
              borderRadius: "8px",
              color: "#4E342E",
            }}
          >
            <strong>Рецензия:</strong>
            <div style={{ marginTop: "6px" }}>
              {book.review}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}