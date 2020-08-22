import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

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
           <FormLabel component="legend">{randomizedQuestion.question}</FormLabel>
            <TextField id="outlined-basic" label="Outlined" variant="outlined"  onChange={(e) => setText(e.target.value)} value={text} />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Next
            </Button>
        </FormControl>
    ) 
}

export default Text;