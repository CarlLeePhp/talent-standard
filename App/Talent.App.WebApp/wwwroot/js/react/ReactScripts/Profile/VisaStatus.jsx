import React from "react";
import { SingleInput } from "../Form/SingleInput.jsx";
import { Select } from "../Form/Select.jsx";

export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visaStatus: "",
            visaExpiryDate: "",
            hasExpiryDate: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.saveVisaStatus = this.saveVisaStatus.bind(this);
    }

    componentWillReceiveProps(props) {
        if (props.visaStatus !== "") {
            if (props.visaStatus === "Student Visa" || props.visaStatus === "Work Visa") {
                this.setState({ visaStatus: props.visaStatus, hasExpiryDate: true });
            } else {
                this.setState({ visaStatus: props.visaStatus, hasExpiryDate: false });
            }
        }
        if (props.visaExpiryDate !== "") {
            let d = new Date(props.visaExpiryDate);
            let year = d.getFullYear();
            let month = d.getMonth();
            let day = d.getDate();
            this.setState({ visaExpiryDate: year + "-" + month + "-" + day });
        }
    }

    handleChange(event) {
        if (event.target.name === "visaStatus") {
            let hasExpiryDate = false;
            if (event.target.value === "Student Visa" || event.target.value === "Work Visa") {
                hasExpiryDate = true;
            }
            this.setState({
                visaStatus: event.target.value,
                hasExpiryDate: hasExpiryDate,
            });
        } else {
            this.setState({
                visaExpiryDate: event.target.value,
            });
        }
    }

    saveVisaStatus() {
        const data = Object.assign({}, { visaStatus: this.state.visaStatus, visaExpiryDate: this.state.visaExpiryDate });
        this.props.saveProfileData(data);
        this.closeEdit();
    }

    render() {
        let visaTypes = [
            { value: "Citizen", title: "Citizen" },
            { value: "Permanent Resident", title: "Permanent Resident" },
            { value: "Work Visa", title: "Work Visa" },
            { value: "Student Visa", title: "Student Visa" },
        ];
        return (
            <div className="ui sixteen wide column">
                <div className="field six wide">
                    <label>Visa type</label>
                    <Select name="visaStatus" selectedOption={this.state.visaStatus} placeholder="Select your visa status" options={visaTypes} controlFunc={this.handleChange} />
                </div>
                <div className="field six wide" hidden={!this.state.hasExpiryDate}>
                    <label>Visa expiry date</label>
                    <SingleInput
                        inputType="date"
                        name="number"
                        content={this.state.visaExpiryDate}
                        controlFunc={this.handleChange}
                        placeholder="DD/MM/YYYY"
                        isError={false}
                        errorMessage="Please enter a valid date"
                    />
                </div>
                <button type="button" className="ui right floated teal button" onClick={this.saveVisaStatus}>
                    Save
                </button>
            </div>
        );
    }
}
