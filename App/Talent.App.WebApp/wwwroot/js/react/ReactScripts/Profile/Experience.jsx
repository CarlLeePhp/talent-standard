/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';
import { SingleInput } from "../Form/SingleInput.jsx";
import { GridColumn, GridRow, Grid, Table, TableHeader, TableBody, TableHeaderCell, TableCell, TableRow, Icon } from 'semantic-ui-react';

export default class Experience extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            showNewSection: false,
            showEditSection: false,
            experienceData: [], // Company, Position, Responsibilities, Start, End
            newExperience: { company: "", position: "", responsibilities: "", start: Date.now(), end: Date.now() },
            selectedExperience: { id: 0, company: "", position: "", responsibilities: "", start: "", end: "" },
            selectedIndex: 0,
        };

        this.openNew = this.openNew.bind(this);
        this.closeNew = this.closeNew.bind(this);
        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addExperience = this.addExperience.bind(this);
        this.updateExperience = this.updateExperience.bind(this);
        this.deleteExp = this.deleteExp.bind(this);
    };

    componentWillReceiveProps(props) {
        let receivedExpData = [];
        if (props.experienceData && props.experienceData.length > 0) {
            receivedExpData = props.experienceData;
            for (let i = 0; i < receivedExpData.length; i++) {
                let d = new Date(receivedExpData[i].start);
                let startDate = this.formatDate(d);
                d = new Date(receivedExpData[i].end);
                let endDate = this.formatDate(d);
                receivedExpData[i] = Object.assign(receivedExpData[i], { start: startDate, end: endDate });
            }
        }
        this.setState({ experienceData: props.experienceData });

        // if (props.experienceData && props.experienceData.length > 0) this.setState({ experienceData: props.experienceData });
    }

    resetSelectedExperience() {
        let d = new Date();
        let currentDate = this.formatDate(d);

        this.setState({
            selectedExperience: { id: 0, company: "", position: "", responsibilities: "", start: currentDate, end: "2024-07-20" }
        });
    }

    openNew() {
        this.setState({
            showNewSection: true,
        });
        this.resetSelectedExperience();
    }

    closeNew() {
        this.setState({
            showNewSection: false,
        });
    }

    openEdit(index) {
        this.setState({
            showEditSection: true,
            selectedExperience: this.state.experienceData[index]
        });
    }

    closeEdit() {
        this.setState({
            showEditSection: false,
        });
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.selectedExperience);
        data[event.target.name] = event.target.value;
        this.setState({ selectedExperience: data });
    }

    deleteExp(index) {
        // save profile
        let data = Object.assign({}, { experience: this.state.experienceData })
        data.experience.splice(index, 1);
        this.props.updateProfileData(data);
        // update the exp in local state
        this.setState({
            experienceData: data.experience
        });

    }

    addExperience() {
        if (this.state.selectedExperience.company === "" || this.state.selectedExperience.position === "" || this.state.selectedExperience.responsibilities === "") {
            console.log("Company, position, and responsibilities cannot be empty");
            return;
        }

        let newExperienceData = [];
        for (let i = 0; i < this.state.experienceData.length; i++) {
            newExperienceData[i] = this.state.experienceData[i];
        }
        newExperienceData.push(this.state.selectedExperience);
        this.setState({
            experienceData: newExperienceData
        });

        this.resetSelectedExperience();

        // update profile
        let data = Object.assign({}, { experience: newExperienceData })
        this.props.updateProfileData(data);
        this.closeNew();
    }

    updateExperience() {
        if (this.state.selectedExperience.company === "" || this.state.selectedExperience.position === "" || this.state.selectedExperience.responsibilities === "") {
            console.log("Company, position, and responsibilities cannot be empty");
            console.log(this.state.selectedExperience.company + " | " + this.state.selectedExperience.position)
            return;
        }

        let newExperienceData = [];
        for (let i = 0; i < this.state.experienceData.length; i++) {
            if (this.state.selectedExperience.id === this.state.experienceData[i].id) {
                newExperienceData.push(this.state.selectedExperience);
            } else {
                newExperienceData.push(this.state.experienceData[i]);
            }
        }

        this.setState({
            experienceData: newExperienceData
        });

        this.resetSelectedExperience;

        // update profile
        let data = Object.assign({}, { experience: newExperienceData })
        this.props.updateProfileData(data);
        this.closeEdit();
    }

    formatDate(d) {
        let myYear = d.getFullYear();
        let myMonth = d.getMonth() + 1;
        let myDate = d.getDate();

        if (myMonth < 10) {
            myMonth = "0" + myMonth;
        }

        if (myDate < 10) {
            myDate = "0" + myDate;
        }

        let result = myYear + "-" + myMonth + "-" + myDate;
        return result;
    }

    render() {

        return (
            <div className="ui sixteen wide column">
                <div hidden={!this.state.showNewSection}>
                    <Grid>
                        <GridRow columns={2}>
                            <GridColumn>
                                <label>Company:</label>
                                <SingleInput
                                    inputType="text"
                                    name="company"
                                    content={this.state.selectedExperience.company}
                                    controlFunc={this.handleChange}
                                    placeholder="Company"
                                    isError={false}
                                    errorMessage="Please enter a valid company"
                                />
                            </GridColumn>
                            <GridColumn>
                                <label>Position:</label>
                                <SingleInput
                                    inputType="text"
                                    name="position"
                                    content={this.state.selectedExperience.position}
                                    controlFunc={this.handleChange}
                                    placeholder="Position"
                                    isError={false}
                                    errorMessage="Please enter a valid position"
                                />
                            </GridColumn>
                        </GridRow>
                        <GridRow columns={2}>
                            <GridColumn>
                                <label>Start Date:</label>
                                <SingleInput
                                    inputType="date"
                                    name="start"
                                    content={this.state.selectedExperience.start}
                                    controlFunc={this.handleChange}
                                    isError={false}
                                    errorMessage="Please enter a valid date"
                                />
                            </GridColumn>
                            <GridColumn>
                                <label>End Date:</label>
                                <SingleInput
                                    inputType="date"
                                    name="end"
                                    content={this.state.selectedExperience.end}
                                    controlFunc={this.handleChange}
                                    isError={false}
                                    errorMessage="Please enter a valid date"
                                />
                            </GridColumn>
                        </GridRow>
                        <GridRow columns={1}>
                            <GridColumn>
                                <label>Responsibilities:</label>
                                <SingleInput
                                    inputType="text"
                                    name="responsibilities"
                                    content={this.state.selectedExperience.responsibilities}
                                    controlFunc={this.handleChange}
                                    placeholder="Responsibilities"
                                    isError={false}
                                    errorMessage="Please enter a valid responsibilities"
                                />
                            </GridColumn>
                        </GridRow>
                        <GridRow>
                            <GridColumn>
                                <button type="button" className="ui teal button" onClick={this.addExperience}>
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
                            <TableHeaderCell>Company</TableHeaderCell>
                            <TableHeaderCell>Position</TableHeaderCell>
                            <TableHeaderCell>Responsibilities</TableHeaderCell>
                            <TableHeaderCell>Start</TableHeaderCell>
                            <TableHeaderCell>End</TableHeaderCell>
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
                                <TableCell colSpan="6">
                                    <Grid>
                                        <GridRow columns={2}>
                                            <GridColumn>
                                                <label>Company:</label>
                                                <SingleInput
                                                    inputType="text"
                                                    name="company"
                                                    content={this.state.selectedExperience.company}
                                                    controlFunc={this.handleChange}
                                                    placeholder="Company"
                                                    isError={false}
                                                    errorMessage="Please enter a valid company"
                                                />
                                            </GridColumn>
                                            <GridColumn>
                                                <label>Position:</label>
                                                <SingleInput
                                                    inputType="text"
                                                    name="position"
                                                    content={this.state.selectedExperience.position}
                                                    controlFunc={this.handleChange}
                                                    placeholder="Position"
                                                    isError={false}
                                                    errorMessage="Please enter a valid position"
                                                />
                                            </GridColumn>
                                        </GridRow>
                                        <GridRow columns={2}>
                                            <GridColumn>
                                                <label>Start Date:</label>
                                                <SingleInput
                                                    inputType="date"
                                                    name="start"
                                                    content={this.state.selectedExperience.start}
                                                    controlFunc={this.handleChange}
                                                    isError={false}
                                                    errorMessage="Please enter a valid date"
                                                />
                                            </GridColumn>
                                            <GridColumn>
                                                <label>End Date:</label>
                                                <SingleInput
                                                    inputType="date"
                                                    name="end"
                                                    content={this.state.selectedExperience.end}
                                                    controlFunc={this.handleChange}
                                                    isError={false}
                                                    errorMessage="Please enter a valid date"
                                                />
                                            </GridColumn>
                                        </GridRow>
                                        <GridRow columns={1}>
                                            <GridColumn>
                                                <label>Responsibilities:</label>
                                                <SingleInput
                                                    inputType="text"
                                                    name="responsibilities"
                                                    content={this.state.selectedExperience.responsibilities}
                                                    controlFunc={this.handleChange}
                                                    placeholder="Responsibilities"
                                                    isError={false}
                                                    errorMessage="Please enter a valid responsibilities"
                                                />
                                            </GridColumn>
                                        </GridRow>
                                        <GridRow>
                                            <GridColumn>
                                                <button type="button" className="ui teal button" onClick={this.updateExperience}>
                                                    Update
                                                </button>
                                                <button type="button" className="ui button" onClick={this.closeEdit}>
                                                    Cancel
                                                </button>
                                            </GridColumn>
                                        </GridRow>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        }
                        {this.state.experienceData.map((e, index) => (
                            <TableRow key={e.id}>
                                <TableCell>{e.company}</TableCell>
                                <TableCell>{e.position}</TableCell>
                                <TableCell>{e.responsibilities}</TableCell>
                                <TableCell>{e.start}</TableCell>
                                <TableCell>{e.end}</TableCell>
                                <TableCell>
                                    <button type="button" className="ui icon button" onClick={() => this.openEdit(index)}>
                                        <Icon name="pencil alternate" />
                                    </button>
                                    <button type="button" className="ui icon button" onClick={() => this.deleteExp(index)}>
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
