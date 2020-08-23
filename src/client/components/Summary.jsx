import React from 'react';
import Button from '@material-ui/core/Button';

function Summary(props) {
    const { correct, incorrect, quizLimit, onRestartQuiz} = props;

    return  (
        <div>
            <h1>Summary</h1>
            <ul className="summaryList">
                <li>Correct: <b>{correct}</b></li>
                <li>Wrong: <b>{incorrect}</b></li>
                <li>Questions answered: <b>{quizLimit}</b></li>
                <li>Final Score: <b>{Math.floor(correct / quizLimit * 100)}%</b></li>
            </ul>
            <Button variant="contained" color="primary" onClick={onRestartQuiz}>
                Restart Quiz
            </Button>
        </div>
    )
}

export default Summary;