
const Dropdown = ({title, option, value, onChange}) => {
  return (
    <div>
        <select id="countries" value={value} onChange={onChange} className="w-full p-2 border-emerald-600 border rounded focus:outline-none">
        <option selected>{title}</option>
        {
          option?.map((data, index)=>{
            return <option key={index} value={data.payerId} >[{data.payerId}] {data.stokist_name}</option>
          })
        }
    </select>
    </div>
  )
}

const AttendanceDropdown = ({title, option, value, onChange})=>{
  return (
    <div>
        <select id="countries"  value={value} onChange={onChange} className="w-full p-2 border-emerald-600 border rounded focus:outline-none">
        <option selected>{title}</option>
        {
          option?.map((data, index)=>{
            return <option key={index} value={data} >{data}</option>
          })
        }
    </select>
    </div>
  )
}

const ModeDropdown = ({title, option, value, onChange})=>{
  return (
    <div>
        <select id="countries" value={value} onChange={onChange} className="w-full p-2 border-emerald-600 border rounded focus:outline-none">
        <option selected>{title}</option>
        {
          option?.map((data, index)=>{
            return <option key={index} value={data} >{data}</option>
          })
        }
    </select>
    </div>
  )
}

export {AttendanceDropdown, ModeDropdown}

export default Dropdown