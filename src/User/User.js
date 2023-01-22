
export default function User (props) {
    return <>
        <td>{props.index + 1}</td>
        <td>
            {props.user.personalInfo.id}
            <br/>
            <small style={props.user.personalInfoOrig.id !== props.user.personalInfo.id ? {color: 'red'} : {}}>{props.user.personalInfoOrig.id}</small>
        </td>
        <td>
            {props.user.personalInfo.name}
            <br/>
            <small style={props.user.personalInfoOrig.name !== props.user.personalInfo.name ? {color: 'red'} : {}}>{props.user.personalInfoOrig.name}</small>
        </td>
        <td>
            {props.user.personalInfo.email}
            <br/>
            <small style={props.user.personalInfoOrig.email !== props.user.personalInfo.email ? {color: 'red'} : {}}>{props.user.personalInfoOrig.email}</small>
        </td>
        <td>
            {props.user.personalInfo.address}
            <br/>
            <small style={props.user.personalInfoOrig.address !== props.user.personalInfo.address ? {color: 'red'} : {}}>{props.user.personalInfoOrig.address}</small>
        </td>
        <td>
            {props.user.personalInfo.phoneNumber}
            <br/>
            <small style={props.user.personalInfoOrig.phoneNumber !== props.user.personalInfo.phoneNumber ? {color: 'red'} : {}}>{props.user.personalInfoOrig.phoneNumber}</small>
        </td>
    </>
}