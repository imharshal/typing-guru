const course = [
  {
    title: "Why learn to Type?",
    content: "Something",
    video: "https://videos.typing.com/student/en/1-welcome.webm",
    duration: "1-2 min",
  },
  {
    title: "The Home Row",
    content: "instructions",
    video: "https://videos.typing.com/student/en/2-the_home_row.webm",
    learn: ["ff jj", "fj", "as jk", "df l;", "asdf", "jkl;"],
    practice: ["as", "sa", "d", "af", "j", "k", "lf"],
    duration: "10-15 min",
  },
  {
    title: "Keys E and I",
    content: "",
    learn: ["ei", "de ki", "sef", "jil"],
    practice: ["ie", "i", "e"],
    duration: "10-15 min",
  },
];

export function getCourse() {
  return course;
}
