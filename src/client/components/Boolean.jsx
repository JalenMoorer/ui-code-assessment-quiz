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

function Multiple(props) {
    const [boolean, setBoolean] = useState(true);
    const combinedAnswerList = [...mockData.incorrect_answers, mockData.correct_answer];
    const radioList = combinedAnswerList.map((item, i ) => {
        const itemToBoolean = item === "True" ? true : false;
        //console.log(item, i, boolean, itemToBoolean);
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
        console.log(boolean)
    }

    return (
        <div>
         <form onSubmit={handleSubmit}>
            <h1>{mockData.question}</h1>
            {radioList}
            <input type="submit" value="Next" />
         </form>
        </div>
    ) 

//     <form onSubmit={this.handleSubmit}>
//         <label>{mockData.question}</label><br />
//         <input type="text" value={this.state.value} onChange={this.handleChange} />
//    0     <input type="submit" value="Submit" />
//   </form>
}

export default Multiple;