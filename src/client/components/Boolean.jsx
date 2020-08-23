import React, {useState} from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { entitiesRegex, specialCharsMap } from '../util/replaceEntities';

function Boolean(props) {
    const { onAnswer } = props;
    const { randomizedQuestion, id } = props.questionData;
    const combinedAnswerList = [randomizedQuestion.correct_answer, ...randomizedQuestion.incorrect_answers].sort((a, b) => {
        if (a > b) {
            return -1;
        }
        if (b > a) {
            return 1;
        }
        return 0;
    });
    const [boolean, setBoolean] = useState(combinedAnswerList[0]);

    const radioList = combinedAnswerList.map((item, i ) => {
        return <FormControlLabel key={i} value={item} control={<Radio />} label={item} />
     });

     const handleSubmit = e => {
        e.preventDefault();        
        const isCorrect = boolean === randomizedQuestion.correct_answer;
        onAnswer(id, isCorrect);
    }

    const handleChange = e => setBoolean(e.target.value);

    return (
        <FormControl component="fieldset">
        <FormLabel className="questionLabel" component="legend">
            {randomizedQuestion.question.replace(entitiesRegex, match => specialCharsMap.get(match))}
        </FormLabel>
        <RadioGroup aria-label="True or False" name="True or False" value={boolean} onChange={handleChange}>
            {radioList}
        </RadioGroup>
        <div className="button-group">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Next
            </Button>
        </div>
      </FormControl>
    )
}

export default Boolean;