import React, {useState, useEffect} from 'react';

const mockData = {
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "easy",
    question: "Which game did &quot;Sonic The Hedgehog&quot; make his first appearance in?",
    correct_answer: "Rad Mobile",
    incorrect_answers: [
    "Sonic The Hedgehog",
    "Super Mario 64",
    "Mega Man"
    ]
};

function Multiple(props) {
    const { randomizedQuestion } = props.questionData;
    const defaultField = randomizedQuestion.incorrect_answers[0];
    const [radio, setRadio] = useState(defaultField);

    useEffect(() => {
        setRadio(defaultField);
    }, [randomizedQuestion])

    const combinedAnswerList = [...randomizedQuestion.incorrect_answers, randomizedQuestion.correct_answer];
    const radioList = combinedAnswerList.map((item, i ) => {
    //console.log(item, i);
        return (
            <div key={i} className="radio">
                <label>
                <input type="radio" value={item} checked={radio === item} onChange={() => setRadio(item)}  />
                {item}
                </label>
          </div>
        )
     });

    const handleSubmit = e => {
        console.log(radio);
        
        const isCorrect = radio === randomizedQuestion.correct_answer;

        props.onAnswer(props.questionData.id, isCorrect);
        e.preventDefault();
    }
 
    return (
        <div>
         <form onSubmit={handleSubmit}>
            <h1>{randomizedQuestion.question}</h1>
            {radioList}
            <input type="submit" value="Next"></input>
         </form>
        </div>
    )
}

export default Multiple;