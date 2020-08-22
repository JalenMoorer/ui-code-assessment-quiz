import React, { Component, useState } from 'react';
import { fetchQuestions } from './api';
import Multiple from '../components/Multiple';
import Boolean from '../components/Boolean';
import Text from '../components/Text';

function Loading() {
    return <div>Loading...</div>
}

function SelectQuizType(props) {
    const [select, onSelect] = useState("easy");

    const handleSubmit = e => {
        e.preventDefault();
        console.log(select);
        props.startQuiz(select);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="select">
                        <label>
                            <select value={select} onChange={(e) => onSelect(e.target.value) }>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </label>
                </div>
                <div className="submit">
                    <input type="submit" value="Begin" />
                </div>
            </form>
        </div>
    )
}

function Summary(props) {

    function onSubmit() {
        props.onRestartQuiz();
    }

    return  (
        <div>
            <h1>Summary</h1>
            <ul>
                <li>Correct: {props.correct}</li>
                <li>Wrong: {props.incorrect}</li>
                <li>Questions answered: {props.quizLimit}</li>
                <li>Final Score: {Math.floor(props.correct / props.quizLimit * 100)}%</li>
            </ul>
            <button type="button" onClick={onSubmit}>Restart Quiz</button>
        </div>
    )
}

class QuizContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true, 
            data: [],
            correct: 0,
            incorrect: 0,
            quizStart: false,
            showSummary: false,
            currentQuestionList: [],
            quizLimit: 0,
        }
        this.handleAnswer = this.handleAnswer.bind(this);
        this.handeRestartQuiz = this.handeRestartQuiz.bind(this);
        this.startQuiz = this.startQuiz.bind(this);
    }

    async componentDidMount() {
        console.log('Before Fetching Data');
        const data = await fetchQuestions();
        console.log('Dont render until api loads');
        console.log(data);
        this.setState({ data: data.results, loading: false })
    }

    handleAnswer(id, isCorrect) {
        const { quizLimit, correct, incorrect, currentQuestionList } = this.state;
        console.log(id, isCorrect);
        
        const counterKey = isCorrect ? 'correct' : 'incorrect';
        console.log('State',this.state.currentQuestionList[id]);
        if (correct + incorrect === quizLimit) {
            console.log('Quiz over');
            this.setState({ quizStart: false, showSummary: true});
        }
        else {
            this.setState({ currentQuestionList: [...currentQuestionList.slice(0,id), ...currentQuestionList.slice(id+1)], [counterKey]: this.state[counterKey] + 1});
        }
    }

    handeRestartQuiz() {
        this.setState({ showSummary: false, correct: 0, incorrect: 0 })
    }

    getQuestions() {
        const { currentQuestionList } = this.state;
        const id = Math.floor(Math.random() * currentQuestionList.length);

        const randomizedQuestion = currentQuestionList[id];
        const type = currentQuestionList[id].type;

        console.log(randomizedQuestion);

        return { id, type, randomizedQuestion}
    }

    startQuiz(difficulty) {
        const { data } = this.state;
        console.log(data);
        const filteredQuestions = data.filter(question => question.difficulty === difficulty);
        console.log(filteredQuestions);

        const currentQuestionList = filteredQuestions;

        this.setState({ currentQuestionList, quizStart: true, quizLimit: currentQuestionList.length - 1 });
    }

    getQuestionComponent(questionData) {
        switch (questionData.type) {
            case 'multiple':
                return <Multiple questionData={questionData} onAnswer={this.handleAnswer} />
            case 'boolean':
                return <Boolean questionData={questionData} onAnswer={this.handleAnswer} />
            case 'text':
                return <Text questionData={questionData} onAnswer={this.handleAnswer} />
        }
    }

    render() {
        if (this.state.loading) {
            return <Loading />
        }

        if (!this.state.quizStart) {
            return this.state.showSummary 
            ? <Summary onRestartQuiz={this.handeRestartQuiz} correct={this.state.correct} incorrect={this.state.incorrect} quizLimit={this.state.quizLimit} /> 
            : <SelectQuizType startQuiz={this.startQuiz} />
        }

        const questionData = this.getQuestions();
        return <div>{this.getQuestionComponent(questionData)}</div>
        
    }
}

export default QuizContainer;