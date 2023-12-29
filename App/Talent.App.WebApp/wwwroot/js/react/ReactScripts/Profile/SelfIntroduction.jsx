/* Self introduction section */
import React, { Component } from "react";
import Cookies from "js-cookie";
import { SingleInput } from "../Form/SingleInput.jsx";
import { Form, TextArea } from "semantic-ui-react";

export default class SelfIntroduction extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            summary: "",
            description: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.saveDescription = this.saveDescription.bind(this);
    }

    componentDidMount() {}

    componentWillReceiveProps(props) {
        if (props.summary !== "") {
            this.setState({ summary: props.summary });
        }
        if (props.description !== "") {
            this.setState({ description: props.description });
        }
    }

    handleChange(event) {
        let data = Object.assign({}, this.state);
        data[event.target.name] = event.target.value;
        this.setState(data);
    }

    saveDescription() {
        const data = Object.assign({}, { summary: this.state.summary, description: this.state.description });
        this.props.updateProfileData(data);
    }

    render() {
        return (
            <div className="ui sixteen wide column">
                <SingleInput
                    inputType="text"
                    name="summary"
                    content={this.state.summary}
                    controlFunc={this.handleChange}
                    placeholder="Please provide a short summary about yourself"
                    isError={false}
                    errorMessage="Summary must be no more than 150 characters."
                />
                <p>Summary must be no more than 150 characters.</p>

                <Form>
                    <TextArea
                        name="description"
                        placeholder="Please tell us about any hobbies, additional expertise, or anything else you'd like to add."
                        rows={5}
                        onChange={this.handleChange}
                        value={this.state.description}
                    />
                </Form>
                <p>Description must be between 150-600 characters.</p>
                <button type="button" className="ui right floated teal button" onClick={this.saveDescription}>
                    Save
                </button>
            </div>
        );
    }
}
