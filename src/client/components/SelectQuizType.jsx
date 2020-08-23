import React, {useState} from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

function SelectQuizType(props) {
    const [select, onSelect] = useState("easy");

    const handleSubmit = e => {
        e.preventDefault();
        props.startQuiz(select);
    }

    return (
        <div className="form-container">
            <FormControl>
                <InputLabel className="questionLabel" id="demo-simple-select-helper-label">Age</InputLabel>
                <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={select}
                onChange={e => onSelect(e.target.value)}
                >
                <MenuItem value={"easy"}>Easy</MenuItem>
                <MenuItem value={"medium"}>Medium</MenuItem>
                <MenuItem value={"hard"}>Hard</MenuItem>
                </Select>
                <FormHelperText>Please select a difficulty and then begin the quiz</FormHelperText>
                <div className="button-group">
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        begin
                    </Button>
                </div>
            </FormControl>
        </div>
    )
}

export default SelectQuizType;