
const TextFeild = ({names, value, handlerChange, placeholder, disable}) => {
    return (
        <div>
            <input
                disabled={disable === 'absent' ? true : false}
                name={names}
                value={value}
                onChange={handlerChange}
                placeholder={placeholder}
                className='w-full p-2 mb-3 placeholder:text-sm border-teal-600 border rounded focus:outline-none'
            />
        </div>
    )
}

export default TextFeild