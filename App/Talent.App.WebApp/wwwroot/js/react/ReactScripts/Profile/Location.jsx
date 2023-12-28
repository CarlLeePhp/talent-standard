import React from "react";
import Cookies from "js-cookie";
import { ChildSingleInput } from "../Form/SingleInput.jsx";
import { Select } from "../Form/Select.jsx";

export class Address extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showEditSection: false,
            newAddress: { number: "", street: "", suburb: "", postCode: 0, city: "", country: "" },
            countries: {},
            countryOptions: [],
            cities: [],
        };

        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveAddress = this.saveAddress.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
        this.renderDisplay = this.renderDisplay.bind(this);
    }

    componentWillReceiveProps(props) {
        if (props.addressData) {
            if (props.addressData.country !== "") {
                let options = [];
                this.state.countries[props.addressData.country].forEach((city) => {
                    options.push({ value: city, title: city });
                });
                this.setState({ newAddress: props.addressData, cities: options });
            } else {
                this.setState({ newAddress: props.addressData });
            }
        }
    }

    componentDidMount() {
        // read the Json file

        fetch("/util/jsonFiles/countries.json")
            .then((response) => response.json())
            .then((json) => {
                let options = [];
                let optionKeys = Object.keys(json);
                optionKeys.forEach((c) => {
                    options.push({ value: c, title: c });
                });
                this.setState({ countries: json, countryOptions: options });
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
        const data = Object.assign({}, this.state.newAddress);
        data[event.target.name] = event.target.value;
        let options = [];
        if (event.target.name === "country") {
            this.state.countries[event.target.value].forEach((city) => {
                options.push({ value: city, title: city });
            });
            this.setState({
                newAddress: data,
                cities: options,
            });
        } else {
            this.setState({
                newAddress: data,
            });
        }
    }

    saveAddress() {
        const data = Object.assign({}, { address: this.state.newAddress });
        this.props.saveProfileData(data);
        this.closeEdit();
    }

    render() {
        return this.state.showEditSection ? this.renderEdit() : this.renderDisplay();
    }

    renderEdit() {
        return (
            <div className="ui sixteen wide column">
                <ChildSingleInput
                    inputType="text"
                    label="Number"
                    name="number"
                    value={this.state.newAddress.number}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your street number"
                    errorMessage="Please enter a valid street number"
                />
                <ChildSingleInput
                    inputType="text"
                    label="Street"
                    name="street"
                    value={this.state.newAddress.street}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your street name"
                    errorMessage="Please enter a valid street name"
                />
                <ChildSingleInput
                    inputType="text"
                    label="Suburb"
                    name="suburb"
                    value={this.state.newAddress.suburb}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your suburb"
                    errorMessage="Please enter a valid suburb"
                />
                <ChildSingleInput
                    inputType="text"
                    label="Post Code"
                    name="postCode"
                    value={this.state.newAddress.postCode}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your post code"
                    errorMessage="Please enter a valid post code"
                />
                <div className="field">
                    <label>Country</label>
                    <Select name="country" selectedOption={this.state.newAddress.country} placeholder="Select your country" options={this.state.countryOptions} controlFunc={this.handleChange} />
                </div>
                <div className="field">
                    <label>City</label>
                    <Select name="city" selectedOption={this.state.newAddress.city} placeholder="Select your city" options={this.state.cities} controlFunc={this.handleChange} />
                </div>
                <button type="button" className="ui teal button" onClick={this.saveAddress}>
                    Save
                </button>
                <button type="button" className="ui button" onClick={this.closeEdit}>
                    Cancel
                </button>
            </div>
        );
    }

    renderDisplay() {
        let fullStreet = this.props.addressData ? `${this.props.addressData.number}, ${this.props.addressData.street}, ${this.props.addressData.suburb}, ${this.props.addressData.postCode}` : "";
        let city = this.props.addressData ? this.props.addressData.city : "";
        let country = this.props.addressData ? this.props.addressData.country : "";

        return (
            <div className="row">
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Address: {fullStreet}</p>
                        <p>City: {city}</p>
                        <p>Country: {country}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>
                        Edit
                    </button>
                </div>
            </div>
        );
    }
}

export class Nationality extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {}
}
