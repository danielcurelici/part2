const Persons = (props) => {
    return (
        <p>
            {props.name}  {props.number}
            <button onClick={props.handleClick}>delete</button>
        </p>)
}
export default Persons