/* Skill section */
import React from 'react';
import { SingleInput } from "../Form/SingleInput.jsx";
import { Select } from "../Form/Select.jsx";
import { TableRow, TableHeaderCell, TableHeader, TableCell, TableBody, Header, Table, Rating, GridRow, GridColumn, Grid, Icon } from "semantic-ui-react";

export default class Skill extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showNewSection: false,
            showEditSection: false,
            skillData: [], // name, level
            newSkill: "",
            newLevel: "",
            selectedSkill: "",
            selectedLevel: "",
            selectedIndex: 0,
        };

        this.openNew = this.openNew.bind(this);
        this.closeNew = this.closeNew.bind(this);
        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addSkill = this.addSkill.bind(this);
        this.updateSkill = this.updateSkill.bind(this);
        this.removeSkill = this.removeSkill.bind(this);
    };

    componentWillReceiveProps(props) {
        if (props.skillData && props.skillData.length > 0) this.setState({ skillData: props.skillData });
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
            selectedSkill: this.state.skillData[index].name,
            selectedLevel: this.state.skillData[index].level,
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

    addSkill() {
        if (this.state.newSkill === "" || this.state.newLevel === "") {
            console.log("Skill and Level cannot be empty");
            return;
        }

        let newSkillData = [];
        for (let i = 0; i < this.state.skillData.length; i++) {
            newSkillData[i] = this.state.skillData[i];
        }
        newSkillData.push({ name: this.state.newSkill, level: this.state.newLevel });
        this.setState({
            skillData: newSkillData,
            newSkill: "",
            newLevel: ""
        });

        // update profile
        let data = Object.assign({}, {skills: newSkillData})
        this.props.updateProfileData(data);
        this.closeNew();
    }

    updateSkill(){
        // save profile
        let data = Object.assign({}, {skills: this.state.skillData})
        data.skills[this.state.selectedIndex].name = this.state.selectedSkill;
        data.skills[this.state.selectedIndex].level = this.state.selectedLevel;
        this.props.updateProfileData(data);
        // update the language in local state
        this.setState({
            skillData: data.skills
        })
        this.closeEdit()
    }

    removeSkill(index){
        // save profile
        let data = Object.assign({}, {skills: this.state.skillData});
        data.skills.splice(index, 1);
        this.props.updateProfileData(data);
        // update the language in local state
        this.setState({
            skillData: data.skills
        })
        this.closeEdit()
        console.log("Your Skill was removed")
    }

    render() {
        let levelOptions = [
            { value: "Beginner", title: "Beginner" },
            { value: "Intermediate", title: "Intermediate" },
            { value: "Expert", title: "Expert" },
        ];
        return (
            <div className="ui sixteen wide column">
                <div hidden={!this.state.showNewSection}>
                    <Grid columns={3} divided>
                        <GridRow>
                            <GridColumn>
                                <SingleInput
                                    inputType="text"
                                    name="newSkill"
                                    content={this.state.newSkill}
                                    controlFunc={this.handleChange}
                                    placeholder="Add Skill"
                                    isError={false}
                                    errorMessage="Please enter a valid skill"
                                />
                            </GridColumn>
                            <GridColumn>
                                <Select name="newLevel" selectedOption={this.state.newLevel} placeholder="Skill Level" options={levelOptions} controlFunc={this.handleChange} />
                            </GridColumn>
                            <GridColumn>
                                <button type="button" className="ui teal button" onClick={this.addSkill}>
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
                            <TableHeaderCell>Skill</TableHeaderCell>
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
                                    name="selectedSkill"
                                    content={this.state.selectedSkill}
                                    controlFunc={this.handleChange}
                                    placeholder="Select a skill"
                                    isError={false}
                                    errorMessage="Please enter a valid skill"
                                />
                            </TableCell>
                            <TableCell>
                                <Select name="selectedLevel" selectedOption={this.state.selectedLevel} placeholder="Skill Level" options={levelOptions} controlFunc={this.handleChange} />
                            </TableCell>
                            <TableCell>
                                <button type="button" className="ui blue basic button" onClick={this.updateSkill}>
                                    Update
                                </button>
                                <button type="button" className="ui red basic button" onClick={this.closeEdit}>
                                    Cancel
                                </button>
                            </TableCell>
                        </TableRow>}
                        {this.state.skillData.map((s,index) => (
                            <TableRow key={index}>
                                <TableCell>{s.name}</TableCell>
                                <TableCell>{s.level}</TableCell>
                                <TableCell>
                                    <button type="button" className="ui icon button" onClick={() => this.openEdit(index)}>
                                        <Icon name="pencil alternate" />
                                    </button>
                                    <button type="button" className="ui icon button" onClick={() => this.removeSkill(index)}>
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

