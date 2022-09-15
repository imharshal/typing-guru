const lessons = [
  { phrase: "aa ss dd ff jj kk ll ;; as df jk l; asdf asdf jkl; jkl;" },
];

const getLesson = (index) => {
  return lessons[index].phrase;
};

const addLesson = (lesson) => {
  lessons.push(lesson);
};
