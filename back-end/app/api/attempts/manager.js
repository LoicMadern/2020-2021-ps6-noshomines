const { User, Attempt } = require('../../models')
const { buildQuizz } = require('../quizzes/manager')

const buildAttempt = (attemptId) => {
  const attempt = Attempt.getById(attemptId)
  const user = User.getById(attempt.userId)
  const quiz = buildQuizz(attempt.quizId)
  const { usersAnswers } = attempt

  return {
    user, quiz, usersAnswers, attemptId,
  }
}

const buildAttempts = () => {
  const attempts = Attempt.get()
  return attempts.map((attempt) => buildAttempt(attempt.id))
}

module.exports = {
  buildAttempt,
  buildAttempts,
}
