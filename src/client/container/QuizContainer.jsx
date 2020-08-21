import React, { Component } from 'react';
import { getQuestions } from './api';
import Multiple from '../components/Multiple';
import Boolean from '../components/Boolean';
import Text from '../components/Text';

function Loading() {
    return <div>Loading...</div>
}

class QuizContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            data: [],
            correct: 0,
            incorrect: 0
        }
    }

    async componentDidMount() {
        console.log('Before Fetching Data');
        const data = await getQuestions();
        console.log('Dont render until api loads');
        console.log(data);
        this.setState({ data: data.results, loading: false })
    }

    handleAnswer(answer) {
        console.log(answer);
    }

    render() {
        if (this.state.loading) {
            return <Loading />
        }

        return <div>
            <Multiple onAnswer={this.handleAnswer} />
            <Boolean onAnswer={this.handleAnswer} />
            <Text onAnswer={this.handleAnswer} />
        </div>
        
    }
}

export default QuizContainer;