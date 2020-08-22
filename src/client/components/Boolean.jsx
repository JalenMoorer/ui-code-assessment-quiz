import React, {useState} from 'react';

const mockData = {
    category: "Science & Nature",
    type: "boolean",
    difficulty: "easy",
    question: "An Astronomical Unit is the distance between Earth and the Moon.",
    correct_answer: "False",
    incorrect_answers: [
    "True"
    ]
}

function stringToBoolean(string) {
    return string === "True" ? true : false;
}

function Multiple(props) {
    const { randomizedQuestion } = props.questionData;
    const [boolean, setBoolean] = useState(true);
    const combinedAnswerList = [randomizedQuestion.correct_answer, ...randomizedQuestion.incorrect_answers].sort((a, b) =>  b - a);
    const radioList = combinedAnswerList.map((item, i ) => {
        const itemToBoolean = stringToBoolean(item);
        console.log(item, i, boolean, itemToBoolean);
        return (
            <div key={i} className="radio">
                <label>
                    <input type="radio" value={item} checked={itemToBoolean === boolean} onChange={() => setBoolean(itemToBoolean)}  />
                    {item}
                </label>
          </div>
        )
     });

     const handleSubmit = e => {
        e.preventDefault();
        console.log(boolean, randomizedQuestion.correct_answer);
        
        const isCorrect = boolean === stringToBoolean(randomizedQuestion.correct_answer);

        props.onAnswer(props.questionData.id, isCorrect);
    }

    return (
        <div>
         <form onSubmit={handleSubmit}>
            <h1>{randomizedQuestion.question}</h1>
            {radioList}
            <input type="submit" value="Next" />
         </form>
        </div>
    ) 
}

export default Multiple;