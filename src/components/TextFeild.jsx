
const TextFeild = ({value, register, placeholder }) => {

    return (
        <div >
            <input
                {...register(value)}
                placeholder={placeholder}
                className='w-full p-2 mb-3 placeholder:text-sm border-teal-600 border rounded focus:outline-none'
            />
        </div>
    )
}

export default TextFeild