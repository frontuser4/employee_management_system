
const TextFeild = ({names, value, handlerChange, placeholder }) => {

    return (
        <div>
            <input
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