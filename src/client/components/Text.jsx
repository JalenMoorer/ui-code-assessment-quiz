import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { entitiesRegex, specialCharsMap } from '../util/replaceEntities';

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
        <FormControl component="fieldset">
           <FormLabel className="questionLabel" component="legend">{randomizedQuestion.question.replace(entitiesRegex, match => specialCharsMap.get(match))}</FormLabel>
            <TextField id="outlined-basic" label="Outlined" variant="outlined"  onChange={(e) => setText(e.target.value)} value={text} />
            <div className="button-group">
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Next
                </Button>
            </div>
        </FormControl>
    ) 
}

export default Text;