import './style.css';

const Input = ({value, setValue}) =>{
    return(
        <input
        type="text"
        className='input'
        onChange={(e) => setValue(e.target.value)}
        value={value}
        />
    )
}
export default Input;