const interviewQuestions = {
  Frontend: [
    "Tell me about yourself.",
    "What is React?",
    "Explain Virtual DOM.",
    "What is useEffect?",
    "Difference between let and const?",
  ],

  Backend: [
    "What is Express?",
    "What is Middleware?",
    "Explain REST API.",
    "Difference between SQL and NoSQL.",
    "What is JWT?",
  ],

  DSA: [
    "Explain Binary Search.",
    "What is a HashMap?",
    "Difference between BFS and DFS.",
    "What is Dynamic Programming?",
    "Explain Time Complexity.",
  ],
};

const validRoles = [
    "Frontend",
    "Backend",
    "DSA"
];

export const generateInterview = async (data) => {
  const { role } = data;
  if (!role) {
        throw new Error("Role is required.");
  }

  if (!validRoles.includes(role)) {
        throw new Error("Invalid role.");
}   

  const questions = interviewQuestions[role] || [];

  return {
    success: true,
    role,
    questions,
  };
};
