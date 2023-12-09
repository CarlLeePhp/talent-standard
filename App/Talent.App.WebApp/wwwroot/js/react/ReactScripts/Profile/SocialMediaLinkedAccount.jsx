/* Social media JSX */
import React, { useState, useEffect } from "react";
import { ChildSingleInput } from "../Form/SingleInput.jsx";
import { Popup, Button, Icon } from "semantic-ui-react";

// function SocialMediaLinkedAccount(props) {
//     const [showEditSection, setShowEditSection] = useState(false);
//     const [newLinkedAccounts, setNewLinkedAccounts] = useState()

//     console.log(typeof props.linkedAccounts);

//     const openEdit = () => {
//         setShowEditSection(true);
//     };

//     const closeEdit = () => {
//         setShowEditSection(false);
//     };
//     const handleChange = (event) => {
//         const data = Object.assign({}, newLinkedAccounts);
//         data[event.target.name] = event.target.value;
//         props.updateLinkedAccounts(data);
//     };

//     const saveLinkedAccounts = () => {
//         console.log(newLinkedAccounts);
//         const data = Object.assign({}, { linkedAccounts: newLinkedAccounts });
//         props.saveProfileData(data);
//         closeEdit();
//     };

//     const renderEdit = (
//         <div className="ui sixteen wide column">
//             <ChildSingleInput
//                 inputType="text"
//                 label="LinkedIn"
//                 name="linkedIn"
//                 value={props.linkedAccounts.linkedIn}
//                 controlFunc={handleChange}
//                 maxLength={80}
//                 placeholder="Enter your LinkedIn Url"
//                 errorMessage="Please enter a valid LinkedIn Url"
//             />
//             <ChildSingleInput
//                 inputType="text"
//                 label="GitHub"
//                 name="github"
//                 value={props.linkedAccounts.github}
//                 controlFunc={handleChange}
//                 maxLength={80}
//                 placeholder="Enter your GitHub Url"
//                 errorMessage="Please enter a valid GitHub Url"
//             />
//             <button type="button" className="ui teal button" onClick={saveLinkedAccounts}>
//                 Save
//             </button>
//             <button type="button" className="ui button" onClick={closeEdit}>
//                 Cancel
//             </button>
//         </div>
//     );

//     const renderDisplay = (
//         <div className="row" style={{ paddingLeft: "1em", paddingRight: "1em" }}>
//             <Button primary>
//                 <Icon name="linkedin" /> LinkedIn
//             </Button>
//             <Button secondary>
//                 <Icon name="github" /> GitHub
//             </Button>
//             <Button secondary onClick={openEdit} style={{ marginLeft: "auto" }}>
//                 Edit
//             </Button>
//         </div>
//     );

//     return showEditSection ? renderEdit : renderDisplay;
// }

// export default SocialMediaLinkedAccount;
export default class SocialMediaLinkedAccount extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showEditSection: false,
            newLinkedAccounts: { linkedIn: "you did not get it", github: "you did not get it" },
        };

        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveLinkedAccounts = this.saveLinkedAccounts.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
        this.renderDisplay = this.renderDisplay.bind(this);
    }

    componentWillReceiveProps(props) {
        if (props.linkedAccounts) {
            this.setState({ newLinkedAccounts: props.linkedAccounts });
        }
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
        const data = Object.assign({}, this.state.newLinkedAccounts);
        data[event.target.name] = event.target.value;
        this.setState({
            newLinkedAccounts: data,
        });
    }

    saveLinkedAccounts() {
        console.log(this.state.newLinkedAccounts);
        const data = Object.assign({}, { linkedAccounts: this.state.newLinkedAccounts });
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
                    label="LinkedIn"
                    name="linkedIn"
                    value={this.state.newLinkedAccounts.linkedIn}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your LinkedIn Url"
                    errorMessage="Please enter a valid LinkedIn Url"
                />
                <ChildSingleInput
                    inputType="text"
                    label="GitHub"
                    name="github"
                    value={this.state.newLinkedAccounts.github}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your GitHub Url"
                    errorMessage="Please enter a valid GitHub Url"
                />
                <button type="button" className="ui teal button" onClick={this.saveLinkedAccounts}>
                    Save
                </button>
                <button type="button" className="ui button" onClick={this.closeEdit}>
                    Cancel
                </button>
            </div>
        );
    }

    renderDisplay() {
        return (
            <div className="row" style={{ paddingLeft: "1em", paddingRight: "1em" }}>
                <Button href={this.state.newLinkedAccounts.linkedIn} target="_blank" primary>
                    <Icon name="linkedin" /> LinkedIn
                </Button>
                <Button href={this.state.newLinkedAccounts.github} target="_blank" secondary>
                    <Icon name="github" /> GitHub
                </Button>
                <Button secondary onClick={this.openEdit} style={{ marginLeft: "auto" }}>
                    Edit
                </Button>
            </div>
        );
    }
}
