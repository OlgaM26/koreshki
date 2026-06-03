"use client";

import Link from "next/link";

export default function HomePage() {
  const shelves = [
    { id: 1, icon: "📚", name: "Классика" },
    { id: 2, icon: "🐉", name: "Фэнтези" },
    { id: 3, icon: "🚀", name: "Фантастика" },
    { id: 4, icon: "🕵️", name: "Детективы" },
    { id: 5, icon: "🧠", name: "Нон-фикшн" },
    { id: 6, icon: "❤️", name: "Романы" },
  ];

  const bookColors = [
    "#6D4C41",
    "#8B4513",
    "#4A4E69",
    "#3D5A80",
    "#556B2F",
    "#7B2D26",
    "#5C4033",
    "#2F4858",
    "#7F5539",
    "#6B705C",
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
        {/* ШАПКА */}
        <h1
          style={{
            fontSize: "72px",
            color: "#3E2723",
            marginBottom: "10px",
          }}
        >
          Корешки
        </h1>

        <p
          style={{
            color: "#7A6B5D",
            fontSize: "20px",
            marginBottom: "20px",
          }}
        >
          твоя домашняя библиотека
        </p>

        {/* КНОПКИ */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "40px",
            flexWrap: "wrap",
          }}
        >
          <Link href="/search">
            <button style={btn("#3E2723")}>
              ➕ Добавить книгу
            </button>
          </Link>

          <Link href="/find">
            <button style={btn("#5D4037")}>
              🔎 Поиск по шкафам
            </button>
          </Link>

          <Link href="/library">
            <button style={btn("#6D4C41")}>
              📚 Библиотека
            </button>
          </Link>
        </div>

        {/* ШКАФЫ */}
        <h2
          style={{
            color: "#3E2723",
            marginBottom: "24px",
          }}
        >
          Мои шкафы
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "24px",
          }}
        >
          {shelves.map((shelf) => (
            <Link
              key={shelf.id}
              href={`/shelf/${shelf.id}`}
              style={{
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  background: "#6D4C41",
                  borderRadius: "22px",
                  padding: "24px",
                  cursor: "pointer",
                  boxShadow: "0 18px 40px rgba(0,0,0,0.15)",
                  transition: "all 0.2s ease",
                  color: "#fff",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0)";
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: "26px",
                  }}
                >
                  {shelf.icon} {shelf.name}
                </h3>

                {/* КРАСИВЫЕ КОРЕШКИ */}
                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "4px",
                    minHeight: "160px",
                  }}
                >
                  {Array.from({ length: 14 }).map((_, i) => {
                    const height =
                      90 + ((i * 17) % 70);

                    return (
                      <div
                        key={i}
                        style={{
                          width: `${18 + (i % 3)}px`,
                          height: `${height}px`,
                          background:
                            bookColors[
                              i % bookColors.length
                            ],
                          borderRadius: "3px 3px 0 0",
                          position: "relative",
                          boxShadow:
                            "0 5px 10px rgba(0,0,0,0.25)",
                          borderLeft:
                            "2px solid rgba(255,255,255,0.25)",
                          borderRight:
                            "1px solid rgba(0,0,0,0.25)",
                        }}
                      >
                        {/* золотая полоска */}
                        <div
                          style={{
                            position: "absolute",
                            top: "8px",
                            left: "3px",
                            right: "3px",
                            height: "2px",
                            background: "#D4AF37",
                            opacity: 0.8,
                          }}
                        />

                        {/* декоративная полоска */}
                        <div
                          style={{
                            position: "absolute",
                            top: "20px",
                            left: "4px",
                            right: "4px",
                            height: "1px",
                            background:
                              "rgba(255,255,255,0.35)",
                          }}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* ПОЛКА */}
                <div
                  style={{
                    marginTop: "10px",
                    height: "12px",
                    background: "#4E342E",
                    borderRadius: "4px",
                    boxShadow:
                      "0 2px 6px rgba(0,0,0,0.25)",
                  }}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

function btn(color: string) {
  return {
    background: color,
    color: "#fff",
    border: "none",
    borderRadius: "14px",
    padding: "12px 20px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: 500,
    boxShadow: "0 6px 12px rgba(0,0,0,0.12)",
  };
}