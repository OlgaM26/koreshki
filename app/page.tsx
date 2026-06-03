"use client";

export default function HomePage() {
  const shelves = [
    {
      id: 1,
      icon: "📚",
      name: "Классика",
      books: 42,
    },
    {
      id: 2,
      icon: "🐉",
      name: "Фэнтези",
      books: 31,
    },
    {
      id: 3,
      icon: "🚀",
      name: "Фантастика",
      books: 24,
    },
    {
      id: 4,
      icon: "🕵️",
      name: "Детективы",
      books: 17,
    },
    {
      id: 5,
      icon: "🧠",
      name: "Нон-фикшн",
      books: 18,
    },
    {
      id: 6,
      icon: "❤️",
      name: "Романы",
      books: 22,
    },
  ];

  const bookColors = [
    "#8B5A2B",
    "#5D4037",
    "#3E5C76",
    "#6B705C",
    "#7F5539",
    "#6D4C41",
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#F6F1E8",
        padding: "48px",
        fontFamily: "Georgia, serif",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        {/* Шапка */}
        <div
          style={{
            marginBottom: "48px",
          }}
        >
          <h1
            style={{
              fontSize: "72px",
              color: "#3E2723",
              margin: 0,
              lineHeight: 1,
            }}
          >
            Корешки
          </h1>

          <p
            style={{
              fontSize: "22px",
              color: "#7A6B5D",
              marginTop: "14px",
            }}
          >
            твоя домашняя библиотека
          </p>
        </div>

        {/* Статистика */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            marginBottom: "56px",
          }}
        >
          {[
            ["154", "книги"],
            ["67", "прочитано"],
            ["14", "в процессе"],
          ].map(([value, label]) => (
            <div
              key={label}
              style={{
                background: "#FFFFFF",
                padding: "24px",
                borderRadius: "18px",
                minWidth: "180px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  fontSize: "34px",
                  fontWeight: "bold",
                  color: "#3E2723",
                }}
              >
                {value}
              </div>

              <div
                style={{
                  marginTop: "6px",
                  color: "#7A6B5D",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Заголовок */}
        <h2
          style={{
            color: "#3E2723",
            fontSize: "32px",
            marginBottom: "24px",
          }}
        >
          Мои шкафы
        </h2>

        {/* Сетка шкафов */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "24px",
          }}
        >
          {shelves.map((shelf) => (
            <div
              key={shelf.id}
              onClick={() => {
                window.location.href = `/shelf/${shelf.id}`;
              }}
              style={{
                background: "#6D4C41",
                borderRadius: "22px",
                padding: "24px",
                cursor: "pointer",
                boxShadow: "0 18px 40px rgba(0,0,0,0.15)",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Название */}
              <h3
                style={{
                  color: "#F6F1E8",
                  margin: 0,
                  fontSize: "26px",
                }}
              >
                {shelf.icon} {shelf.name}
              </h3>

              <p
                style={{
                  color: "#D7CCC8",
                  marginTop: "10px",
                  marginBottom: "20px",
                }}
              >
                {shelf.books} книг
              </p>

              {/* Мини-шкаф */}
              <div
                style={{
                  background: "#4E342E",
                  borderRadius: "12px",
                  padding: "16px",
                  border: "2px solid rgba(255,255,255,0.08)",
                }}
              >
                {/* Полка */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "5px",
                    minHeight: "130px",
                  }}
                >
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: "18px",
                        height: `${90 + (i % 4) * 18}px`,
                        backgroundColor:
                          bookColors[i % bookColors.length],
                        borderRadius: "3px 3px 0 0",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
                      }}
                    />
                  ))}
                </div>

                {/* Деревянная полка */}
                <div
                  style={{
                    marginTop: "8px",
                    height: "10px",
                    background: "#8D6E63",
                    borderRadius: "3px",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Кнопка */}
        <div
          style={{
            marginTop: "48px",
          }}
        >
          <button
            style={{
              background: "#3E2723",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "14px",
              padding: "16px 28px",
              fontSize: "16px",
              cursor: "pointer",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            }}
          >
            + Добавить книгу
          </button>
        </div>
      </div>
    </main>
  );
}