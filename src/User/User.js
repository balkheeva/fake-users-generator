
export default function User (props) {
    return <>
        <td>{props.index + 1}</td>
        <td>
            {props.user.personalInfo.id}
        </td>
        <td>
            {props.user.personalInfo.name}
        </td>
        <td>
            {props.user.personalInfo.email}
        </td>
        <td>
            {props.user.personalInfo.address}
        </td>
        <td>
            {props.user.personalInfo.phoneNumber}
        </td>
    </>
}