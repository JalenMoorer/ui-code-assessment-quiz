import React, {useState, useEffect} from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { entitiesRegex, specialCharsMap } from '../util/replaceEntities';

function Multiple(props) {
    const { randomizedQuestion } = props.questionData;
    const defaultField = randomizedQuestion.incorrect_answers[0];
    const [radio, setRadio] = useState(defaultField);

    useEffect(() => {
        setRadio(defaultField);
    }, [randomizedQuestion])

    const combinedAnswerList = [...randomizedQuestion.incorrect_answers, randomizedQuestion.correct_answer];
    const radioList = combinedAnswerList.map((item, i ) => {
        return <FormControlLabel key={i} value={item} control={<Radio />} label={item.replace(entitiesRegex, match => specialCharsMap.get(match))} />
     });

    const handleSubmit = e => {
        const isCorrect = radio === randomizedQuestion.correct_answer;

        props.onAnswer(props.questionData.id, isCorrect);
        e.preventDefault();
    }

    const handleChange = e => setRadio(e.target.value);

    return (
        <FormControl component="fieldset">
        <FormLabel className="questionLabel" component="legend">{randomizedQuestion.question.replace(entitiesRegex, match => specialCharsMap.get(match))}</FormLabel>
        <RadioGroup aria-label="Multiple Choice" name="multiple-choice" value={radio} onChange={handleChange}>
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

export default Multiple;