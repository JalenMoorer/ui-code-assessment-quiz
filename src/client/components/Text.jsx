import React, {useState} from 'react';

const mockData = {
    category: "Animals",
    type: "text",
    difficulty: "medium",
    question: "What color/colour is a polar bear&#039;s skin?",
    correct_answer: "Black"
}

function Text(props) {
    const { randomizedQuestion } = props.questionData;
    const [text, setText] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        console.log(text);
        
        const isCorrect = text.toLowerCase() === randomizedQuestion.correct_answer;

        props.onAnswer(props.questionData.id, isCorrect);
    }

    return (
        <div>
         <form onSubmit={handleSubmit}>
            <h1>{randomizedQuestion.question}</h1>
            <input type="text" onChange={(e) => setText(e.target.value)} value={text} />
            <input type="submit" value="Next" />
         </form>
        </div>
    ) 
}

export default Text;