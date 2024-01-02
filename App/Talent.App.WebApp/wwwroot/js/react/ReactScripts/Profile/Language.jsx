/* Language section */
import React from "react";
import { SingleInput } from "../Form/SingleInput.jsx";
import { Select } from "../Form/Select.jsx";
import Cookies from "js-cookie";
import { TableRow, TableHeaderCell, TableHeader, TableCell, TableBody, Header, Table, Rating } from "semantic-ui-react";

export default class Language extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showNewSection: false,
            showEditSection: false,
            languageData: [], // name, level, id, currentUserId
            newLanguage: "",
            newLevel: "",
            selectedLanguage: "",
            selectedLevel: "",
        };

        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addLanguage = this.addLanguage.bind(this);
    }

    componentWillReceiveProps(props) {
        if (props.languageData && props.languageData.length > 0) this.setState({ languageData: props.languageData });
    }

    openNew() {
        this.setState({
            showNewSection: true,
        });
    }

    closeNew() {
        this.setState({
            showNewSection: false,
        });
    }

    openEdit() {
        this.setState({
            showEditSection: true,
        });
    }

    closeEdit() {
        this.setState({
            showEditSection: false,
        });
    }

    handleChange(event) {
        const data = Object.assign({}, this.state);
        data[event.target.name] = event.target.value;
        this.setState(data);
    }

    addLanguage() {
        console.log("you are going to add a language");
        if (this.state.newLanguage === "" || this.state.newLevel === "") {
            console.log("Something is empty");
            return;
        }
        // let newLanguageData = [...this.languageData];
        let newLanguageData = [];
        for (let i = 0; i < this.state.languageData.length; i++) {
            newLanguageData[i] = this.state.languageData[i];
        }
        newLanguageData.push({ name: this.state.newLanguage, level: this.state.newLevel });
        this.setState({ languageData: newLanguageData });
    }

    render() {
        let levelOptions = [
            { value: "Basic", title: "Basic" },
            { value: "Conversational", title: "Conversational" },
            { value: "Fluent", title: "Fluent" },
            { value: "Native/Bilingual", title: "Native/Bilingual" },
        ];
        return (
            <div className="ui sixteen wide column">
                <div className="row">
                    <SingleInput
                        inputType="text"
                        name="newLanguage"
                        content={this.state.newLanguage}
                        controlFunc={this.handleChange}
                        placeholder="Add Language"
                        isError={false}
                        errorMessage="Please enter a valid language"
                    />
                    <Select name="newLevel" selectedOption={this.state.newLevel} placeholder="Language Level" options={levelOptions} controlFunc={this.handleChange} />
                    <button type="button" className="ui teal button" onClick={this.addLanguage}>
                        Add
                    </button>
                    <button type="button" className="ui button" onClick={this.closeEdit}>
                        Cancel
                    </button>
                </div>
                <Table celled padded>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>Language</TableHeaderCell>
                            <TableHeaderCell>Level</TableHeaderCell>
                            <TableHeaderCell>Actions</TableHeaderCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {this.state.languageData.map((l) => (
                            <TableRow>
                                <TableCell>{l.name}</TableCell>
                                <TableCell>{l.level}</TableCell>
                                <TableCell>Buttons</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}
