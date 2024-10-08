﻿/* Language section */
import React from "react";
import { SingleInput } from "../Form/SingleInput.jsx";
import { Select } from "../Form/Select.jsx";
import { TableRow, TableHeaderCell, TableHeader, TableCell, TableBody, Header, Table, Rating, GridRow, GridColumn, Grid, Icon } from "semantic-ui-react";

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
            selectedIndex: 0,
        };

        this.openNew = this.openNew.bind(this);
        this.closeNew = this.closeNew.bind(this);
        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addLanguage = this.addLanguage.bind(this);
        this.updateLanguage = this.updateLanguage.bind(this);
        this.removeLanguage = this.removeLanguage.bind(this);
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

    openEdit(index) {
        this.setState({
            showEditSection: true,
            selectedLanguage: this.state.languageData[index].name,
            selectedLevel: this.state.languageData[index].level,
            selectedIndex: index
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
            console.log("Language and Level cannot be empty");
            return;
        }
        // add the language to database
        // var cookies = Cookies.get("talentAuthToken");
        // $.ajax({
        //     url: PROFILE_BASE_URL + "profile/profile/addLanguage",
        //     headers: {
        //         Authorization: "Bearer " + cookies,
        //         "Content-Type": "application/json",
        //     },
        //     type: "POST",
        //     data: JSON.stringify({
        //         name: this.state.newLanguage,
        //         level: this.state.newLevel,
        //     }),
        //     success: function (res) {
        //         console.log(res);
        //         if (res.success == true) {
        //             TalentUtil.notification.show("Language added sucessfully", "success", null, null);
        //         } else {
        //             TalentUtil.notification.show("Language did not add successfully", "error", null, null);
        //         }
        //     }.bind(this),
        //     error: function (res, a, b) {
        //         console.log(res);
        //         console.log(a);
        //         console.log(b);
        //     },
        // });

        // update state
        let newLanguageData = [];
        for (let i = 0; i < this.state.languageData.length; i++) {
            newLanguageData[i] = this.state.languageData[i];
        }
        newLanguageData.push({ name: this.state.newLanguage, level: this.state.newLevel });
        this.setState({
            languageData: newLanguageData,
            newLanguage: "",
            newLevel: ""
        });

        // update profile
        let data = Object.assign({}, {languages: newLanguageData})
        this.props.updateProfileData(data);
        this.closeNew();
        // update parent's state
        // let data = Object.assign({}, { languages: newLanguageData });
        // this.props.updateWithoutSave(data);
    }

    updateLanguage(){
        // save profile
        let data = Object.assign({}, {languages: this.state.languageData})
        data.languages[this.state.selectedIndex].name = this.state.selectedLanguage;
        data.languages[this.state.selectedIndex].level = this.state.selectedLevel;
        this.props.updateProfileData(data);
        // update the language in local state
        this.setState({
            languageData: data.languages
        })
        this.closeEdit()
    }

    removeLanguage(index){
        // save profile
        let data = Object.assign({}, {languages: this.state.languageData});
        data.languages.splice(index, 1);
        this.props.updateProfileData(data);
        // update the language in local state
        this.setState({
            languageData: data.languages
        })
        this.closeEdit()
        console.log("Your Language was removed")
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
                <div hidden={!this.state.showNewSection}>
                    <Grid columns={3} divided>
                        <GridRow>
                            <GridColumn>
                                <SingleInput
                                    inputType="text"
                                    name="newLanguage"
                                    content={this.state.newLanguage}
                                    controlFunc={this.handleChange}
                                    placeholder="Add Language"
                                    isError={false}
                                    errorMessage="Please enter a valid language"
                                />
                            </GridColumn>
                            <GridColumn>
                                <Select name="newLevel" selectedOption={this.state.newLevel} placeholder="Language Level" options={levelOptions} controlFunc={this.handleChange} />
                            </GridColumn>
                            <GridColumn>
                                <button type="button" className="ui teal button" onClick={this.addLanguage}>
                                    Add
                                </button>
                                <button type="button" className="ui button" onClick={this.closeNew}>
                                    Cancel
                                </button>
                            </GridColumn>
                        </GridRow>
                    </Grid>
                </div>

                <Table celled padded>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>Language</TableHeaderCell>
                            <TableHeaderCell>Level</TableHeaderCell>
                            <TableHeaderCell>
                                <button type="button" className="ui teal button" onClick={this.openNew}>
                                    <Icon name="plus" color="grey" />
                                    Add New
                                </button>
                            </TableHeaderCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {this.state.showEditSection && 
                        <TableRow>
                            <TableCell>
                                <SingleInput
                                    inputType="text"
                                    name="selectedLanguage"
                                    content={this.state.selectedLanguage}
                                    controlFunc={this.handleChange}
                                    placeholder="Select a language"
                                    isError={false}
                                    errorMessage="Please enter a valid language"
                                />
                            </TableCell>
                            <TableCell>
                                <Select name="selectedLevel" selectedOption={this.state.selectedLevel} placeholder="Language Level" options={levelOptions} controlFunc={this.handleChange} />
                            </TableCell>
                            <TableCell>
                                <button type="button" className="ui blue basic button" onClick={this.updateLanguage}>
                                    Update
                                </button>
                                <button type="button" className="ui red basic button" onClick={this.closeEdit}>
                                    Cancel
                                </button>
                            </TableCell>
                        </TableRow>}
                        {this.state.languageData.map((l,index) => (
                            <TableRow key={index}>
                                <TableCell>{l.name}</TableCell>
                                <TableCell>{l.level}</TableCell>
                                <TableCell>
                                    <button type="button" className="ui icon button" onClick={() => this.openEdit(index)}>
                                        <Icon name="pencil alternate" />
                                    </button>
                                    <button type="button" className="ui icon button" onClick={() => this.removeLanguage(index)}>
                                        <Icon name="close" />
                                    </button>
                                        
                                    
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}
