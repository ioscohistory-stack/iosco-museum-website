export const quizQuestions = [
  {
    id: "museum-house", topic: "The museum",
    question: "In what year was the house that now holds the Iosco County Historical Museum built?",
    options: ["1853", "1903", "1932", "1967"], correct: 1,
    explanation: "The house was built in 1903 for Harry Waterman and his wife. It later became the McKay family home before becoming the county museum.",
    source: { title: "The museum’s story", url: "/about-us" },
  },
  {
    id: "alabaster", topic: "Working lives",
    question: "Which mineral helped build Alabaster’s mining industry?",
    options: ["Copper", "Iron ore", "Coal", "Gypsum"], correct: 3,
    explanation: "Gypsum deposits along Lake Huron helped shape Alabaster’s quarries and company town. The mineral was used to make plaster.",
    source: { title: "Alabaster Township history", url: "/alabaster-township" },
  },
  {
    id: "tawas-point", topic: "Along the shore",
    question: "Why had the first Tawas Point lighthouse become less useful by the 1870s?",
    options: ["The point grew, leaving the lighthouse farther inland", "The tower was moved to Detroit", "Shipping on Tawas Bay had ended", "A railroad blocked its light"], correct: 0,
    explanation: "Sand built up and extended Tawas Point. By the 1870s, the first lighthouse stood more than a mile inland. A new lighthouse was built in 1876 to better guide ships.",
    source: { title: "Michigan History Center: Tawas Point Lighthouse", url: "https://www.michigan.gov/mhc/museums/tawas/about" },
  },
  {
    id: "wanigan", topic: "The lumber era",
    question: "At Lumberman’s Monument, a “wanigan” recalls what part of a logger’s working life?",
    options: ["A horse-drawn log sled", "A tool for measuring trees", "A floating kitchen", "A railroad signal tower"], correct: 2,
    explanation: "A wanigan was a floating kitchen used by loggers. The example at Lumberman’s Monument helps tell the story of life and work along the Au Sable River.",
    source: { title: "US Forest Service: Huron Adventure Planner, page 8 (PDF)", url: "https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/stelprd3807291.pdf?pdf=Huron-Adventure-Planner" },
  },
  {
    id: "society", topic: "Keeping our history",
    question: "When was the Iosco County Historical Society founded?",
    options: ["1903", "1967", "1977", "2003"], correct: 1,
    explanation: "The Society was founded on December 10, 1967, with representatives from across the county. Establishing a county historical museum was one of its first goals.",
    source: { title: "About the Historical Society", url: "/about-us" },
  },
  {
    id: "hale-store", topic: "Hale",
    question: "N. F. Dean helped establish Hale in 1889 by building what?",
    options: ["A lighthouse", "An airport", "A store", "A courthouse"], correct: 2,
    explanation: "Plainfield Township’s history dates Hale’s beginnings to the construction of N. F. Dean’s store in 1889. Farming and lumbering drew early settlers to the area.",
    source: { title: "Plainfield Township Master Plan: history, page 3 (PDF)", url: "https://plainfieldtwpmi.com/wp-content/uploads/MP-final-11.30.23-compressed.pdf" },
  },
  {
    id: "white-pine", topic: "River journeys",
    question: "The Au Sable River’s lumber boom is especially associated with which tree?",
    options: ["White pine", "Sugar maple", "American beech", "Black cherry"], correct: 0,
    explanation: "The Au Sable River served as a transportation route for Michigan’s giant white pine logs. The river carried them toward the sawmills on Lake Huron.",
    source: { title: "US Forest Service: Huron Adventure Planner, page 8 (PDF)", url: "https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/stelprd3807291.pdf?pdf=Huron-Adventure-Planner" },
  },
  {
    id: "wurtsmith", topic: "Oscoda",
    question: "In which year did Wurtsmith Air Force Base in Oscoda officially close?",
    options: ["1945", "1967", "1981", "1993"], correct: 3,
    explanation: "Wurtsmith officially closed on June 30, 1993. Established in 1923, the base was part of Oscoda’s history for 70 years.",
    source: { title: "State of Michigan: former Wurtsmith Air Force Base", url: "https://www.michigan.gov/pfasresponse/investigations/sites-aoi/iosco-county/wurtsmith" },
  },
  {
    id: "whittemore-roll-inn", topic: "Whittemore",
    question: "The Whittemore building later known as the Roll-Inn began in 1907 as what?",
    options: ["A railroad station", "A livery barn and community hall", "A schoolhouse", "A grain elevator"], correct: 1,
    explanation: "Schroyer and Wismer’s livery barn and community hall became the Roll-Inn. It later hosted roller skating, dances, basketball, and other community activities before a fire destroyed it in 1963.",
    source: { title: "The museum’s Whittemore history", url: "/city-of-whittemore" },
  },
  {
    id: "museum-gift", topic: "A home for history",
    question: "In 1977, who purchased the house and donated it to the Historical Society for use as a museum?",
    options: ["Iosco County", "The US Forest Service", "The US Coast Guard", "The State of Wisconsin"], correct: 0,
    explanation: "Iosco County purchased the house from Ladd McKay in 1977 and donated it to the Society. Help from the Tawas Area Kiwanis supported a grant to purchase the property.",
    source: { title: "The museum’s story", url: "/about-us" },
  },
] as const;

export type QuizState = { index: number; selected: number | null; answers: number[]; revealed: boolean; finished: boolean };
export type QuizAction = { type: "select"; option: number } | { type: "answer" | "next" | "restart" };
export const initialQuizState: QuizState = { index: 0, selected: null, answers: [], revealed: false, finished: false };

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  if (action.type === "restart") return { ...initialQuizState, answers: [] };
  if (state.finished) return state;
  if (action.type === "select") {
    if (state.revealed || !Number.isInteger(action.option) || action.option < 0 || action.option >= quizQuestions[state.index].options.length) return state;
    return { ...state, selected: action.option };
  }
  if (action.type === "answer") {
    if (state.revealed || state.selected === null) return state;
    return { ...state, revealed: true, answers: [...state.answers, state.selected] };
  }
  if (action.type === "next" && state.revealed) {
    return state.index === quizQuestions.length - 1
      ? { ...state, finished: true }
      : { ...state, index: state.index + 1, selected: null, revealed: false };
  }
  return state;
}

export function quizScore(answers: number[]) {
  return answers.reduce((score, answer, index) => score + Number(quizQuestions[index]?.correct === answer), 0);
}
