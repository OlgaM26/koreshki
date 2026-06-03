export type LibraryBook = {
  id: string;
  title: string;
  authors: string[];
  cover?: string;
  shelf: string;
  status: string;
  rating: number;
  review: string;
};

const STORAGE_KEY = "library-books";

/* =========================
   📦 получить библиотеку
========================= */
export const getLibrary = (): LibraryBook[] => {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
};

/* =========================
   💾 сохранить
========================= */
export const saveLibrary = (books: LibraryBook[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
};

/* =========================
   ➕ добавить книгу
========================= */
export const addBook = (
  book: Omit<LibraryBook, "status" | "rating" | "review">
) => {
  const library = getLibrary();

  const exists = library.find((b) => b.id === book.id);

  if (exists) {
    return { ok: false, message: "📚 Книга уже есть в библиотеке" };
  }

  const newBook: LibraryBook = {
    ...book,
    status: "Хочу прочитать",
    rating: 0,
    review: "",
  };

  const updated = [...library, newBook];
  saveLibrary(updated);

  return { ok: true, message: "✅ Книга добавлена" };
};

/* =========================
   ✏️ обновить книгу
========================= */
export const updateBook = (id: string, data: Partial<LibraryBook>) => {
  const library = getLibrary();

  const updated = library.map((b) =>
    b.id === id ? { ...b, ...data } : b
  );

  saveLibrary(updated);
  return updated;
};

/* =========================
   🗑 удалить книгу
========================= */
export const deleteBook = (id: string) => {
  const library = getLibrary();

  const updated = library.filter((b) => b.id !== id);

  saveLibrary(updated);

  return updated;
};

/* =========================
   🔁 ПЕРЕНОС КНИГИ В ДРУГОЙ ШКАФ
========================= */
export const moveBook = (id: string, newShelf: string) => {
  const library = getLibrary();

  const updated = library.map((b) =>
    b.id === id ? { ...b, shelf: newShelf } : b
  );

  saveLibrary(updated);

  return updated;
};