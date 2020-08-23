import React, { Component } from 'react';
import { fetchQuestions } from '../util/api';
import Loading from '../components/Loading';
import SelectQuizType from '../components/SelectQuizType';
import Summary from '../components/Summary';
import Multiple from '../components/Multiple';
import Boolean from '../components/Boolean';
import Text from '../components/Text';

import '../index.css';

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
        const data = await fetchQuestions();
        this.setState({ data: data.results, loading: false })
    }

    handleAnswer(id, isCorrect) {
        const { quizLimit, correct, incorrect, currentQuestionList } = this.state;
        const counterKey = isCorrect ? 'correct' : 'incorrect';
        if (correct + incorrect === quizLimit)
            this.setState({ quizStart: false, showSummary: true});
        else
            this.setState({ 
                currentQuestionList: [...currentQuestionList.slice(0,id), ...currentQuestionList.slice(id+1)], 
                [counterKey]: this.state[counterKey] + 1
            });
    }

    handeRestartQuiz() {
        this.setState({ showSummary: false, correct: 0, incorrect: 0 })
    }

    getQuestions() {
        const { currentQuestionList } = this.state;
        const id = Math.floor(Math.random() * currentQuestionList.length);

        const randomizedQuestion = currentQuestionList[id];
        const type = currentQuestionList[id].type;

        return { id, type, randomizedQuestion}
    }

    startQuiz(difficulty) {
        const { data } = this.state;
        const filteredQuestions = data.filter(question => question.difficulty === difficulty);
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
            default:
                return;
        }
    }

    render() {
        if (this.state.loading) {
            return <Loading />
        }

        if (!this.state.quizStart) {
            return this.state.showSummary 
            ? (
                <Summary 
                    onRestartQuiz={this.handeRestartQuiz} 
                    correct={this.state.correct} 
                    incorrect={this.state.incorrect} 
                    quizLimit={this.state.quizLimit} 
                /> 
            )
            : <SelectQuizType startQuiz={this.startQuiz} />
        }
        const questionData = this.getQuestions();
        return <div className="form-container">{this.getQuestionComponent(questionData)}</div>  
    }
}

export default QuizContainer;