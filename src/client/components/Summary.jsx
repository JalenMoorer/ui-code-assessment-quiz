import React from 'react';
import Button from '@material-ui/core/Button';

function Summary(props) {
    const { correct, incorrect, quizLimit, onRestartQuiz} = props;

    return  (
        <div>
            <h1>Summary</h1>
            <ul className="summaryList">
                <li>Correct: {correct}</li>
                <li>Wrong: {incorrect}</li>
                <li>Questions answered: {quizLimit}</li>
                <li>Final Score: {Math.floor(correct / quizLimit * 100)}%</li>
            </ul>
            <Button variant="contained" color="primary" onClick={onRestartQuiz}>
                Restart Quiz
            </Button>
        </div>
    )
}

export default Summary;