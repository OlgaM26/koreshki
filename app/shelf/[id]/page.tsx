"use client";

import { useParams } from "next/navigation";
import Image from "next/image";

export default function ShelfPage() {
  const params = useParams();
  const shelfId = Number(params.id);

  const shelves = {
    1: {
      name: "📚 Классика",
      books: [
        { id: 1, title: "Война и мир" },
        { id: 2, title: "Анна Каренина" },
        { id: 6, title: "Преступление и наказание" },
        { id: 4, title: "Идиот" },
        { id: 5, title: "Братья Карамазовы" },
        { id: 3, title: "Мастер и Маргарита" },
      ],
    },

    2: {
      name: "🐉 Фэнтези",
      books: [
        { id: 101, title: "Гарри Поттер" },
        { id: 102, title: "Властелин колец" },
        { id: 103, title: "Имя ветра" },
        { id: 104, title: "Колесо времени" },
        { id: 105, title: "Ведьмак" },
        { id: 106, title: "Эрагон" },
      ],
    },

    3: {
      name: "🧠 Нон-фикшн",
      books: [
        { id: 201, title: "Sapiens" },
        { id: 202, title: "Думай медленно..." },
        { id: 203, title: "Атомные привычки" },
        { id: 204, title: "Психология влияния" },
        { id: 205, title: "Чёрный лебедь" },
      ],
    },
  };

  const shelf = shelves[shelfId as keyof typeof shelves];

  if (!shelf) {
    return (
      <main style={{ padding: "40px", fontFamily: "Georgia, serif" }}>
        Шкаф не найден
      </main>
    );
  }

  const spines = [
    "/covers/koresh-1.png",
    "/covers/koresh-2.png",
    "/covers/koresh-3.png",
    "/covers/koresh-4.png",
    "/covers/koresh-5.png",
    "/covers/koresh-6.png",
    "/covers/koresh-7.png",
    "/covers/koresh-8.png",
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #F6F1E8, #E8DDCF)",
        padding: "48px",
        fontFamily: "Georgia, serif",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* назад */}
        <button
          onClick={() => (window.location.href = "/")}
          style={{
            marginBottom: "30px",
            background: "transparent",
            border: "none",
            color: "#6D4C41",
            cursor: "pointer",
          }}
        >
          ← Назад к шкафам
        </button>

        {/* заголовок */}
        <h1 style={{ fontSize: "52px", color: "#3E2723" }}>
          {shelf.name}
        </h1>

        <p style={{ color: "#7A6B5D", marginBottom: "40px" }}>
          {shelf.books.length} книг
        </p>

        {/* 🌟 КОМНАТА */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px",
          }}
        >
          {/* 🪵 ШКАФ КАК ОБЪЕКТ */}
          <div
            style={{
              width: "950px",
              background: "#5D4037",
              borderRadius: "18px",
              padding: "26px",
              boxShadow:
                "0 40px 90px rgba(0,0,0,0.35)",
              position: "relative",
            }}
          >
            {/* верхняя рамка */}
            <div
              style={{
                height: "18px",
                background: "#3E2723",
                borderRadius: "8px",
                marginBottom: "18px",
              }}
            />

            {/* внутренняя полка */}
            <div
              style={{
                background: "#6D4C41",
                padding: "26px",
                borderRadius: "12px",
                boxShadow:
                  "inset 0 0 40px rgba(0,0,0,0.35)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  alignItems: "flex-end",
                  minHeight: "260px",
                }}
              >
                {shelf.books.map((book, index) => {
                  const spine =
                    spines[index % spines.length];

                  return (
                    <div
                      key={book.id}
                      onClick={() =>
                        (window.location.href =
                          `/book/${book.id}`)
                      }
                      style={{
                        width: "50px",
                        height: "240px",
                        position: "relative",
                        cursor: "pointer",
                        borderRadius: "4px",
                        overflow: "hidden",
                        boxShadow:
                          "0 10px 20px rgba(0,0,0,0.25)",
                        transition:
                          "transform 0.25s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(-10px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(0)";
                      }}
                    >
                      <Image
                        src={spine}
                        alt={book.title}
                        fill
                        style={{ objectFit: "cover" }}
                      />

                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "6px",
                          color: "white",
                          fontSize: "11px",
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          textShadow:
                            "0 2px 6px rgba(0,0,0,0.6)",
                          pointerEvents: "none",
                        }}
                      >
                        {book.title}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* нижняя полка */}
              <div
                style={{
                  marginTop: "14px",
                  height: "12px",
                  background: "#3E2723",
                  borderRadius: "6px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}