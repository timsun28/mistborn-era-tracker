export const books = [
  { title: "Final Empire", pages: 672 },
  { title: "Well of Ascension", pages: 800 },
  { title: "Hero of Ages", pages: 768 },
  { title: "Alloy of Law", pages: 336 },
  { title: "Shadows of Self", pages: 320 },
  { title: "Bands of Mourning", pages: 448 },
  { title: "The Lost Metal", pages: 528 }
];

export const totalPages = books.reduce((sum, book) => sum + book.pages, 0);

export const targetDate = new Date('2028-12-05');

export function calculateDaysRemaining(): number {
  const today = new Date();
  const timeDiff = targetDate.getTime() - today.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

export function calculateRemainingPages(progress: number[]): number {
  return totalPages - progress.reduce((sum, pages, index) => sum + Math.min(pages, books[index].pages), 0);
}

export function calculateDailyGoal(remainingPages: number, daysRemaining: number): number {
  return Math.ceil(remainingPages / daysRemaining);
}

