
// Define correct answers
const correctAnswers = {
    q1: "paris",
    q2: "mars",
    q3: "oxygen",
    q4: "australia",
    q5: "william_shakespeare",
    q6: "blue_whale",
    q7: "photoshop",
    q8: "tokyo",
    q9: "leonardo_da_vinci",
    q10: "nebulus"
};

// Function to submit the quiz
function submitQuiz() {
    const totalQuestions = 10;
    
    // Check if all questions are answered
    let unansweredQuestions = [];
    
    for (let i = 1; i <= totalQuestions; i++) {
        const options = document.getElementsByName(`q${i}`);
        let answered = false;
        
        for (const option of options) {
            if (option.checked) {
                answered = true;
                break;
            }
        }
        
        if (!answered) {
            unansweredQuestions.push(i);
        }
    }
    
    // Alert if there are unanswered questions
    if (unansweredQuestions.length > 0) {
        alert(`Please answer all questions. You haven't answered question(s): ${unansweredQuestions.join(', ')}`);
        return;
    }
    
    // Calculate score
    let score = 0;
    let userAnswers = {};
    
    for (let i = 1; i <= totalQuestions; i++) {
        const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
        if (selectedOption) {
            userAnswers[`q${i}`] = selectedOption.value;
            if (selectedOption.value === correctAnswers[`q${i}`]) {
                score++;
            }
        }
    }
    
    // Store results in localStorage
    localStorage.setItem('quizScore', score);
    localStorage.setItem('totalQuestions', totalQuestions);
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
    localStorage.setItem('correctAnswers', JSON.stringify(correctAnswers));
    
    // Navigate to results page
    window.location.href = "result.html";}
