import React, {useState} from 'react';
import {Form} from "react-bootstrap";

const Api = () => {
    const [responseJson, setResponseJson] = useState()

    function handleOption(option) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:5000/api/" + option.target.value);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const responseJson = JSON.parse(xhr.responseText);

                let output = '';
                for(let i=0; i<responseJson.length; i++) {
                    output += JSON.stringify(responseJson[i])
                }
                output = '[' + output + ']';
                setResponseJson(output)
            }
        }
        xhr.send();
    }

    return (
        <div>
            <Form className="m-3">
                <Form.Control
                    as="select"
                    name="table"
                    onChange={handleOption}
                >
                    <option value="books">Книжки</option>
                    <option value="readers">Читачі</option>
                    <option value="issuance">Видача</option>
                </Form.Control>
                {responseJson}
            </Form>
        </div>
    );
};

export default Api;